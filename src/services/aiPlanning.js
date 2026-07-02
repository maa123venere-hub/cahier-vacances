import { getFunctions, httpsCallable } from 'firebase/functions';
import { app } from '../firebase/config.js';

const functions = getFunctions(app, 'europe-west1');

// ── Appel IA : génère un planning à partir de la description libre ──
export async function generatePlanningAI({ description, wake, sleep, day }) {
  const call = httpsCallable(functions, 'generatePlanning');
  const res = await call({ description, wake, sleep, day });
  return res.data.items;
}

// ── Générateur local de secours (si l'IA échoue ou hors-ligne) ──────
const KEYWORD_EMOJIS = [
  [/foot|basket|tennis|sport|muscu|courir|course|vélo|velo|skate/i, '🏃', 'Sport'],
  [/piscine|nager|natation|plage|baignade/i, '🏊', 'Baignade'],
  [/ciné|cine|film|série|serie|netflix/i, '🎬', 'Film'],
  [/révis|revis|cahier|devoirs|leçon|lecon|exercice|étudier|etudier/i, '📚', 'Révisions'],
  [/jeu|jouer|console|switch|manette/i, '🎮', 'Jeux'],
  [/ami|copain|copine|pote/i, '👫', 'Amis'],
  [/manger|repas|resto|pique|barbecue|goûter|gouter/i, '🍽️', 'Repas'],
  [/lire|lecture|livre|bd|manga/i, '📖', 'Lecture'],
  [/musique|piano|guitare|chant|danse/i, '🎵', 'Musique'],
  [/course|magasin|shopping|acheter/i, '🛍️', 'Sorties'],
  [/famille|grand[- ]?m|grand[- ]?p|cousin/i, '👨‍👩‍👧', 'Famille'],
  [/dormir|sieste|repos/i, '😴', 'Repos'],
  [/promenade|balade|parc|randonnée|randonnee/i, '🌳', 'Balade'],
];

function pickEmoji(text) {
  for (const [re, emoji, label] of KEYWORD_EMOJIS) {
    if (re.test(text)) return { emoji, label };
  }
  return { emoji: '📌', label: 'Activité' };
}

// Extrait une heure d'un fragment : « à 10h », « 14h30 », « 9:15 », « le matin »…
function extractTime(text) {
  const m = text.match(/(\d{1,2})\s*[hH:]\s*(\d{2})?/);
  if (m) {
    const h = Math.min(23, parseInt(m[1], 10));
    const min = m[2] ? Math.min(59, parseInt(m[2], 10)) : 0;
    return `${String(h).padStart(2, '0')}:${String(min).padStart(2, '0')}`;
  }
  if (/matin/i.test(text)) return '10:00';
  if (/midi/i.test(text)) return '12:30';
  if (/après[- ]?midi|apres[- ]?midi/i.test(text)) return '15:00';
  if (/soir/i.test(text)) return '20:30';
  return null;
}

export function generatePlanningLocal({ description, wake = '08:00', sleep = '22:00' }) {
  // Découper la description en activités (retours à la ligne, virgules, « et », « puis »)
  const fragments = description
    .split(/\n|,|;| et | puis | ensuite /i)
    .map((f) => f.trim())
    .filter((f) => f.length >= 3);

  const userItems = [];
  let floatingHour = 10; // heure de départ pour les activités sans heure
  for (const frag of fragments) {
    const { emoji, label } = pickEmoji(frag);
    let time = extractTime(frag);
    if (!time) {
      time = `${String(Math.min(21, Math.floor(floatingHour))).padStart(2, '0')}:00`;
      floatingHour += 1.5;
    }
    userItems.push({ time, emoji, label, text: frag.charAt(0).toUpperCase() + frag.slice(1) });
  }

  // Ancres par défaut (repas + réveil/coucher + révisions si absentes)
  const items = [...userItems];
  const hasNear = (t) => items.some((it) => Math.abs(parseInt(it.time, 10) - parseInt(t, 10)) < 1);
  const mentions = (re) => re.test(description);

  items.push({ time: wake, emoji: '☀️', label: 'Réveil', text: 'Réveil en douceur et petit-déjeuner' });
  if (!hasNear('12:30') && !mentions(/déjeuner|dejeuner/i)) items.push({ time: '12:30', emoji: '🍽️', label: 'Déjeuner', text: 'Déjeuner' });
  if (!mentions(/révis|revis|cahier|devoirs/i)) items.push({ time: '09:30', emoji: '📚', label: 'Révisions', text: 'Cahier de vacances (30 min)' });
  if (!hasNear('19:30') && !mentions(/dîner|diner/i)) items.push({ time: '19:30', emoji: '🌙', label: 'Dîner', text: 'Dîner' });
  items.push({ time: sleep, emoji: '😴', label: 'Coucher', text: 'Extinction des feux, bonne nuit !' });

  items.sort((a, b) => a.time.localeCompare(b.time));
  return items.slice(0, 12);
}

const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { defineSecret } = require('firebase-functions/params');
const admin = require('firebase-admin');

admin.initializeApp();

const ADMIN_EMAIL = 'maxwellvenere68@gmail.com';

function requireAdmin(request) {
  if (!request.auth || request.auth.token.email !== ADMIN_EMAIL) {
    throw new HttpsError('permission-denied', 'Accès administrateur requis.');
  }
}

const ANTHROPIC_API_KEY = defineSecret('ANTHROPIC_API_KEY');

const SYSTEM_PROMPT = `Tu es un professeur de français de collège (4e-3e) qui corrige les exercices d'un cahier de vacances.
Réponds UNIQUEMENT avec un objet JSON valide, sans texte autour, au format exact :
{
  "note": <entier de 0 à 20>,
  "correction": "<ce qui est juste et ce qui est faux dans la réponse de l'élève>",
  "explanation": "<explication pédagogique claire des erreurs et des règles à connaître>",
  "suggestedAnswer": "<la bonne réponse complète, rédigée>",
  "weaknesses": ["<point faible 1>", "<point faible 2>"]
}
Sois bienveillant mais précis. Adapte le niveau d'exigence à un élève de collège.`;

async function fetchImageAsBase64(url) {
  const res = await fetch(url);
  const buffer = Buffer.from(await res.arrayBuffer());
  return buffer.toString('base64');
}

exports.correctExercise = onCall({ secrets: [ANTHROPIC_API_KEY], region: 'europe-west1' }, async (request) => {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'Connexion requise.');
  }

  const { text, fileUrl, fileType, exerciseLabel, lecon } = request.data;

  const content = [
    {
      type: 'text',
      text: `Leçon : ${lecon || 'non précisée'}\nExercice(s) : ${exerciseLabel || 'non précisé'}\nRéponse de l'élève : ${text || '(voir le document joint)'}`,
    },
  ];

  if (fileUrl && fileType?.startsWith('image/')) {
    try {
      const base64 = await fetchImageAsBase64(fileUrl);
      content.push({
        type: 'image',
        source: { type: 'base64', media_type: fileType, data: base64 },
      });
    } catch {
      // If the image can't be fetched, fall back to text-only correction.
    }
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY.value(),
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content }],
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new HttpsError('internal', `Anthropic API error: ${errText}`);
  }

  const data = await response.json();
  const raw = data.content?.[0]?.text || '{}';
  const cleaned = raw.replace(/```json|```/g, '').trim();
  const jsonMatch = cleaned.match(/\{[\s\S]*\}/);

  let parsed;
  try {
    parsed = JSON.parse(jsonMatch ? jsonMatch[0] : cleaned);
  } catch (e) {
    console.error('Could not parse AI response', raw);
    throw new HttpsError('internal', 'Réponse IA invalide.');
  }

  return {
    note: parsed.note ?? 0,
    correction: parsed.correction ?? '',
    explanation: parsed.explanation ?? '',
    suggestedAnswer: parsed.suggestedAnswer ?? '',
    weaknesses: parsed.weaknesses ?? [],
  };
});

const CHAT_SYSTEM_PROMPT = `Tu es un assistant pédagogique pour un élève de collège (4e-3e) qui révise le français pendant les vacances d'été.
L'élève peut te demander d'expliquer une notion, de lui donner un exercice, de corriger une réponse, de lui donner un indice, ou de réexpliquer autrement.
Réponds de façon claire, bienveillante, concise et adaptée à un collégien. Utilise des exemples simples. N'utilise jamais de formatage JSON ici, réponds en texte normal (markdown léger autorisé).`;

exports.chatWithAI = onCall({ secrets: [ANTHROPIC_API_KEY], region: 'europe-west1' }, async (request) => {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'Connexion requise.');
  }

  const { messages } = request.data;
  if (!Array.isArray(messages) || messages.length === 0) {
    throw new HttpsError('invalid-argument', 'Aucun message fourni.');
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY.value(),
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system: CHAT_SYSTEM_PROMPT,
      messages: messages.slice(-20).map((m) => ({ role: m.role, content: m.content })),
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new HttpsError('internal', `Anthropic API error: ${errText}`);
  }

  const data = await response.json();
  const reply = data.content?.[0]?.text || '';
  return { reply };
});

const PLANNING_SYSTEM_PROMPT = `Tu organises la journée de vacances d'un collégien à partir de ses envies.
L'élève décrit ce qu'il veut faire (avec parfois des heures précises). Tu construis un planning réaliste :
- Respecte STRICTEMENT les heures que l'élève impose.
- Place les repas (petit-déjeuner, déjeuner vers 12h30, dîner vers 19h30) sauf indication contraire.
- Inclus une séance de révisions "Cahier de vacances" (25 à 40 min) de préférence le matin, sauf si l'élève l'a déjà placée.
- Ajoute du temps libre dans les creux ; garde un rythme de vacances (pas plus de 8-10 blocs).
- Reste entre l'heure de réveil et l'heure de coucher fournies.
Réponds UNIQUEMENT avec un objet JSON valide, sans texte autour, au format exact :
{
  "items": [
    { "time": "HH:MM", "emoji": "<un emoji>", "label": "<titre court>", "text": "<détail en une phrase courte>" }
  ]
}
Les items doivent être triés par heure croissante. Maximum 10 items.`;

exports.generatePlanning = onCall({ secrets: [ANTHROPIC_API_KEY], region: 'europe-west1' }, async (request) => {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'Connexion requise.');
  }

  const { description, wake, sleep, day } = request.data || {};
  if (!description || typeof description !== 'string' || description.trim().length < 3) {
    throw new HttpsError('invalid-argument', 'Décris ce que tu veux faire dans ta journée.');
  }

  const userMsg = `Jour : ${day || 'aujourd\'hui'}. Réveil : ${wake || '08:00'}. Coucher : ${sleep || '22:00'}.
Ce que je veux faire : ${description.trim().slice(0, 1000)}`;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY.value(),
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system: PLANNING_SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userMsg }],
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new HttpsError('internal', `Anthropic API error: ${errText}`);
  }

  const data = await response.json();
  const raw = data.content?.[0]?.text || '';
  // Extraire le JSON même si le modèle a ajouté du texte autour
  const match = raw.match(/\{[\s\S]*\}/);
  if (!match) throw new HttpsError('internal', 'Réponse IA invalide.');
  let parsed;
  try {
    parsed = JSON.parse(match[0]);
  } catch {
    throw new HttpsError('internal', 'JSON IA invalide.');
  }
  const items = Array.isArray(parsed.items) ? parsed.items
    .filter((it) => it && typeof it.time === 'string' && /^\d{1,2}[:h]\d{2}$/.test(it.time.trim()))
    .slice(0, 12)
    .map((it) => ({
      time: it.time.trim().replace('h', ':').padStart(5, '0'),
      emoji: (typeof it.emoji === 'string' && it.emoji.trim()) ? it.emoji.trim().slice(0, 4) : '📌',
      label: String(it.label || 'Activité').slice(0, 60),
      text: String(it.text || '').slice(0, 160),
    })) : [];
  if (!items.length) throw new HttpsError('internal', 'Aucun créneau généré.');
  items.sort((a, b) => a.time.localeCompare(b.time));
  return { items };
});

const RECIPE_SYSTEM_PROMPT = `Tu es un chef cuisinier qui écrit des recettes simples et équilibrées pour une famille avec des collégiens.
On te donne le nom d'un plat : tu rédiges TA propre recette, claire et réalisable par un débutant.
Réponds UNIQUEMENT avec un objet JSON valide, sans texte autour, au format exact :
{
  "name": "<nom du plat, propre et capitalisé>",
  "emoji": "<un emoji qui représente le plat>",
  "category": "<petit-dej | dejeuner | diner | collation>",
  "duration": "<durée totale, ex : 25 min>",
  "difficulty": "<Facile | Moyen | Difficile>",
  "ingredients": ["<ingrédient avec quantité>", "..."],
  "preparation": ["<étape 1>", "<étape 2>", "..."],
  "calories": <entier kcal par portion>,
  "proteines": <entier g>,
  "glucides": <entier g>,
  "lipides": <entier g>
}
4 à 10 ingrédients, 3 à 7 étapes courtes. Valeurs nutritionnelles réalistes par portion.`;

exports.generateRecipe = onCall({ secrets: [ANTHROPIC_API_KEY], region: 'europe-west1' }, async (request) => {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'Connexion requise.');
  }

  const { query } = request.data || {};
  if (!query || typeof query !== 'string' || query.trim().length < 2) {
    throw new HttpsError('invalid-argument', 'Indique le plat recherché.');
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY.value(),
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system: RECIPE_SYSTEM_PROMPT,
      messages: [{ role: 'user', content: `Plat demandé : ${query.trim().slice(0, 120)}` }],
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new HttpsError('internal', `Anthropic API error: ${errText}`);
  }

  const data = await response.json();
  const raw = data.content?.[0]?.text || '';
  const match = raw.match(/\{[\s\S]*\}/);
  if (!match) throw new HttpsError('internal', 'Réponse IA invalide.');
  let r;
  try {
    r = JSON.parse(match[0]);
  } catch {
    throw new HttpsError('internal', 'JSON IA invalide.');
  }

  const recipe = {
    name: String(r.name || query).slice(0, 80),
    emoji: (typeof r.emoji === 'string' && r.emoji.trim()) ? r.emoji.trim().slice(0, 4) : '🍽️',
    category: ['petit-dej', 'dejeuner', 'diner', 'collation'].includes(r.category) ? r.category : 'dejeuner',
    duration: String(r.duration || '30 min').slice(0, 20),
    difficulty: ['Facile', 'Moyen', 'Difficile'].includes(r.difficulty) ? r.difficulty : 'Facile',
    ingredients: (Array.isArray(r.ingredients) ? r.ingredients : []).slice(0, 14).map((i) => String(i).slice(0, 120)),
    preparation: (Array.isArray(r.preparation) ? r.preparation : []).slice(0, 10).map((p) => String(p).slice(0, 240)),
    calories: Math.max(0, Math.min(2000, parseInt(r.calories, 10) || 0)),
    proteines: Math.max(0, Math.min(150, parseInt(r.proteines, 10) || 0)),
    glucides: Math.max(0, Math.min(250, parseInt(r.glucides, 10) || 0)),
    lipides: Math.max(0, Math.min(150, parseInt(r.lipides, 10) || 0)),
  };
  if (!recipe.ingredients.length || !recipe.preparation.length) {
    throw new HttpsError('internal', 'Recette incomplète.');
  }
  return { recipe };
});

const USER_SUBCOLLECTIONS = ['progress', 'dayProgress', 'sport', 'gamification', 'corrections', 'planning', 'favorites', 'assistant', 'messages'];

async function deleteUserSubcollections(uid) {
  const db = admin.firestore();
  for (const name of USER_SUBCOLLECTIONS) {
    await db.recursiveDelete(db.collection(`users/${uid}/${name}`));
  }
}

exports.adminDeleteUser = onCall({ region: 'europe-west1' }, async (request) => {
  requireAdmin(request);
  const { uid } = request.data;
  if (!uid) throw new HttpsError('invalid-argument', 'uid manquant.');
  if (uid === request.auth.uid) throw new HttpsError('invalid-argument', 'Impossible de supprimer son propre compte admin.');

  await admin.auth().deleteUser(uid).catch(() => {});
  await admin.firestore().recursiveDelete(admin.firestore().doc(`users/${uid}`));

  return { success: true };
});

exports.adminResetProgress = onCall({ region: 'europe-west1' }, async (request) => {
  requireAdmin(request);
  const { uid } = request.data;
  if (!uid) throw new HttpsError('invalid-argument', 'uid manquant.');

  await deleteUserSubcollections(uid);

  return { success: true };
});

exports.adminSendMessage = onCall({ region: 'europe-west1' }, async (request) => {
  requireAdmin(request);
  const { uid, text } = request.data;
  if (!uid || !text?.trim()) throw new HttpsError('invalid-argument', 'uid et texte requis.');

  await admin.firestore().collection(`users/${uid}/messages`).add({
    text,
    read: false,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  return { success: true };
});

exports.adminBroadcastNotification = onCall({ region: 'europe-west1' }, async (request) => {
  requireAdmin(request);
  const { title, text } = request.data;
  if (!title?.trim() || !text?.trim()) throw new HttpsError('invalid-argument', 'titre et texte requis.');

  await admin.firestore().collection('announcements').add({
    title,
    text,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  return { success: true };
});

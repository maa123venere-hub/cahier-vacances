// Programmes d'entraînement de l'été — 5 séances différentes.
// Le programme "fullbody" garde les clés historiques (echauffement/exercices/etirements)
// pour ne pas perdre la progression du jour déjà enregistrée.
export const SPORT_PROGRAMS = [
  {
    key: 'fullbody',
    emoji: '💪',
    title: 'Full body',
    subtitle: 'Corps complet sans matériel',
    sections: [
      {
        key: 'echauffement',
        emoji: '🔥',
        title: 'Échauffement',
        duration: '5 min',
        calories: 20,
        items: [
          'Rotation des épaules et des chevilles (30 sec)',
          'Talons-fesses sur place (30 sec)',
          'Montées de genoux (30 sec)',
          'Jumping jacks légers (1 min)',
        ],
      },
      {
        key: 'exercices',
        emoji: '💪',
        title: 'Exercices du jour',
        duration: '15 min',
        calories: 90,
        items: [
          '3 séries de 10 squats',
          '3 séries de 10 pompes (genoux si besoin)',
          '3 séries de 20 sec de gainage (planche)',
          '20 fentes avant (10 par jambe)',
          '1 min de corde à sauter ou jumping jacks',
        ],
      },
      {
        key: 'etirements',
        emoji: '🧘',
        title: 'Étirements',
        duration: '5 min',
        calories: 10,
        items: [
          'Étirement des quadriceps (20 sec par jambe)',
          'Étirement des ischio-jambiers (20 sec par jambe)',
          'Étirement des épaules et du dos',
          'Respiration profonde (1 min)',
        ],
      },
    ],
    challenge: {
      title: '🎯 Défi du jour',
      description: 'Tiens la position de la planche (gainage) le plus longtemps possible. Note ton record !',
    },
  },
  {
    key: 'cardio',
    emoji: '🏃',
    title: 'Cardio',
    subtitle: 'Endurance et souffle',
    sections: [
      {
        key: 'cardio-echauffement',
        emoji: '🔥',
        title: 'Échauffement',
        duration: '5 min',
        calories: 25,
        items: [
          'Marche rapide sur place (1 min)',
          'Montées de genoux progressives (1 min)',
          'Talons-fesses (1 min)',
          'Pas chassés gauche-droite (2 min)',
        ],
      },
      {
        key: 'cardio-circuit',
        emoji: '⚡',
        title: 'Circuit cardio',
        duration: '16 min',
        calories: 130,
        items: [
          '4 tours de : 30 sec de jumping jacks',
          '30 sec de montées de genoux rapides',
          '30 sec de burpees (ou squats sautés)',
          '30 sec de course sur place',
          '2 min de récupération en marchant entre les tours',
        ],
      },
      {
        key: 'cardio-retour-calme',
        emoji: '🧘',
        title: 'Retour au calme',
        duration: '4 min',
        calories: 10,
        items: [
          'Marche lente (2 min)',
          'Étirement des mollets et des cuisses',
          'Respiration profonde (1 min)',
        ],
      },
    ],
    challenge: {
      title: '🎯 Défi du jour',
      description: 'Fais le maximum de jumping jacks en 1 minute. Objectif : battre ton record à chaque séance !',
    },
  },
  {
    key: 'force',
    emoji: '🏋️',
    title: 'Force',
    subtitle: 'Renforcement musculaire',
    sections: [
      {
        key: 'force-echauffement',
        emoji: '🔥',
        title: 'Échauffement',
        duration: '5 min',
        calories: 20,
        items: [
          'Rotations des bras et des poignets (1 min)',
          '10 squats lents sans charge',
          '10 pompes contre un mur',
          'Gainage léger (30 sec)',
        ],
      },
      {
        key: 'force-haut',
        emoji: '💪',
        title: 'Haut du corps',
        duration: '10 min',
        calories: 55,
        items: [
          '3 séries de 8 pompes (genoux si besoin)',
          '3 séries de 10 dips sur une chaise',
          '3 séries de 15 sec de planche avec épaules touchées',
          '2 séries de 10 supermans (dos)',
        ],
      },
      {
        key: 'force-bas',
        emoji: '🦵',
        title: 'Bas du corps',
        duration: '10 min',
        calories: 60,
        items: [
          '3 séries de 12 squats',
          '3 séries de 10 fentes par jambe',
          '3 séries de 12 relevés de mollets',
          '2 séries de 15 pont fessier',
        ],
      },
      {
        key: 'force-etirements',
        emoji: '🧘',
        title: 'Étirements',
        duration: '5 min',
        calories: 10,
        items: [
          'Étirement des pectoraux et des épaules',
          'Étirement des cuisses et des fessiers',
          'Respiration profonde (1 min)',
        ],
      },
    ],
    challenge: {
      title: '🎯 Défi du jour',
      description: 'Enchaîne le maximum de squats en 2 minutes en gardant une bonne posture. Note ton score !',
    },
  },
  {
    key: 'souplesse',
    emoji: '🤸',
    title: 'Souplesse',
    subtitle: 'Mobilité et détente',
    sections: [
      {
        key: 'souplesse-reveil',
        emoji: '🌅',
        title: 'Réveil articulaire',
        duration: '5 min',
        calories: 15,
        items: [
          'Rotations de la tête, des épaules et du bassin (2 min)',
          'Cercles de bras amples (1 min)',
          'Flexions latérales du buste (1 min)',
          'Rotations des chevilles et des poignets (1 min)',
        ],
      },
      {
        key: 'souplesse-postures',
        emoji: '🧘',
        title: 'Postures de souplesse',
        duration: '12 min',
        calories: 40,
        items: [
          'Posture du chien tête en bas (3 × 30 sec)',
          'Posture de l\'enfant (2 × 45 sec)',
          'Fente basse hanche ouverte (30 sec par côté)',
          'Pince assise vers les orteils (3 × 30 sec)',
          'Torsion allongée du dos (30 sec par côté)',
        ],
      },
      {
        key: 'souplesse-respiration',
        emoji: '😮‍💨',
        title: 'Respiration et détente',
        duration: '5 min',
        calories: 5,
        items: [
          'Respiration abdominale profonde (2 min)',
          'Respiration 4-4-4 : inspire 4 sec, bloque 4 sec, expire 4 sec (2 min)',
          'Relâchement complet allongé (1 min)',
        ],
      },
    ],
    challenge: {
      title: '🎯 Défi du jour',
      description: 'Essaie de toucher tes orteils jambes tendues. Garde la position 20 secondes sans forcer !',
    },
  },
  {
    key: 'exterieur',
    emoji: '🌳',
    title: 'Extérieur',
    subtitle: 'Plein air et endurance',
    sections: [
      {
        key: 'ext-echauffement',
        emoji: '🔥',
        title: 'Échauffement',
        duration: '5 min',
        calories: 25,
        items: [
          'Marche rapide (3 min)',
          'Montées de genoux en avançant (1 min)',
          'Talons-fesses en avançant (1 min)',
        ],
      },
      {
        key: 'ext-parcours',
        emoji: '🏞️',
        title: 'Parcours extérieur',
        duration: '20 min',
        calories: 150,
        items: [
          'Alterne 2 min de course légère et 1 min de marche (× 5)',
          '10 squats à chaque pause',
          'Monte des escaliers ou une petite côte si possible (× 3)',
          'Sprint léger sur 20 mètres (× 3)',
        ],
      },
      {
        key: 'ext-etirements',
        emoji: '🧘',
        title: 'Étirements',
        duration: '5 min',
        calories: 10,
        items: [
          'Étirement des mollets contre un mur ou un arbre',
          'Étirement des quadriceps debout',
          'Étirement des ischio-jambiers',
          'Marche lente de récupération (2 min)',
        ],
      },
    ],
    challenge: {
      title: '🎯 Défi du jour',
      description: 'Cours 10 minutes sans t\'arrêter, à ton rythme. Si tu y arrives, vise 12 minutes la prochaine fois !',
    },
  },
];

// Programme suggéré selon le jour de la semaine (0 = dimanche … 6 = samedi)
const WEEKDAY_PROGRAM = {
  1: 'fullbody',   // lundi
  2: 'cardio',     // mardi
  3: 'force',      // mercredi
  4: 'souplesse',  // jeudi
  5: 'cardio',     // vendredi
  6: 'exterieur',  // samedi
  0: 'souplesse',  // dimanche
};

export function getSuggestedProgramKey(date = new Date()) {
  return WEEKDAY_PROGRAM[date.getDay()] || 'fullbody';
}

export function getProgram(key) {
  return SPORT_PROGRAMS.find((p) => p.key === key) || SPORT_PROGRAMS[0];
}

// ── Compat héritée (anciens imports) ─────────────────────────────
export const SPORT_SECTIONS = SPORT_PROGRAMS[0].sections;
export const SPORT_CHALLENGE = SPORT_PROGRAMS[0].challenge;

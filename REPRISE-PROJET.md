# 📦 REPRISE DU PROJET — Cahier de Vacances 2K26

> **À toi, Claude Code, qui reçois ce fichier :** tu reprends un projet existant et
> complet. NE RECOMMENCE RIEN de zéro. Tout le code vit sur GitHub. Ta première
> action est de cloner le dépôt, puis de lire ce document en entier pour avoir tout
> le contexte, et enfin de continuer les modifications demandées par l'utilisateur.

---

## 1. RÉCUPÉRER L'APPLICATION (à faire en premier)

Tout le code source (300+ fichiers, ~45 000 lignes) est sur GitHub :

```bash
git clone https://github.com/maa123venere-hub/cahier-vacances.git
cd cahier-vacances
npm install
```

Puis crée le fichier `.env` à la racine (il n'est PAS sur GitHub car gitignoré) avec
la configuration Firebase publique ci-dessous (clés web Firebase = publiques par
conception, déjà présentes dans le bundle déployé ; la sécurité est assurée par les
règles Firestore + les domaines autorisés, pas par le secret de ces clés) :

```
VITE_FIREBASE_API_KEY=AIzaSyBf_gJCiSS6XDngTa_cmyZogqw1PxGv88o
VITE_FIREBASE_AUTH_DOMAIN=cahier-de-vacance-ae45b.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=cahier-de-vacance-ae45b
VITE_FIREBASE_STORAGE_BUCKET=cahier-de-vacance-ae45b.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=386081685962
VITE_FIREBASE_APP_ID=1:386081685962:web:a3fab0215d1b44a8774f33
VITE_FIREBASE_MEASUREMENT_ID=G-EXLVR873EP
```

Lancer en local :

```bash
npm run dev        # http://localhost:5173
```

Le backend (Auth, Firestore, Cloud Functions) est **déjà déployé et partagé** sur le
projet Firebase `cahier-de-vacance-ae45b`. Une fois `.env` en place, l'app fonctionne
immédiatement en local (comptes, progression, IA…) SANS rien redéployer.

---

## 2. CE QU'EST L'APPLICATION

« Calendrier 2k26 » : une application de **cahier de vacances intelligent** pour
collégiens (6e → 3e), utilisée l'été pour réviser. Stack : **React 18 + Vite 5 +
Firebase (Auth, Firestore, Storage, Functions) + Capacitor (iOS/Android) + PWA**.
Interface 100 % en français. L'admin est `maxwellvenere68@gmail.com`.

### Fonctionnalités (toutes implémentées et en ligne)
- **Cahiers interactifs** : 2 matières (Français, Maths) × 4 niveaux (6e/5e/4e/3e) =
  8 cahiers de 40 jours. Chaque jour : leçon → exercices → résultats. **10 à 15
  exercices par jour** (QCM, vrai/faux, compléter) avec explication, indice, méthode,
  difficulté adaptative, XP, sons, confettis.
- **Sélecteur de matière** Français/Maths en haut de la page cahier (composant
  `SubjectSwitcher`), mémorisé par utilisateur.
- **Brevet blanc 3e** (semaines 7-8) : note /100 et /20, mention DNB, conseils.
- **Bilan de semaine**, **statistiques** par matière/domaine, **badges**, **streaks**,
  **missions quotidiennes**, **coffre journalier**.
- **Authentification** e-mail/mot de passe + **vérification d'e-mail obligatoire**
  (écran `VerifyEmail`, renvoi, déblocage auto) + page `/auth/action` (traite les
  liens de vérification et de réinitialisation de mot de passe).
- **4 cahiers PDF Français** (`public/cahier.pdf` = 4e/168p, `cahier-6eme.pdf`,
  `cahier-5eme.pdf`, `cahier-3eme.pdf`) + **4 cahiers PDF Maths**
  (`public/cahier-maths-{6,5,4,3}eme.pdf`). Depuis la Bibliothèque et les leçons,
  chaque cours ouvre le PDF **à la bonne page** (viewer `PDFViewer` avec pdf.js).
- **Planning IA** : l'élève décrit sa journée (activités + heures) → la fonction
  cloud `generatePlanning` construit son emploi du temps (fallback local hors-ligne).
- **Repas** : 20 recettes en 4 catégories + **recherche** (nom + ingrédients) +
  **génération de recette par IA** (`generateRecipe`) + « Mes recettes » sauvegardées
  + lien de recherche Marmiton (Marmiton bloque l'iframe via X-Frame-Options).
- **Sport** : 5 programmes (full body, cardio, force, souplesse, extérieur) avec
  suggestion selon le jour de la semaine.
- **Assistant IA** (`chatWithAI`), **correction de photo d'exercice** (`correctExercise`),
  **panneau admin** protégé.
- **PWA** auto-update (skipWaiting/clientsClaim), bundles code-splittés.

---

## 3. ARCHITECTURE & CARTE DES FICHIERS

```
src/
  App.jsx                    # routes (react-router), pages lazy-loadées
  context/AuthContext.jsx    # user, niveau, matiere, emailVerified, setMatiere…
  components/
    CahierVacances/          # page principale (calendrier)
    Calendar/ ExerciseCard/ DayFlow/ ExercisePlayer/ Lesson/(LessonPage,PDFViewer)
    SubjectSwitcher/ BilanSemaine/ BrevetBlanc/
    Auth/(Auth, ProtectedRoute, AdminRoute, VerifyEmail) GradeSelect
    Planning/(Planning, PlanningAI) Repas/ RecipeCard/ Sport/
    Bibliotheque/ Statistiques/ Recompenses/ Gamification/ Admin/ AssistantIA/
  pages/                     # une page par route (AuthActionPage, RepasPage, …)
  hooks/                     # useContenus, useLevelData, useDone, useDayProgress,
                             # useExerciseSession/Stats/Progress, useMatiereStats,
                             # useWeekSessions, useGamification, usePlanning,
                             # useCustomRecipes, useAdaptiveDifficulty, useCorrections…
  services/                  # aiChat, aiCorrection, aiPlanning, aiRecipe,
                             # contenusService, adminActions, storage
  data/
    weeks.js curriculum.js curriculumExtra.js lessonPages.js   # Français 4e
    levels/{6,5,4,3}eme/ + index.js                             # registre Français
    maths/{6,5,4,3}eme.js + index.js + shared.js + seedBuilder.js
    maths/drills{6,5,4,3}.js + pdfPages.js                      # (générés)
    seed/{6,5,3}eme.js + extra{6,5,3}.js                        # cahiers multi-matières
    recipes.js sportProgram.js planningTemplate.js badges.js gamification.js subjects.js
functions/index.js           # Cloud Functions (région europe-west1)
public/cahier*.pdf           # les 8 cahiers PDF
scripts/
  cahiers/gen_cahier_*.py    # générateurs des PDF (reportlab) + pagemap*.json
  extend/                    # usine à exercices (run.mjs, templates-maths, banks-francais)
  autosave.sh                # sauvegarde auto (voir §7)
```

### Modèle de données Firestore
- `users/{uid}` : profil (email, displayName, niveau).
- Progression **namespacée par niveau ET matière** : `progress/{niveau}_{matiere}`
  (Français garde la clé legacy `{niveau}` sans suffixe), `dayProgress/{niveau}_{matiere}_{dayKey}`,
  `exerciseSessions` (champs `niveau` + `subject`), `statsSnapshot/{niveau}_{matiere}`,
  `exerciseProgress`, `corrections`, `planning/week`, `recipes/custom`, `sport/{date}`,
  `gamification/stats`, `favorites/*`.
- `contenus/{niveau}/{jours,semaines}` : contenu éditable via l'admin (Français
  4e seedé ; les autres viennent des seeds statiques via `useContenus`).

### Conventions importantes (⚠️ à respecter)
- **`matiere`** = axe SUJET dans AuthContext (`francais` | `maths`). MAIS sur un jour,
  `jour.matiere` = le DOMAINE (grammaire, algèbre…). Le champ session s'appelle `subject`.
  Ne confonds pas les deux. (Voir la mémoire du projet `matiere-axis-conventions`.)
- **Isolation** : ne « simplifie » jamais les clés de `useDone`/`useDayProgress` en
  ajoutant toujours le suffixe matière — Français utilise volontairement la clé legacy
  pour ne pas effacer la progression existante des utilisateurs.
- **Format d'exercice** : `{ id, type:'qcm'|'vrai_faux'|'completer', question, options?,
  answer, explanation, hint?, method? }`. QCM : `answer` doit être EXACTEMENT une des
  `options`. vrai_faux : `answer` = `'vrai'`|`'faux'`. completer : comparaison normalisée
  (trim/minuscule/sans accents) → réponses simples (nombres, mots courts).
- **Aucune clé secrète dans le code** : variables d'environnement + secrets Functions.
  `.env` reste gitignoré.

---

## 4. BUILD, LANCEMENT & DÉPLOIEMENT

```bash
npm run dev        # dev local (port 5173)
npm run build      # build de production -> dist/
```

Déploiement Firebase (nécessite `firebase login` une fois sur la machine) :

```bash
firebase deploy --only hosting                     # les 2 sites d'un coup
firebase deploy --only functions:generatePlanning  # une fonction précise
firebase hosting:channel:deploy <nom> --expires 30d # URL de test jetable (30j max)
```

Projet Firebase : **`cahier-de-vacance-ae45b`**. Deux sites d'hébergement (config
multi-site dans `firebase.json`, cibles `app` et `ete`) :
- **https://cahier-de-vacance-ae45b.web.app** (principal, historique)
- **https://calendrier-2k26-ete.web.app** (permanent, propre) ← à privilégier

Après un déploiement, si l'utilisateur « ne voit pas les changements », c'est le
**cache PWA** de son appareil : rechargement forcé (Cmd+Shift+R), ou fermer/rouvrir
l'app 2 fois sur mobile. Pour un test sans cache, crée une **nouvelle URL de canal**
(`hosting:channel:deploy`) et **ajoute le domaine aux domaines autorisés de Firebase
Auth** sinon la connexion échoue.

⚠️ **Astuce push** : le dépôt contient de gros PDF. Configure
`git config http.postBuffer 524288000` sinon `git push` échoue en « HTTP 400 ».

---

## 5. CLOUD FUNCTIONS (functions/index.js, région europe-west1)

Toutes utilisent le secret Firebase **`ANTHROPIC_API_KEY`** (déjà configuré sur le
projet ; modèle `claude-sonnet-4-6`). Ne mets JAMAIS cette clé dans le code/`.env`.
- `correctExercise` — correction d'une photo d'exercice.
- `chatWithAI` — assistant IA.
- `generatePlanning` — génère le planning du jour à partir d'une description.
- `generateRecipe` — écrit une recette à partir d'un nom de plat.
- `adminDeleteUser`, `adminResetProgress`, `adminSendMessage`, `adminBroadcastNotification`
  — actions admin (réservées à l'e-mail admin).

Front → Functions via `getFunctions(app, 'europe-west1')` + `httpsCallable` (voir
`src/services/ai*.js`).

---

## 6. RÉGÉNÉRER LES CAHIERS PDF (si le contenu change)

Les 8 PDF de `public/` sont générés par des scripts Python (reportlab) :
- `scripts/cahiers/gen_cahier_{6,5,3}eme.py` (Français) et `gen_cahier_maths.py` (les 4 Maths).
- Ils lisent le contenu exporté en JSON (voir l'en-tête de chaque script), produisent le
  PDF ET un `pagemap*.json` (mapping jour → pages) qu'on reporte dans les seeds
  (`lessonPage`/`exercisesPage`) et dans `src/data/maths/pdfPages.js`.
- Dépendances : `pip3 install reportlab pypdf pymupdf`.
Après régénération d'un PDF, vérifier que chaque leçon ouvre bien la bonne page.

---

## 7. SAUVEGARDE AUTOMATIQUE (déjà en place)

Un hook Claude Code **`Stop`** (`.claude/settings.json`) lance `scripts/autosave.sh`
après chaque tour : commit local + push GitHub automatiques, s'il y a des modifs.
Sur une nouvelle machine, ce hook est déjà dans le dépôt cloné. S'il ne se déclenche
pas, l'utilisateur ouvre `/hooks` une fois ou redémarre Claude Code.
Sinon, sauvegarde manuelle à tout moment : `bash scripts/autosave.sh`.

---

## 8. POUR CONTINUER — CE QUE TU DOIS FAIRE

1. Cloner le dépôt (§1), créer `.env`, `npm install`, `npm run dev`.
2. Lire `CLAUDE.md` (s'il existe) et la mémoire projet.
3. Demander à l'utilisateur quelle modification il veut, puis l'implémenter en
   respectant les conventions du §3.
4. Vérifier avec un build (`npm run build`) et, si pertinent, en lançant l'app.
5. Déployer (`firebase deploy --only hosting`) quand l'utilisateur le demande, et lui
   donner une **nouvelle URL de canal** s'il veut voir les changements sans cache.
6. Le push GitHub est automatique (§7) ; pousse manuellement au besoin.

### Historique des grandes étapes déjà faites
Cahiers Français (4 niveaux) → ajout matière Maths (4 niveaux) → audit zéro bug →
recettes + sport enrichis → Bibliothèque PDF à la bonne page → vérification e-mail →
Planning IA → recherche/génération de recettes IA → cahiers PDF (Français puis Maths)
avec liaison de pages → exercices rallongés à 10-15/jour → sauvegarde auto.

**Tout est fonctionnel et en ligne.** L'utilisateur est francophone, non technique :
explique simplement, agis concrètement, et sauvegarde/déploie quand il le demande.
```
```
Dépôt : https://github.com/maa123venere-hub/cahier-vacances
Firebase : cahier-de-vacance-ae45b   |   Admin : maxwellvenere68@gmail.com
URL permanente : https://calendrier-2k26-ete.web.app
```

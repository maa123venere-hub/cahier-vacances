#!/usr/bin/env bash
# Sauvegarde automatique du projet : commit local + push GitHub.
# Déclenché par le hook "Stop" de Claude Code après chaque tour.
# Ne fait rien s'il n'y a aucune modification. Le push est "best-effort"
# (s'il échoue, hors-ligne par ex., le commit local reste la sauvegarde).
set -uo pipefail

# Aller à la racine du dépôt (le script est dans scripts/)
cd "$(dirname "$0")/.." || exit 0

# Est-ce bien un dépôt git ?
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || exit 0

# Rien à sauvegarder ? on sort sans bruit.
if [ -z "$(git status --porcelain)" ]; then
  exit 0
fi

# Gros dépôt (PDF) : éviter l'erreur "HTTP 400" au push.
git config http.postBuffer 524288000 >/dev/null 2>&1 || true

STAMP="$(date '+%Y-%m-%d %H:%M:%S')"
FILES="$(git status --porcelain | wc -l | tr -d ' ')"

git add -A >/dev/null 2>&1
git commit -q -m "Sauvegarde auto — ${STAMP} (${FILES} fichier(s) modifié(s))" >/dev/null 2>&1 || exit 0

# Push best-effort, borné dans le temps pour ne jamais bloquer.
BRANCH="$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo main)"
if command -v timeout >/dev/null 2>&1; then
  timeout 90 git push origin "$BRANCH" >/dev/null 2>&1 && PUSHED=1 || PUSHED=0
else
  git push origin "$BRANCH" >/dev/null 2>&1 && PUSHED=1 || PUSHED=0
fi

if [ "$PUSHED" = "1" ]; then
  printf '{"systemMessage":"💾 Sauvegarde auto : %s fichier(s) commité(s) et poussé(s) sur GitHub (%s)"}\n' "$FILES" "$STAMP"
else
  printf '{"systemMessage":"💾 Sauvegarde auto : %s fichier(s) commité(s) en local (push GitHub à refaire quand la connexion revient)"}\n' "$FILES"
fi
exit 0

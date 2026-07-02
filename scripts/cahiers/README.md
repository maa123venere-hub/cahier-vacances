# Générateurs des cahiers de vacances PDF

Scripts Python (reportlab) qui génèrent les cahiers PDF de `public/` à partir
du contenu de l'appli (seeds exportés en JSON).

- `gen_cahier_6eme.py` -> public/cahier-6eme.pdf (99 pages)
- `gen_cahier_5eme.py` -> public/cahier-5eme.pdf (100 pages)
- `gen_cahier_3eme.py` -> public/cahier-3eme.pdf (102 pages)
- `pagemap*.json` : mapping jour -> pages produit à la génération,
  reporté dans `src/data/seed/*.js` (lessonPage / exercisesPage)
- `validate_maths.mjs` : validation des curriculums Maths (4 niveaux)

Usage : exporter le seed en JSON (voir en-tête de chaque script, chemins à
adapter), puis `python3 gen_cahier_Xeme.py` (dépendances : reportlab, pypdf).

# KMAUGER.

Site personnel de Kéliann Mauger : livres, photographie, projets numériques et cosplay.

🌐 **En ligne :** https://kmauger18.github.io/kmauger/

## Structure

```
index.html              Page unique (navigation par ancres : #livres, #photographie…)
404.html                Redirige vers l'accueil
assets/css/style.css    Styles
assets/js/main.js       Navigation entre les sections et menu mobile
assets/img/             Logo, favicon, icône Apple
.nojekyll               Sert les fichiers tels quels sur GitHub Pages
```

## Modifier le site

- **Textes** : tout est dans `index.html`, une section `<div class="page" id="…">` par page.
- **Images** : déposer les photos dans `assets/img/` puis remplacer les liens Unsplash par `assets/img/ma-photo.jpg`.
- **Publier** : chaque commit sur la branche `main` met le site à jour en une à deux minutes.

## Tester en local

```bash
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

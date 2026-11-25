# KMAUGER.

Site personnel de Kéliann Mauger : livres, photographie, projets numériques et cosplay.

🌐 **En ligne :** https://kmauger18.github.io/kmauger/

## Contenu géré depuis l'espace de gestion

Les textes, les images, les livres, la galerie photo, les projets, les cosplays et les liens se modifient depuis l'[espace de gestion](https://github.com/Kmauger18/kmauger_gestion) (Firebase). Le script `assets/js/cms.js` charge ce contenu à l'ouverture de la page.

Tant que Firebase n'est pas configuré ou que la base est vide, le site affiche le contenu écrit dans `index.html` : il reste complet sans Firebase.

## Structure

```
index.html              Page unique (navigation par ancres : #livres, #photographie…)
404.html                Redirige vers l'accueil
firebase-config.js      Configuration Firebase (la même que dans kmauger_gestion)
assets/css/style.css    Styles
assets/js/main.js       Navigation, menu mobile, filtres et visionneuse de la galerie
assets/js/cms.js        Chargement du contenu géré
assets/img/             Logo, favicon, icône Apple
.nojekyll               Sert les fichiers tels quels sur GitHub Pages
```

Chaque commit sur la branche `main` met le site à jour en une à deux minutes.

## Tester en local

```bash
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

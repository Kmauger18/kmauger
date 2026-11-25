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


## Publication (vraies adresses par page)

Le site est publié par **GitHub Actions** (`.github/workflows/publier.yml`) : `outils/generer.mjs`
transforme le modèle `outils/modele.html` en une page HTML par adresse (`livres/`, `livres/<livre>/`,
`projets/<catégorie>/<projet>/`…), avec titre, description, image de partage et données structurées
propres à chaque page, plus `sitemap.xml`, `robots.txt` et `404.html`.

La publication se relance à chaque modification du dépôt, chaque nuit (pour intégrer les livres et
projets ajoutés dans l'espace de gestion) et à la demande : onglet **Actions → Publier le site → Run workflow**.

Tester en local : `node outils/generer.mjs --sortie _site` puis servir le dossier `_site`.

## Passer au nom de domaine kmauger.com

1. Acheter le domaine, puis chez le registraire créer les enregistrements DNS :
   - `A` sur `@` vers `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` ;
   - `CNAME` sur `www` vers `kmauger18.github.io`.
2. Dans GitHub : **Settings → Pages → Custom domain** → `kmauger.com` → Save, puis cocher **Enforce HTTPS**.

C'est tout : la publication suivante utilise automatiquement `https://kmauger.com/` dans les liens
canoniques, le sitemap et les images de partage, et les anciennes adresses `kmauger18.github.io/kmauger/…`
redirigent vers le domaine.

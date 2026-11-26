// Génère le site publié : une vraie page HTML par adresse (accueil, livres/, livres/<livre>/,
// projets/<catégorie>/<projet>/…), chacune avec son titre, sa description, son image de partage
// et ses données structurées, plus sitemap.xml, robots.txt et 404.html.
//
//   node outils/generer.mjs --sortie _site --url https://kmauger18.github.io/kmauger/
//
// Lancé automatiquement par GitHub Actions (.github/workflows/publier.yml) à chaque
// modification du dépôt et chaque nuit (pour prendre en compte les livres et projets
// ajoutés dans l'espace de gestion). L'adresse du site est fournie par GitHub : avec un
// nom de domaine (ex. kmauger.com) réglé dans Settings → Pages, tout suit automatiquement.
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const arg = (nom, defaut) => { const i = process.argv.indexOf('--' + nom); return i > 0 ? process.argv[i + 1] : defaut; };
const SORTIE = path.resolve(RACINE, arg('sortie', '_site'));
let URL_SITE = arg('url', process.env.SITE_URL || 'https://kmauger18.github.io/kmauger/');
if (!URL_SITE.endsWith('/')) URL_SITE += '/';
const PROJET_FIREBASE = 'kmauger-de247';

const { LIVRES_ORIGINE, slug } = await import(path.join(RACINE, 'assets/js/livres.js'));
const { CATEGORIES_ORIGINE, REALISATIONS_ORIGINE, STATUTS_PROJET } = await import(path.join(RACINE, 'assets/js/projets.js'));
const { ALBUMS_ORIGINE, PHOTOS_ORIGINE } = await import(path.join(RACINE, 'assets/js/albums.js'));

// ---------------------------------------------------------------- Données de la base (lecture publique)
function valeur(v) {
  if (!v) return null;
  if ('stringValue' in v) return v.stringValue;
  if ('integerValue' in v) return Number(v.integerValue);
  if ('doubleValue' in v) return v.doubleValue;
  if ('booleanValue' in v) return v.booleanValue;
  if ('arrayValue' in v) return (v.arrayValue.values || []).map(valeur);
  if ('mapValue' in v) return Object.fromEntries(Object.entries(v.mapValue.fields || {}).map(([k, x]) => [k, valeur(x)]));
  return null;
}
async function visibles(collection) {
  const r = await fetch(`https://firestore.googleapis.com/v1/projects/${PROJET_FIREBASE}/databases/(default)/documents:runQuery`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ structuredQuery: { from: [{ collectionId: collection }], where: { fieldFilter: { field: { fieldPath: 'visible' }, op: 'EQUAL', value: { booleanValue: true } } } } }),
  });
  if (!r.ok) throw new Error(`${collection} : ${r.status}`);
  return (await r.json()).filter(x => x.document).map(x => ({
    id: x.document.name.split('/').pop(),
    ...Object.fromEntries(Object.entries(x.document.fields || {}).map(([k, v]) => [k, valeur(v)])),
  })).sort((a, b) => (a.ordre || 0) - (b.ordre || 0));
}
let livres = LIVRES_ORIGINE, categories = CATEGORIES_ORIGINE, realisations = REALISATIONS_ORIGINE, albums = ALBUMS_ORIGINE, photos = PHOTOS_ORIGINE;
try {
  const [l, c, r] = await Promise.all(['livres', 'projets', 'realisations'].map(visibles));
  if (l.length) livres = l;
  if (c.length && r.length) { categories = c; realisations = r; }
  console.log(`Base : ${l.length} livre(s), ${c.length} catégorie(s), ${r.length} projet(s)`);
} catch (e) { console.warn('Base injoignable, contenu d’origine utilisé :', e.message); }
try {
  const [a, ph] = await Promise.all(['albums', 'photos'].map(visibles));
  if (a.length) { albums = a; photos = ph; }
  console.log(`Base : ${a.length} album(s), ${ph.length} photo(s)`);
} catch (e) { console.warn('Albums non lus dans la base, albums d’origine utilisés :', e.message); }
albums = albums.map(a => ({ ...a, slug: slug(a.titre) }));
livres = livres.map(l => ({ ...l, slug: slug(l.titre) }));
categories = categories.map(c => ({ ...c, slug: slug(c.titre) }));
realisations = realisations.map(r => ({ ...r, slug: slug(r.titre) }));

// ---------------------------------------------------------------- Modèle
const modele = await fs.readFile(path.join(RACINE, 'outils/modele.html'), 'utf8');
function extrairePage(id) {
  const debut = modele.search(new RegExp(`<div class="page[^"]*" id="${id}"`));
  if (debut < 0) throw new Error('Page absente du modèle : ' + id);
  let i = debut, prof = 0;
  const re = /<div\b|<\/div>/g; re.lastIndex = debut;
  for (let m; (m = re.exec(modele));) { prof += m[0] === '</div>' ? -1 : 1; if (prof === 0) { i = re.lastIndex; break; } }
  return modele.slice(debut, i).replace(/class="page[^"]*"/, 'class="page active"');
}
const avantMain = modele.slice(0, modele.indexOf('<main'));
const ouvertureMain = modele.match(/<main[^>]*>/)[0];
const apresMain = modele.slice(modele.indexOf('</main>'));

const esc = t => String(t ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const court = (t, n = 158) => { t = String(t || '').replace(/\*/g, '').replace(/\s+/g, ' ').trim(); return t.length > n ? t.slice(0, n - 1).replace(/\s\S*$/, '') + '…' : t; };
const absolu = src => !src || src.startsWith('data:') ? null : /^https?:/.test(src) ? src.replace('https://kmauger18.github.io/kmauger/', URL_SITE) : URL_SITE + src.replace(/^\.?\//, '');
const OG_DEFAUT = URL_SITE + 'assets/img/og-kmauger.jpg';
const PERSONNE = { '@type': 'Person', name: 'Kéliann Mauger', url: URL_SITE };

function page({ route, id, titre, description, image, imageAlt, jsonld, type = 'website', indexer = true }) {
  const profondeur = route ? route.split('/').length : 0;
  const base = profondeur ? '../'.repeat(profondeur) : './';
  const url = URL_SITE + (route ? route + '/' : '');
  let head = avantMain;
  head = head.replace('<meta charset="UTF-8">', `<meta charset="UTF-8">\n<base href="${base}">`);
  head = head.replace(/<title>[^<]*<\/title>/, `<title>${esc(titre)}</title>`);
  head = head.replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${esc(description)}">`);
  head = head.replace(/<meta property="og:type" content="[^"]*">/, `<meta property="og:type" content="${type}">`);
  head = head.replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${esc(titre)}">`);
  head = head.replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${esc(description)}">`);
  head = head.replace(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${url}">`);
  head = head.replace(/<meta property="og:image" content="[^"]*">/, `<meta property="og:image" content="${esc(image || OG_DEFAUT)}">`);
  if (image) head = head.replace(/<meta property="og:image:width"[^>]*><meta property="og:image:height"[^>]*>\n/, '');
  head = head.replace(/<meta property="og:image:alt" content="[^"]*">/, `<meta property="og:image:alt" content="${esc(imageAlt || titre)}">`);
  head = head.replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${url}">`);
  head = head.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, jsonld ? `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', ...jsonld })}</script>` : '');
  if (id !== 'accueil') head = head.replace(/<link rel="preload" as="image"[^>]*>\n?/, '');
  if (!indexer) head = head.replace('<meta name="theme-color"', '<meta name="robots" content="noindex">\n<meta name="theme-color"');
  head = head.replace('<body>', `<body data-route="${esc(route)}">`);
  // Rubrique active dans le menu
  const rubrique = route ? route.split('/')[0] + '/' : './';
  head = head.replace(/(<nav id="nav"[\s\S]*?<\/nav>)/, n => n.replace(`<a href="${rubrique}">`, `<a href="${rubrique}" class="active" aria-current="page">`));
  return { fichier: route ? route + '/index.html' : 'index.html', html: head + ouvertureMain + '\n' + (typeof id === 'string' && id.startsWith('<') ? id : extrairePage(id)) + '\n' + apresMain, url, indexer };
}

// ---------------------------------------------------------------- Pages
const pages = [
  page({ route: '', id: 'accueil', titre: 'KMAUGER. — Kéliann Mauger : livres, photographie, projets numériques et cosplay', description: 'L’univers créatif de Kéliann Mauger : romans, photographie, sites et applications, cosplay.', jsonld: { ...PERSONNE, image: OG_DEFAUT, description: 'Auteur, photographe, créateur de sites et d’applications, cosplayeur.', sameAs: ['https://www.instagram.com/kmauger18/', 'https://www.instagram.com/kmauger.studio/'] } }),
  page({ route: 'livres', id: 'livres', titre: 'Livres & écriture — Kéliann Mauger', description: court(`Les romans de Kéliann Mauger : ${livres.map(l => l.titre).join(', ')}.`), image: absolu('assets/img/livres/banniere-livres.jpg') }),
  page({ route: 'photographie', id: 'photographie', titre: 'Photographie — KMAUGER.', description: court(`Les albums photo de Kéliann Mauger : ${albums.map(a => a.titre).join(', ')}. Portraits, lumières et atmosphères.`), image: albums[0] ? absolu(albums[0].partage || albums[0].couverture) : undefined }),
  page({ route: 'projets', id: 'projets', titre: 'Projets numériques — KMAUGER.', description: court(`Sites web, applications et jeux créés par Kéliann Mauger : ${realisations.map(r => r.titre).join(', ')}.`), image: absolu('assets/img/projets/banniere-projets.jpg') }),
  page({ route: 'cosplay', id: 'cosplay', titre: 'Cosplay — KMAUGER.', description: 'Les cosplays de Kéliann Mauger : du choix du personnage à la fabrication et au shooting.' }),
  page({ route: 'a-propos', id: 'apropos', titre: 'À propos — Kéliann Mauger', description: 'Qui est Kéliann Mauger : auteur, photographe, créateur numérique et cosplayeur.', jsonld: { '@type': 'ProfilePage', mainEntity: { ...PERSONNE, sameAs: ['https://www.instagram.com/kmauger18/', 'https://www.instagram.com/kmauger.studio/'] } } }),
  page({ route: 'contact', id: 'contact', titre: 'Contact — KMAUGER.', description: 'Un livre, un projet numérique, une collaboration ? Contacter Kéliann Mauger.' }),
  page({ route: 'mentions-legales', id: 'mentions', titre: 'Mentions légales & confidentialité — KMAUGER.', description: 'Éditeur, hébergeur et données personnelles du site KMAUGER.' }),
];
for (const l of livres) {
  pages.push(page({
    route: 'livres/' + l.slug, id: 'livre', type: 'book',
    titre: `${l.titre} — Kéliann Mauger`, description: court(l.description || l.accroche),
    image: absolu(l.couverture), imageAlt: `Couverture de ${l.titre}`,
    jsonld: { '@type': 'Book', name: l.titre, author: PERSONNE, inLanguage: 'fr', genre: l.genre || undefined, bookFormat: 'https://schema.org/Paperback', numberOfPages: l.pages ? Number(l.pages) : undefined, isbn: l.isbn || undefined, image: absolu(l.couverture) || undefined, description: court(l.description || l.accroche, 300), url: URL_SITE + 'livres/' + l.slug + '/', offers: l.lienAmazon ? { '@type': 'Offer', url: l.lienAmazon, availability: 'https://schema.org/InStock' } : undefined },
  }));
}
for (const a of albums) {
  const ph = photos.filter(p => p.album === a.id);
  pages.push(page({
    route: 'photographie/' + a.slug, id: 'album', type: 'article',
    titre: `${a.titre} — Album photo de Kéliann Mauger`, description: court(`${a.sousTitre ? a.sousTitre + '. ' : ''}${a.description || ''}`),
    image: absolu(a.partage || a.couverture), imageAlt: `Album ${a.titre}`,
    jsonld: { '@type': 'ImageGallery', name: a.titre, description: court(a.description, 300), author: PERSONNE, url: URL_SITE + 'photographie/' + a.slug + '/',
      image: ph.map(p => ({ '@type': 'ImageObject', contentUrl: absolu(p.hdUrl || p.apercu) || undefined, caption: p.legende || undefined, creator: PERSONNE })).filter(x => x.contentUrl) },
  }));
}
for (const c of categories) {
  pages.push(page({ route: 'projets/' + c.slug, id: 'categorie', titre: `${c.titre} — Projets numériques de Kéliann Mauger`, description: court(`${c.description || ''} ${realisations.filter(r => r.categorie === c.id).map(r => r.titre).join(', ')}`), image: absolu(c.image) }));
}
for (const r of realisations) {
  const c = categories.find(x => x.id === r.categorie);
  if (!c) continue;
  pages.push(page({
    route: `projets/${c.slug}/${r.slug}`, id: 'projet', type: 'article',
    titre: `${r.titre} — ${c.titre} — KMAUGER.`, description: court(r.accroche || r.description),
    image: absolu(r.image),
    jsonld: { '@type': c.id === 'applications' || /android|ios|application/i.test(r.plateforme || '') ? 'SoftwareApplication' : 'CreativeWork', name: r.titre, author: PERSONNE, creator: PERSONNE, description: court(r.description, 300), image: absolu(r.image) || undefined, url: URL_SITE + `projets/${c.slug}/${r.slug}/`, operatingSystem: /android/i.test(r.plateforme || '') ? 'Android' : undefined, applicationCategory: c.id === 'applications' ? 'UtilitiesApplication' : undefined, offers: c.id === 'applications' ? { '@type': 'Offer', price: '0', priceCurrency: 'EUR' } : undefined },
  }));
}

// Page 404 : servie à n'importe quelle profondeur, la base est calculée au chargement
const p404 = page({ route: '', indexer: false, titre: 'Page introuvable — KMAUGER.', description: 'Cette page n’existe pas ou a été déplacée.',
  id: `<div class="page active" id="introuvable"><section class="wrap page-hero"><div class="eyebrow">Erreur 404</div><h1 class="display">Page<br><em>introuvable.</em></h1><p class="lead">Cette page n’existe pas ou a été déplacée. Les livres, les photos et les projets t’attendent par ici :</p><a class="btn" href="./">Retour à l’accueil <span>↗</span></a></section></div>` });
p404.fichier = '404.html';
p404.html = p404.html.replace('<base href="./">', `<script>document.write('<base href="' + (location.pathname.indexOf('/kmauger/') === 0 ? '/kmauger/' : '/') + '">')</script>`).replace('data-route=""', 'data-route="404"');

// ---------------------------------------------------------------- Écriture
await fs.rm(SORTIE, { recursive: true, force: true });
await fs.mkdir(SORTIE, { recursive: true });
for (const p of [...pages, p404]) {
  const f = path.join(SORTIE, p.fichier);
  await fs.mkdir(path.dirname(f), { recursive: true });
  await fs.writeFile(f, p.html);
}
await fs.cp(path.join(RACINE, 'assets'), path.join(SORTIE, 'assets'), { recursive: true });
await fs.copyFile(path.join(RACINE, 'firebase-config.js'), path.join(SORTIE, 'firebase-config.js'));
await fs.writeFile(path.join(SORTIE, '.nojekyll'), '');
const aujourdhui = new Date().toISOString().slice(0, 10);
await fs.writeFile(path.join(SORTIE, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.filter(p => p.indexer).map(p => `  <url><loc>${p.url}</loc><lastmod>${aujourdhui}</lastmod></url>`).join('\n')}\n</urlset>\n`);
await fs.writeFile(path.join(SORTIE, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${URL_SITE}sitemap.xml\n`);
console.log(`${pages.length + 1} pages générées pour ${URL_SITE}`);

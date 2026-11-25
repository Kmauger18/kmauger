// Contenu géré depuis l'espace de gestion (dépôt kmauger_gestion, base Firebase).
// Tant que Firebase n'est pas configuré ou que la base est vide, le site garde
// le contenu écrit dans index.html : ce fichier ne change alors rien.
import { firebaseConfig, firebaseActif, FIREBASE_SDK } from '../../firebase-config.js';

const esc = t => String(t ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
// *mot* → italique, retour à la ligne → <br>
const fmt = t => esc(t).replace(/\*([^*\n]+)\*/g, '<em>$1</em>').replace(/\n/g, '<br>');
const para = t => String(t || '').split(/\n{2,}/).map(p => `<p>${fmt(p)}</p>`).join('');
const $$ = s => [...document.querySelectorAll(s)];
const lienSur = u => /^(https?:\/\/|mailto:)/i.test(u || '') ? u : '';

export const CATEGORIES_PHOTO = { paysages: 'Paysages', lumieres: 'Lumières', atmospheres: 'Atmosphères', portraits: 'Portraits', macro: 'Macro', urbain: 'Urbain', autres: 'Autres' };
const STATUTS_LIVRE = { disponible: 'Disponible', bientot: 'Bientôt', ecriture: 'En écriture' };
const TYPES_PROJET = { site: 'Site web', application: 'Application', jeu: 'Jeu', autre: 'Projet' };

// ---------------------------------------------------------------- Textes, liens, images
function appliquerTextes(t) {
  $$('[data-cms]').forEach(el => {
    const v = t[el.dataset.cms];
    if (typeof v === 'string' && v.trim()) el.innerHTML = fmt(v);
  });
}
function appliquerLiens(l) {
  $$('[data-lien]').forEach(a => {
    const cle = a.dataset.lien;
    const v = (l[cle] || '').trim();
    if (cle === 'email') { a.hidden = !v; if (v) a.href = 'mailto:' + v; return; }
    if (lienSur(v)) a.href = v;
  });
}
function appliquerImage(cle, src) {
  $$(`[data-img="${cle}"]`).forEach(img => {
    img.src = src;
    if (cle === 'apropos_portrait') img.classList.add('portrait');
  });
}

// ---------------------------------------------------------------- Listes
function rendreLivres(el, livres) {
  el.innerHTML = livres.length ? livres.map(l => {
    const lien = lienSur(l.lien);
    return `<article class="book">
      ${l.couverture ? `<div class="cover"><img src="${esc(l.couverture)}" alt="Couverture de ${esc(l.titre)}" loading="lazy"></div>`
        : `<div class="cover cover-type"><span>${esc(l.titre)}</span><small>Kéliann Mauger</small></div>`}
      <div class="book-body">
        ${STATUTS_LIVRE[l.statut] ? `<span class="pill ${esc(l.statut)}">${STATUTS_LIVRE[l.statut]}</span>` : ''}
        <h3>${esc(l.titre)}</h3>
        <p class="book-meta">${[l.genre, l.annee].filter(Boolean).map(esc).join(' · ')}</p>
        ${l.resume ? `<div class="book-text">${para(l.resume)}</div>` : ''}
        ${lien ? `<a class="btn btn-small" href="${esc(lien)}" target="_blank" rel="noopener">${esc(l.libelleLien || 'Se procurer le livre')} ↗</a>` : ''}
      </div></article>`;
  }).join('') : '<p class="soon">Les livres arrivent bientôt.</p>';
}
function rendrePhotos(el, photos) {
  el.innerHTML = photos.length ? photos.map(p => `
    <figure class="shot" data-c="${esc(p.categorie)}"><div class="tile"><img src="${esc(p.apercu)}" alt="${esc(p.legende || CATEGORIES_PHOTO[p.categorie] || '')}" loading="lazy"${p.hd ? ` data-hd="${esc(p.id)}"` : ''}></div>
    <figcaption class="card-meta"><span class="card-title">${esc(p.legende || '')}</span><span class="num">${esc(CATEGORIES_PHOTO[p.categorie] || '')}</span></figcaption></figure>`).join('')
    : '<p class="soon">Les photos arrivent bientôt.</p>';
  window.KM?.initGalerie(CATEGORIES_PHOTO);
}
function rendreProjets(el, projets) {
  el.innerHTML = projets.length ? projets.map(p => {
    const lien = lienSur(p.lien);
    return `<article class="project">
      <div class="tile">${p.image ? `<img src="${esc(p.image)}" alt="${esc(p.titre)}" loading="lazy">` : `<div class="tile-type">${esc(p.titre)}</div>`}</div>
      <div class="card-meta"><span class="card-title">${esc(p.titre)}</span><span class="num">${esc(TYPES_PROJET[p.type] || '')}</span></div>
      ${p.description ? `<p class="desc">${fmt(p.description)}</p>` : ''}
      ${p.technologies ? `<p class="tags">${p.technologies.split(',').map(t => t.trim()).filter(Boolean).map(t => `<span>${esc(t)}</span>`).join('')}</p>` : ''}
      ${lien ? `<a class="link" href="${esc(lien)}" target="_blank" rel="noopener">${esc(p.libelleLien || 'Voir le projet')} ↗</a>` : ''}
    </article>`;
  }).join('') : '<p class="soon">Les projets arrivent bientôt.</p>';
}
function rendreCosplays(el, cosplays) {
  el.innerHTML = cosplays.length ? cosplays.map(c => `
    <article class="project">
      <div class="tile tall">${c.image ? `<img src="${esc(c.image)}" alt="${esc(c.titre)}" loading="lazy">` : `<div class="tile-type">${esc(c.titre)}</div>`}</div>
      <div class="card-meta"><span class="card-title">${esc(c.titre)}</span><span class="num">${esc(c.annee || '')}</span></div>
      ${c.univers ? `<p class="book-meta">${esc(c.univers)}</p>` : ''}
      ${c.description ? `<p class="desc">${fmt(c.description)}</p>` : ''}
    </article>`).join('') : '<p class="soon">Les premières réalisations arrivent bientôt.</p>';
}

// ---------------------------------------------------------------- Lancement
async function demarrer() {
  if (!firebaseActif) return;
  const [appMod, fsMod] = await Promise.all([
    import(`${FIREBASE_SDK}/firebase-app.js`),
    import(`${FIREBASE_SDK}/firebase-firestore-lite.js`),
  ]);
  const fs = fsMod.getFirestore(appMod.initializeApp(firebaseConfig));
  const { doc, getDoc, getDocs, collection, query, where } = fsMod;

  window.KM_hd = async id => { const s = await getDoc(doc(fs, 'photos_hd', id)); return s.exists() ? s.data().data : ''; };
  const visibles = async col => (await getDocs(query(collection(fs, col), where('visible', '==', true))))
    .docs.map(d => ({ id: d.id, ...d.data() })).sort((a, b) => (a.ordre || 0) - (b.ordre || 0));

  const [textes, liens] = await Promise.all(['textes', 'liens'].map(id => getDoc(doc(fs, 'contenu', id))));
  // Base pas encore remplie depuis l'espace de gestion : on garde le contenu de la page
  if (!textes.exists()) return;
  appliquerTextes(textes.data());
  if (liens.exists()) appliquerLiens(liens.data());

  getDocs(collection(fs, 'images')).then(s => s.forEach(d => { const v = d.data().data; if (v) appliquerImage(d.id, v); }))
    .catch(e => console.warn('Images non chargées', e));

  const listes = [
    ['liste-livres', 'livres', rendreLivres],
    ['galerie-photos', 'photos', rendrePhotos],
    ['liste-projets', 'projets', rendreProjets],
    ['liste-cosplay', 'cosplays', rendreCosplays],
  ];
  await Promise.all(listes.map(async ([idEl, col, rendre]) => {
    const el = document.getElementById(idEl);
    if (!el) return;
    try { rendre(el, await visibles(col)); } catch (e) { console.warn('Contenu « ' + col + ' » non chargé', e); }
  }));
}

demarrer().catch(e => console.warn('Contenu géré non chargé, le contenu de la page est conservé.', e));

// Photographie : albums (page photographie/) et portfolio d'un album (photographie/<album>/).
// Les photos sans album forment la galerie libre de la page Photographie.
// cms.js remplace ces données par celles de la base (collections « albums » et « photos »).
const IMG = 'assets/img/photos/st-line/';
const esc = t => String(t ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmt = t => esc(t).replace(/\*([^*\n]+)\*/g, '<em>$1</em>').replace(/\n/g, '<br>');
const para = t => String(t || '').split(/\n{2,}/).filter(Boolean).map(p => `<p>${fmt(p)}</p>`).join('');
export const slug = t => String(t || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
export const CATEGORIES_PHOTO = { paysages: 'Paysages', lumieres: 'Lumières', atmospheres: 'Atmosphères', portraits: 'Portraits', automobile: 'Automobile', macro: 'Macro', urbain: 'Urbain', autres: 'Autres' };

export const ALBUMS_ORIGINE = [
  { id: 'st-line', titre: 'ST-Line', sousTitre: 'Une Fiesta, une lumière d’automne',
    description: 'Une séance photo autour d’une Ford Fiesta ST-Line, entre portraits et détails : le rétroviseur, le badge, les clés, la jante.\n\nUne lumière d’automne, des feuilles au sol, un ciel très bleu et une carrosserie bleu nuit qui accroche chaque reflet.',
    date: 'Automne 2026', lieu: '', modele: 'Éléa', lienModele: '', couverture: IMG + '01.webp', partage: IMG + 'partage.jpg', ordre: 1, visible: true },
];
export const PHOTOS_ORIGINE = [
  { album: 'st-line', legende: "Lumière d’automne", categorie: 'portraits', apercu: IMG + '01-m.webp', hdUrl: IMG + '01.webp', ratio: 0.665, ordre: 1, visible: true },
  { album: 'st-line', legende: "Dans les feuilles", categorie: 'automobile', apercu: IMG + '02-m.webp', hdUrl: IMG + '02.webp', ratio: 1.503, ordre: 2, visible: true },
  { album: 'st-line', legende: "Face à face", categorie: 'automobile', apercu: IMG + '03-m.webp', hdUrl: IMG + '03.webp', ratio: 0.665, ordre: 3, visible: true },
  { album: 'st-line', legende: "Ciel bleu, capot bleu nuit", categorie: 'portraits', apercu: IMG + '04-m.webp', hdUrl: IMG + '04.webp', ratio: 0.665, ordre: 4, visible: true },
  { album: 'st-line', legende: "Fiesta ST", categorie: 'automobile', apercu: IMG + '05-m.webp', hdUrl: IMG + '05.webp', ratio: 0.665, ordre: 5, visible: true },
  { album: 'st-line', legende: "Prendre le volant", categorie: 'portraits', apercu: IMG + '06-m.webp', hdUrl: IMG + '06.webp', ratio: 1.503, ordre: 6, visible: true },
  { album: 'st-line', legende: "Dans le rétroviseur", categorie: 'portraits', apercu: IMG + '07-m.webp', hdUrl: IMG + '07.webp', ratio: 1.504, ordre: 7, visible: true },
  { album: 'st-line', legende: "Les clés", categorie: 'portraits', apercu: IMG + '08-m.webp', hdUrl: IMG + '08.webp', ratio: 0.665, ordre: 8, visible: true },
  { album: 'st-line', legende: "Porte-clés miniature", categorie: 'automobile', apercu: IMG + '09-m.webp', hdUrl: IMG + '09.webp', ratio: 1.504, ordre: 9, visible: true },
  { album: 'st-line', legende: "Badge ST-Line", categorie: 'automobile', apercu: IMG + '10-m.webp', hdUrl: IMG + '10.webp', ratio: 1.504, ordre: 10, visible: true },
  { album: 'st-line', legende: "Habitacle", categorie: 'automobile', apercu: IMG + '11-m.webp', hdUrl: IMG + '11.webp', ratio: 0.665, ordre: 11, visible: true },
  { album: 'st-line', legende: "Jante", categorie: 'automobile', apercu: IMG + '12-m.webp', hdUrl: IMG + '12.webp', ratio: 1.503, ordre: 12, visible: true },
];

let albums = ALBUMS_ORIGINE.map(a => ({ ...a, slug: slug(a.titre) }));
let photos = PHOTOS_ORIGINE.map((p, i) => ({ id: 'o' + i, ...p }));
export const albumsCourants = () => albums;
export const photosCourantes = () => photos;
const photosDe = id => photos.filter(p => p.album === id);
const libres = () => photos.filter(p => !p.album || !albums.some(a => a.id === p.album));
const route = () => (typeof document !== 'undefined' && document.body.dataset.route) || '';
const sansAlbum = () => libres().length;
const couvertureDe = a => a.couverture || photosDe(a.id)[0]?.apercu || '';
// Version légère d'une image du site (NN.webp → NN-m.webp)
const miniature = c => /\/assets\/img\/photos\/.+\/\d+\.webp$|^assets\/img\/photos\/.+\/\d+\.webp$/.test(c) ? c.replace(/(\d+)\.webp$/, '$1-m.webp') : c;
const orientation = p => (p.ratio || 1) >= 1.2 ? 'paysage' : (p.ratio || 1) <= 0.85 ? 'portrait' : 'carre';

function figure(p, i, total, legendeCat = true) {
  const leg = p.legende || CATEGORIES_PHOTO[p.categorie] || 'photo';
  return `<figure class="shot ${orientation(p)}"${p.ratio ? ` style="--r:${Number(p.ratio)}"` : ''} tabindex="0" aria-label="Agrandir : ${esc(leg)}" data-c="${esc(p.categorie || 'autres')}"><div class="tile"><img src="${esc(p.apercu)}" alt="${esc(leg)}" loading="lazy" decoding="async"${p.hdUrl ? ` data-hd-url="${esc(p.hdUrl)}"` : p.hd ? ` data-hd="${esc(p.id)}"` : ''}></div>
    <figcaption class="card-meta"><span class="card-title">${esc(p.legende || '')}</span><span class="num">${total ? `${String(i + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}` : legendeCat ? esc(CATEGORIES_PHOTO[p.categorie] || '') : ''}</span></figcaption></figure>`;
}
// Photo dont on ne connaît pas le format : classée à son chargement
function classerAuChargement(el) {
  el.querySelectorAll('.shot.carre img, .shot:not([style]) img').forEach(img => {
    const go = () => { const r = img.naturalWidth / img.naturalHeight, f = img.closest('.shot'); f.classList.replace('carre', r >= 1.2 ? 'paysage' : r <= 0.85 ? 'portrait' : 'carre'); if (!f.style.getPropertyValue('--r')) f.style.setProperty('--r', r.toFixed(3)); };
    img.complete && img.naturalWidth ? go() : img.addEventListener('load', go, { once: true });
  });
}

// ---------------------------------------------------------------- Page Photographie
function rendreListeAlbums() {
  const el = document.getElementById('liste-albums');
  if (!el) return;
  const bloc = document.getElementById('bloc-albums');
  if (bloc) bloc.hidden = !albums.length;
  el.innerHTML = albums.map((a, i) => {
    const n = photosDe(a.id).length;
    return `<a class="album-carte" href="photographie/${esc(a.slug)}/">
      <div class="album-img">${couvertureDe(a) ? `<img src="${esc(miniature(couvertureDe(a)))}" alt="" loading="${i > 2 ? 'lazy' : 'eager'}" decoding="async">` : ''}
        <div class="album-voile"><span class="num">${n} photo${n > 1 ? 's' : ''}${a.date ? ' · ' + esc(a.date) : ''}</span><h3>${esc(a.titre)}</h3>${a.sousTitre ? `<p>${fmt(a.sousTitre)}</p>` : ''}</div></div>
      <span class="album-ouvrir">Ouvrir l’album <i>→</i></span></a>`;
  }).join('');
}
function rendreGalerieLibre() {
  if (route() !== 'photographie') return;
  const el = document.getElementById('galerie-photos'), bloc = document.getElementById('bloc-galerie');
  if (!el) return;
  const l = libres();
  if (bloc) bloc.hidden = !l.length && albums.length > 0;
  el.innerHTML = l.map(p => figure(p, 0, 0)).join('');
  classerAuChargement(el);
  window.KM?.initGalerie(CATEGORIES_PHOTO);
}

// ---------------------------------------------------------------- Page d'un album (portfolio)
function rendreAlbum() {
  const m = route().match(/^photographie\/([^/]+)$/), el = document.getElementById('page-album');
  if (!m || !el) return;
  const i = albums.findIndex(x => x.slug === decodeURIComponent(m[1]));
  const a = albums[i];
  const galerie = document.getElementById('galerie-photos');
  if (!a) {
    el.innerHTML = `<section class="wrap page-hero"><a class="back" href="photographie/">← Photographie</a><h1 class="display">Album<br><em>introuvable.</em></h1></section>`;
    if (galerie) galerie.innerHTML = '';
    return;
  }
  document.title = `${a.titre} — Photographie — KMAUGER.`;
  const l = photosDe(a.id), cov = couvertureDe(a);
  const suivant = albums.length > 1 ? albums[(i + 1) % albums.length] : null;
  const lienModele = /^https?:\/\//i.test(a.lienModele || '') ? a.lienModele : '';
  const reseau = u => /instagram/i.test(u) ? 'Instagram' : /tiktok/i.test(u) ? 'TikTok' : /facebook/i.test(u) ? 'Facebook' : /youtube/i.test(u) ? 'YouTube' : /(x|twitter)\.com/i.test(u) ? 'X' : 'Site';
  const infos = [['Photographie', 'Kéliann Mauger'], ['Modèle', a.modele], ['Date', a.date], ['Lieu', a.lieu], ['Photos', String(l.length)]].filter(([, v]) => v);
  const autres = l.filter(p => (p.hdUrl || p.apercu) !== cov && p.apercu !== cov).slice(0, 2);
  const hd = p => p.hdUrl || p.apercu;
  const puces = [`${l.length} photo${l.length > 1 ? 's' : ''}`, a.date, a.modele && `Modèle · ${a.modele}`].filter(Boolean);
  el.innerHTML = `
    <section class="album-hero">
      ${cov ? `<div class="album-hero-fond" style="background-image:url('${esc(cov)}')" aria-hidden="true"></div>` : ''}
      <span class="album-hero-filigrane" aria-hidden="true">${esc(a.titre)}</span>
      <div class="wrap album-hero-grille">
        <div class="album-hero-texte">
          <a class="back" href="photographie/">← Photographie</a>
          <div class="eyebrow">Album ${String(i + 1).padStart(2, '0')} · Portfolio</div>
          <h1 class="album-titre">${esc(a.titre)}<em>.</em></h1>
          ${a.sousTitre ? `<p class="album-sous-titre">${fmt(a.sousTitre)}</p>` : ''}
          <ul class="album-puces">${puces.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
          <a class="btn album-defiler" href="${location.pathname}#portfolio" data-defiler>Voir la série <span>↓</span></a>
        </div>
        <div class="album-hero-collage">
          ${cov ? `<figure class="col-principale"><img src="${esc(cov)}" alt="${esc(a.titre)} — photo de couverture" fetchpriority="high" decoding="async"></figure>` : ''}
          ${autres.map((p, k) => `<figure class="col-${k ? 'b' : 'a'}"><img src="${esc(hd(p))}" alt="${esc(p.legende || '')}" decoding="async"><figcaption>${esc(p.legende || '')}</figcaption></figure>`).join('')}
          <span class="album-hero-compteur">01 — ${String(l.length).padStart(2, '0')}</span>
        </div>
      </div>
    </section>
    <section class="wrap album-intro">
      <div class="album-desc">${para(a.description)}</div>
      <dl class="album-infos">${infos.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${k === 'Modèle' && lienModele ? `<a href="${esc(lienModele)}" target="_blank" rel="noopener">${esc(v)} <small>${reseau(lienModele)} ↗</small></a>` : esc(v)}</dd></div>`).join('')}</dl>
    </section>`;
  if (galerie) {
    galerie.innerHTML = l.map((p, k) => figure(p, k, l.length)).join('') || '<p class="soon">Les photos de cet album arrivent bientôt.</p>';
    classerAuChargement(galerie);
    window.KM?.initGalerie();
  }
  const fin = document.getElementById('album-fin');
  if (fin) fin.innerHTML = `
    <div class="album-fin-texte"><div class="eyebrow">Fin de l’album</div><h2 class="section-title">${esc(a.titre)}<em>.</em></h2>
      <p>Une envie de séance photo, un projet, une collaboration ? <a href="contact/">Parlons-en.</a></p></div>
    ${suivant ? `<a class="album-suivant" href="photographie/${esc(suivant.slug)}/">${couvertureDe(suivant) ? `<img src="${esc(couvertureDe(suivant))}" alt="" loading="lazy">` : ''}<span><small>Album suivant</small><b>${esc(suivant.titre)}</b></span></a>`
      : `<a class="btn" href="photographie/">Tous les albums <span>↗</span></a>`}`;
  const collage = el.querySelector('.album-hero-collage');
  if (collage && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const bouger = () => { const y = Math.min(window.scrollY, 900); collage.style.setProperty('--py', y); };
    window.addEventListener('scroll', bouger, { passive: true }); bouger();
  }
  el.querySelector('[data-defiler]')?.addEventListener('click', e => { e.preventDefault(); document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' }); });
}

function toutRendre() { rendreListeAlbums(); rendreGalerieLibre(); rendreAlbum(); if (typeof window !== 'undefined') window.dispatchEvent(new Event('km:donnees')); }

export function definirAlbums(liste) { albums = liste.map(a => ({ ...a, slug: slug(a.titre) })); toutRendre(); }
export function definirPhotos(liste) { photos = liste; toutRendre(); }
if (typeof document !== 'undefined') toutRendre();

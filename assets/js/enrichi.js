// Blocs calculés à partir des données du site : à la une, chiffres, derniers projets,
// technologies, thèmes photo, univers. Ils se mettent à jour quand la base est chargée.
import { livresCourants, STATUTS_LIVRE } from './livres.js?v=202611252017';
import { projetsCourants, carteProjet, STATUTS } from './projets.js?v=202611252017';

const esc = t => String(t ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmt = t => esc(t).replace(/\*([^*\n]+)\*/g, '<em>$1</em>').replace(/\n/g, '<br>');
const $ = id => document.getElementById(id);
const lienSur = u => /^https?:\/\//i.test(u || '') ? u : '';
const CAT_PHOTO = { paysages: 'Paysages', lumieres: 'Lumières', atmospheres: 'Atmosphères', portraits: 'Portraits', macro: 'Macro', urbain: 'Urbain', autres: 'Autres' };

const stat = (n, label) => `<div class="stat"><b>${esc(n)}</b><span>${esc(label)}</span></div>`;
const nbPhotos = () => document.querySelectorAll('#galerie-photos .shot').length;
const nbCosplays = () => document.querySelectorAll('#liste-cosplay article').length;
const technos = reals => {
  const m = new Map();
  reals.forEach(r => String(r.technologies || '').split(',').map(t => t.trim()).filter(Boolean).forEach(t => m.set(t, (m.get(t) || 0) + 1)));
  return [...m.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
};
const premierPara = t => String(t || '').split(/\n{2,}/)[0];

function rendre() {
  // ---------- Bandeau défilant (texte modifiable dans la gestion)
  const src = document.querySelector('[data-cms="accueil_bandeau"]'), track = $('ticker-track');
  if (src && track) {
    const mots = src.textContent.split('·').map(m => m.trim()).filter(Boolean);
    const une = `<span class="ticker-text">${mots.map(esc).join('<b>·</b>')}<b>·</b></span>`;
    track.innerHTML = une.repeat(4);
  }
  const livres = livresCourants();
  const { categories, realisations } = projetsCourants();

  // ---------- Accueil : livre à la une
  const une = livres.find(l => l.statut === 'disponible') || livres[0];
  if ($('home-une')) {
    $('home-une-wrap').hidden = !une;
    if (une) {
      const amazon = lienSur(une.lienAmazon), coollibri = lienSur(une.lienCoolLibri);
      $('home-une').innerHTML = `<div class="feature-book">
        <a class="cover big" href="#livre/${esc(une.id)}">${une.couverture ? `<img src="${esc(une.couverture)}" alt="Couverture de ${esc(une.titre)}">` : `<span>${esc(une.titre)}</span>`}</a>
        <div>
          <div class="eyebrow">${esc([une.genre, STATUTS_LIVRE[une.statut]].filter(Boolean).join(' · '))}</div>
          <h2 class="book-title">${esc(une.titre)}</h2>
          ${une.accroche ? `<p class="project-hook">${fmt(une.accroche)}</p>` : ''}
          <p class="feature-text">${fmt(premierPara(une.description).replace(une.accroche || '§§', '').trim())}</p>
          <div class="book-buy"><a class="btn btn-solid" href="#livre/${esc(une.id)}">Découvrir le livre <span>→</span></a>
          ${amazon ? `<a class="btn" href="${esc(amazon)}" target="_blank" rel="noopener">Amazon <span>↗</span></a>` : ''}
          ${coollibri ? `<a class="btn" href="${esc(coollibri)}" target="_blank" rel="noopener">CoolLibri <span>↗</span></a>` : ''}</div>
        </div></div>`;
    }
  }

  // ---------- Chiffres
  const chiffres = [stat(livres.length, livres.length > 1 ? 'Romans' : 'Roman'), stat(realisations.length, 'Projets numériques'), stat(nbPhotos(), 'Photographies'), stat(4, 'Univers créatifs')].join('');
  if ($('home-stats')) $('home-stats').innerHTML = chiffres;
  if ($('apropos-stats')) $('apropos-stats').innerHTML = chiffres;
  if ($('livres-stats')) {
    const dispo = livres.filter(l => l.statut === 'disponible').length;
    const genres = new Set(livres.map(l => l.genre).filter(Boolean)).size;
    $('livres-stats').innerHTML = [stat(livres.length, livres.length > 1 ? 'Romans' : 'Roman'), stat(dispo, dispo > 1 ? 'Disponibles' : 'Disponible'), stat(livres.length - dispo, 'À paraître'), stat(genres, genres > 1 ? 'Genres' : 'Genre')].join('');
  }
  if ($('projets-stats')) {
    const enLigne = realisations.filter(r => r.statut === 'en-ligne' || r.statut === 'beta').length;
    $('projets-stats').innerHTML = [stat(realisations.length, realisations.length > 1 ? 'Projets' : 'Projet'), stat(categories.length, categories.length > 1 ? 'Catégories' : 'Catégorie'), stat(technos(realisations).length, 'Technologies'), stat(enLigne, 'En ligne ou en bêta')].join('');
  }

  // ---------- Accueil : derniers projets (un par catégorie d'abord)
  if ($('home-projets')) {
    const choix = [];
    categories.forEach(c => { const r = realisations.find(x => x.categorie === c.id); if (r) choix.push(r); });
    realisations.forEach(r => { if (!choix.includes(r)) choix.push(r); });
    $('home-projets').innerHTML = choix.slice(0, 3).map(carteProjet).join('') || '<p class="soon">Les projets arrivent bientôt.</p>';
  }

  // ---------- Projets : à la une + technologies
  if ($('projets-une')) {
    const r = realisations.find(x => lienSur(x.lien) && (x.captures || []).length) || realisations[0];
    $('projets-une-wrap').hidden = !r;
    if (r) {
      const c = categories.find(x => x.id === r.categorie);
      $('projets-une').innerHTML = `<a class="feature-project" href="#projet/${esc(r.slug)}">
        <div class="tile">${r.image ? `<img src="${esc(r.image)}" alt="${esc(r.titre)}">` : ''}</div>
        <div>
          <div class="eyebrow">${esc([c?.titre, r.plateforme, STATUTS[r.statut]].filter(Boolean).join(' · '))}</div>
          <h2 class="book-title">${esc(r.titre)}</h2>
          ${r.accroche ? `<p class="project-hook">${fmt(r.accroche)}</p>` : ''}
          <span class="btn btn-solid">Découvrir le projet <span>→</span></span>
        </div></a>`;
    }
  }
  if ($('projets-techs')) $('projets-techs').innerHTML = technos(realisations).map(([t, n]) => `<span>${esc(t)}<small>${n}</small></span>`).join('');

  // ---------- Photographie : thèmes
  if ($('photo-themes')) {
    const m = new Map();
    document.querySelectorAll('#galerie-photos .shot').forEach(f => m.set(f.dataset.c, (m.get(f.dataset.c) || 0) + 1));
    $('photo-themes').innerHTML = [...m.entries()].map(([k, n]) => `<button type="button" data-theme="${esc(k)}">${esc(CAT_PHOTO[k] || k)}<small>${n}</small></button>`).join('');
    $('photo-themes').querySelectorAll('[data-theme]').forEach(b => b.onclick = () => window.KM?.filtrer(b.dataset.theme));
  }

  // ---------- À propos : univers
  if ($('apropos-univers')) {
    const n = nbCosplays();
    const lignes = [
      ['#livres', 'Livres & écriture', `${livres.length} roman${livres.length > 1 ? 's' : ''}`],
      ['#photographie', 'Photographie', `${nbPhotos()} photo${nbPhotos() > 1 ? 's' : ''}`],
      ['#projets', 'Projets numériques', `${realisations.length} projet${realisations.length > 1 ? 's' : ''}`],
      ['#cosplay', 'Cosplay', n ? `${n} cosplay${n > 1 ? 's' : ''}` : 'Bientôt'],
    ];
    $('apropos-univers').innerHTML = lignes.map(([h, t, d], i) => `<a href="${h}"><span class="num">${String(i + 1).padStart(2, '0')}</span><b>${esc(t)}</b><small>${esc(d)}</small><i>→</i></a>`).join('');
  }
}

window.addEventListener('km:donnees', rendre);
rendre();

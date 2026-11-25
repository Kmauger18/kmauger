// Projets numériques : catégories (projets/), liste d’une catégorie (projets/<catégorie>/)
// et fiche d'un projet (projets/<catégorie>/<projet>/). cms.js remplace ces données par celles de la base.

const IMG = 'assets/img/projets/';
export const CATEGORIES_ORIGINE = [
  { id: 'sites', titre: 'Sites web', description: 'Design, développement et expériences web.', image: IMG + 'cat-sites.webp', visible: true, ordre: 1 },
  { id: 'applications', titre: 'Applications', description: 'Outils numériques et interfaces utiles.', image: IMG + 'cat-applications.webp', visible: true, ordre: 2 },
  { id: 'jeux', titre: 'Jeux', description: 'Concepts, univers et prototypes interactifs.', image: 'assets/img/deco/cat-jeux.webp', visible: true, ordre: 3 },
];

export const REALISATIONS_ORIGINE = [
  {
    titre: 'Normandy Soldiers Memory', categorie: 'sites', statut: 'en-ligne', annee: '2026',
    accroche: 'Le site d’une association de reconstitution historique de la Seconde Guerre mondiale, avec son espace de gestion.',
    description: 'Normandy Soldiers Memory fait revivre le quotidien civil et militaire de 1939-1945, à Ifs, dans le Calvados. J’ai conçu le site de A à Z : une identité « dossier d’archives » avec des typographies d’époque, huit pages et une galerie « Archives du Front » avec filtres et visionneuse.\n\nLe bureau de l’association gère lui-même son contenu depuis un espace privé : textes, agenda des sorties, historique, questions fréquentes, photos et bandeau d’annonce, sans jamais toucher au code.',
    points: 'Huit pages : association, activités, historique, archives, agenda, nous rejoindre, contact\nGalerie photo avec filtres par catégorie et visionneuse\nAgenda qui retire tout seul les dates passées\nEspace de gestion sécurisé pour l’association\nPensé pour le téléphone autant que pour l’ordinateur',
    plateforme: 'Site web', technologies: 'HTML, CSS, JavaScript, Firebase',
    lien: 'https://kmauger18.github.io/normandy-soldiers-memory/', libelleLien: 'Voir le site',
    image: IMG + 'nsm-cover.jpg', captures: [IMG + 'nsm-1.jpg', IMG + 'nsm-2.jpg', IMG + 'nsm-3.jpg'], visible: true, ordre: 1,
  },
  {
    titre: 'Juste une part, merci !', categorie: 'sites', statut: 'en-ligne', annee: '2026',
    accroche: 'Le site d’une pâtisserie artisanale : pâtisserie française traditionnelle et cake design.',
    description: 'Une vitrine gourmande pour une pâtissière qui fait tout elle-même : la carte des pâtisseries classée par familles, un créateur de gâteau sur mesure pour les mariages et les anniversaires, son histoire et le contact. Les commandes se retirent à l’atelier.\n\nDerrière le site, un espace de gestion lui est réservé : commandes, produits, stock, recettes, catalogue du site et tableau de bord.',
    points: 'Carte des pâtisseries par familles\nCréateur de gâteau sur mesure\nPanier et retrait à l’atelier\nEspace de gestion : commandes, stock, recettes et catalogue\nDesign chaleureux, pensé pour le téléphone',
    plateforme: 'Site web', technologies: 'HTML, CSS, JavaScript, Firebase',
    lien: 'https://kmauger18.github.io/Juste-une-part-merci-/', libelleLien: 'Voir le site',
    image: IMG + 'jupm-cover.jpg', captures: [IMG + 'jupm-1.jpg', IMG + 'jupm-2.jpg', IMG + 'jupm-3.jpg'], visible: true, ordre: 2,
  },
  {
    titre: 'Mijote', categorie: 'applications', statut: 'beta', annee: '2026',
    accroche: 'Les repas de la semaine et une liste de courses déjà chiffrée, en une minute. 100 % gratuit.',
    description: 'Mijote compose les menus de la semaine selon le foyer, les repas à prévoir, le régime et le budget, puis prépare la liste de courses classée par rayon, avec le prix de chaque article dans le supermarché choisi.\n\nLes prix viennent de relevés réels en magasin, et une marge de sécurité réglable évite les mauvaises surprises en caisse. Plus de 1 100 recettes, une recherche par nom ou par ingrédient, et la possibilité de créer ses propres recettes.',
    points: 'Menus de la semaine composés selon le budget\nListe de courses chiffrée et classée par rayon\nPrix réels relevés en magasin (Open Prices)\n1 187 recettes, dont des petits-déjeuners et 372 végétariennes\nRecherche et création de recettes\nTout reste sur le téléphone, sans compte',
    plateforme: 'Android', technologies: 'HTML, CSS, JavaScript, Capacitor',
    lien: '', libelleLien: '',
    image: IMG + 'mijote-cover.jpg', captures: [IMG + 'mijote-1.jpg', IMG + 'mijote-2.jpg', IMG + 'mijote-3.jpg', IMG + 'mijote-4.jpg', IMG + 'mijote-5.jpg'], visible: true, ordre: 1,
  },
  {
    titre: 'PitWall', categorie: 'applications', statut: 'beta', annee: '2026',
    accroche: 'Un dashboard de télémétrie gratuit et entièrement personnalisable pour les jeux de course.',
    description: 'PitWall transforme un téléphone ou une tablette en écran de bord : régime moteur, rapport, chronos, delta, pneus, essence, ERS… L’appli se connecte à la console par son adresse IP et affiche la télémétrie du jeu en direct.\n\nL’éditeur est totalement libre : chaque widget se place, se redimensionne et se superpose au doigt, sans limite de nombre. On crée autant de dashboards qu’on veut, utilisables avec tous les jeux, et on les partage en fichier.',
    points: 'Gran Turismo 7 et Sport (PS5 et PS4), F1 23 à 25, Forza, DiRT Rally\n14 types de widgets et une centaine de données\nWidgets illimités, superposables et redimensionnables\nPlusieurs pages à faire défiler en course\nExport et import des dashboards en fichier\nDiagnostic qui explique ce qui bloque la connexion',
    plateforme: 'Android', technologies: 'Flutter, Dart',
    lien: 'https://studio-prism.com/telechargements/PitWall.apk', libelleLien: 'Télécharger l’APK',
    image: IMG + 'pitwall-cover.jpg', captures: [IMG + 'pitwall-1.jpg', IMG + 'pitwall-2.jpg', IMG + 'pitwall-3.jpg', IMG + 'pitwall-4.jpg', IMG + 'pitwall-5.jpg', IMG + 'pitwall-6.jpg'], visible: true, ordre: 2,
  },
  {
    titre: 'Clé de 12', categorie: 'applications', statut: 'prive', annee: '2026',
    accroche: 'L’appli d’un atelier mécanique : clients, véhicules, interventions et rappels d’entretien.',
    description: 'Née d’un simple classeur de suivi d’atelier, Clé de 12 rassemble tout le quotidien d’un garage dans le téléphone : fiches clients et véhicules, interventions à plusieurs prestations, tableau de bord du chiffre d’affaires et des pièces.\n\nL’appli calcule seule les prochains entretiens (vidange, révision, distribution, freins) d’après l’historique et le kilométrage, envoie des notifications et synchronise ses rendez-vous avec Google Agenda. Les données restent sur le téléphone, avec une sauvegarde complète en un fichier.',
    points: 'Clients, véhicules et interventions\nRecherche avancée et filtres combinables\nRappels d’entretien automatiques, au mois ou au kilomètre\nRendez-vous synchronisés avec Google Agenda\nNotifications sur le téléphone\nSauvegarde et restauration complètes',
    plateforme: 'Android', technologies: 'HTML, JavaScript, Android',
    lien: '', libelleLien: '',
    image: IMG + 'cle12-cover.jpg', captures: [IMG + 'cle12-1.jpg', IMG + 'cle12-2.jpg', IMG + 'cle12-3.jpg'], visible: true, ordre: 3,
  },
];

export const STATUTS_PROJET = { 'en-ligne': 'En ligne', beta: 'Bêta', dev: 'En développement', prive: 'Usage privé' };

const esc = t => String(t ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmt = t => esc(t).replace(/\*([^*\n]+)\*/g, '<em>$1</em>').replace(/\n/g, '<br>');
const para = t => String(t || '').split(/\n{2,}/).filter(p => p.trim()).map(p => `<p>${fmt(p)}</p>`).join('');
const lienSur = u => /^https?:\/\//i.test(u || '') ? u : '';
export const slug = t => String(t || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

let categories = [], realisations = [];
function preparer(cats, reals) {
  categories = cats.map(c => ({ ...c, slug: slug(c.titre) || c.id }));
  realisations = reals.map(r => ({ ...r, slug: slug(r.titre) || r.id }));
}
preparer(CATEGORIES_ORIGINE, REALISATIONS_ORIGINE);

export function lienProjet(r) { const c = categories.find(x => x.id === r.categorie); return c ? `projets/${c.slug}/${r.slug}/` : 'projets/'; }
const route = () => (typeof document !== 'undefined' && document.body.dataset.route) || '';
const deCategorie = c => realisations.filter(r => r.categorie === c.id);
const pluriel = n => n === 0 ? 'Bientôt' : `${n} projet${n > 1 ? 's' : ''}`;
const visuel = (src, alt, titre) => src ? `<img src="${esc(src)}" alt="${esc(alt)}" loading="lazy">` : `<div class="tile-type">${esc(titre)}</div>`;

function carteProjet(r) {
  return `<a class="project-card" href="${esc(lienProjet(r))}">
    <div class="tile">${visuel(r.image, r.titre, r.titre)}</div>
    <div class="card-meta"><span class="card-title">${esc(r.titre)}</span><span class="num">${esc(STATUTS_PROJET[r.statut] || '')}</span></div>
    ${r.accroche ? `<p class="desc">${fmt(r.accroche)}</p>` : ''}
    <span class="link">Découvrir le projet →</span>
  </a>`;
}

function rendreCategories() {
  const el = document.getElementById('liste-projets');
  if (!el) return;
  el.innerHTML = categories.map((c, i) => {
    const n = deCategorie(c).length;
    return `<a class="project-card" href="projets/${esc(c.slug)}/">
      <div class="tile">${visuel(c.image, c.titre, c.titre)}</div>
      <div class="card-meta"><span class="card-title">${esc(c.titre)}</span><span class="num">${String(i + 1).padStart(2, '0')} · ${pluriel(n)}</span></div>
      ${c.description ? `<p class="desc">${fmt(c.description)}</p>` : ''}
    </a>`;
  }).join('') || '<p class="soon">Les projets arrivent bientôt.</p>';
}

function rendreCategorie() {
  const m = route().match(/^projets\/([^/]+)$/), el = document.getElementById('page-categorie');
  if (!m || !el) return;
  const c = categories.find(x => x.slug === decodeURIComponent(m[1]));
  if (!c) { el.innerHTML = `<section class="wrap page-hero"><a class="back" href="projets/">← Projets numériques</a><h1 class="display">Catégorie<br><em>introuvable.</em></h1></section>`; return; }
  document.title = c.titre + ' — KMAUGER.';
  const liste = deCategorie(c);
  el.innerHTML = `
    <section class="wrap page-hero">
      <a class="back" href="projets/">← Projets numériques</a>
      <div class="eyebrow">Projets numériques</div>
      <h1 class="display">${esc(c.titre)}<em>.</em></h1>
      ${c.description ? `<p class="lead">${fmt(c.description)}</p>` : ''}
    </section>
    <section class="wrap content">
      ${liste.length ? `<div class="grid3 projects">${liste.map(carteProjet).join('')}</div>`
        : `<div class="soon-block"><p class="soon-title">Rien ici pour le moment.</p><p class="soon">Les premiers projets de cette catégorie sont en préparation. Suis leur avancée sur <a href="contact/">mes réseaux</a>.</p></div>`}
      ${categories.length > 1 ? `<div class="other-cats"><span class="eyebrow">Autres catégories</span>${categories.filter(x => x.id !== c.id).map(x => `<a href="projets/${esc(x.slug)}/">${esc(x.titre)} →</a>`).join('')}</div>` : ''}
    </section>`;
}

function rendreProjet() {
  const m = route().match(/^projets\/[^/]+\/([^/]+)$/), el = document.getElementById('page-projet');
  if (!m || !el) return;
  const r = realisations.find(x => x.slug === decodeURIComponent(m[1]));
  if (!r) { el.innerHTML = `<section class="wrap page-hero"><a class="back" href="projets/">← Projets numériques</a><h1 class="display">Projet<br><em>introuvable.</em></h1></section>`; return; }
  const c = categories.find(x => x.id === r.categorie);
  document.title = r.titre + ' — KMAUGER.';
  const lien = lienSur(r.lien);
  const captures = (r.captures || []).filter(Boolean);
  const points = String(r.points || '').split('\n').map(s => s.trim()).filter(Boolean);
  const infos = [['Catégorie', c?.titre], ['Plateforme', r.plateforme], ['Technologies', r.technologies], ['Année', r.annee], ['Statut', STATUTS_PROJET[r.statut]]].filter(([, v]) => v);
  const autres = c ? deCategorie(c).filter(x => x.slug !== r.slug) : [];
  el.innerHTML = `
    <section class="wrap project-page">
      <a class="back" href="${c ? `projets/${esc(c.slug)}/` : 'projets/'}">← ${esc(c?.titre || 'Projets numériques')}</a>
      <div class="project-head">
        <div>
          <div class="eyebrow">${esc([c?.titre, r.plateforme].filter(Boolean).join(' · '))}</div>
          <h1 class="book-title">${esc(r.titre)}</h1>
          ${STATUTS_PROJET[r.statut] ? `<span class="pill ${r.statut === 'en-ligne' ? 'disponible' : ''}">${STATUTS_PROJET[r.statut]}</span>` : ''}
          ${r.accroche ? `<p class="project-hook">${fmt(r.accroche)}</p>` : ''}
          ${lien ? `<a class="btn btn-solid" href="${esc(lien)}" target="_blank" rel="noopener">${esc(r.libelleLien || 'Voir le projet')} <span>↗</span></a>` : ''}
        </div>
      </div>
      ${r.image ? `<div class="project-hero"><img src="${esc(r.image)}" alt="${esc(r.titre)}"></div>` : ''}
      <div class="project-body">
        <div class="book-desc">${para(r.description)}</div>
        <aside>
          ${points.length ? `<div class="eyebrow">Points forts</div><ul class="points">${points.map(p => `<li>${fmt(p)}</li>`).join('')}</ul>` : ''}
          ${infos.length ? `<dl class="book-infos single">${infos.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>` : ''}
        </aside>
      </div>
      ${captures.length ? `<div class="eyebrow" style="margin-top:60px">En images</div>
        <div class="captures">${captures.map((src, i) => `<button type="button" class="capture" data-i="${i}"><img src="${esc(src)}" alt="Capture ${i + 1} de ${esc(r.titre)}" loading="lazy"></button>`).join('')}</div>` : ''}
    </section>
    ${autres.length ? `<section class="wrap content more-books"><div class="eyebrow">${esc(c.titre)}</div><h2 class="section-title">Autres projets</h2>
      <div class="grid3 projects" style="margin-top:30px">${autres.slice(0, 3).map(carteProjet).join('')}</div></section>` : ''}`;
  // Visionneuse des captures
  el.querySelectorAll('.capture').forEach(b => b.onclick = () => ouvrirCapture(captures, +b.dataset.i, r.titre));
}

let visionneuse;
function ouvrirCapture(liste, i, titre) {
  if (!visionneuse) {
    visionneuse = document.createElement('div');
    visionneuse.className = 'lightbox';
    visionneuse.innerHTML = '<button type="button" class="lb-close" aria-label="Fermer">✕</button><button type="button" class="lb-prev" aria-label="Précédente">‹</button><figure><img alt=""><figcaption></figcaption></figure><button type="button" class="lb-next" aria-label="Suivante">›</button>';
    document.body.appendChild(visionneuse);
    visionneuse.addEventListener('click', e => { if (e.target === visionneuse || e.target.classList.contains('lb-close')) fermer(); });
    document.addEventListener('keydown', e => { if (visionneuse.hidden) return; if (e.key === 'Escape') fermer(); if (e.key === 'ArrowLeft') visionneuse.prev(); if (e.key === 'ArrowRight') visionneuse.next(); });
  }
  const montrer = k => { i = (k + liste.length) % liste.length; visionneuse.querySelector('img').src = liste[i]; visionneuse.querySelector('figcaption').textContent = `${titre} · ${i + 1} / ${liste.length}`; };
  visionneuse.prev = () => montrer(i - 1); visionneuse.next = () => montrer(i + 1);
  visionneuse.querySelector('.lb-prev').onclick = visionneuse.prev; visionneuse.querySelector('.lb-next').onclick = visionneuse.next;
  visionneuse.hidden = false; document.body.classList.add('lb-open'); montrer(i);
  function fermer() { visionneuse.hidden = true; document.body.classList.remove('lb-open'); }
}

function toutRendre() { rendreCategories(); rendreCategorie(); rendreProjet(); }
export function definirProjets(cats, reals) { preparer(cats, reals); toutRendre(); window.dispatchEvent(new Event('km:donnees')); }
export const projetsCourants = () => ({ categories, realisations });
export { carteProjet, STATUTS_PROJET as STATUTS };
if (typeof document !== 'undefined') toutRendre();

// Livres : liste de la page Livres et fiche détaillée (#livre/<identifiant>).
// Les données d'origine sont ici ; cms.js les remplace par celles de la base
// dès que l'espace de gestion a été utilisé.

const IMG = 'assets/img/livres/';
export const LIVRES_ORIGINE = [
  {
    titre: 'L’encre du dernier jour', genre: 'Thriller psychologique', statut: 'disponible',
    accroche: 'Il existe des morts que personne n’a vu venir.',
    description: 'Il existe des morts que personne n’a vu venir.\nArthur souriait. Arthur écrivait. Arthur s’est tu.\n\nLe jour de ses funérailles, sous la pluie de Rennes, Aurore reçoit un livre et une lettre. Une seule phrase l’empêche de tourner la page : *ce que l’on cherche n’est pas caché dans ce que l’on lit, mais dans ce que l’on ne remarque pas.*\n\nAu lycée, les silences se fissurent. Un procès. Une salle de théâtre. Une cérémonie. Un compte sans nom qui publie chaque nuit à 3 h 12. Ceux qui ont blessé Arthur, et ceux qui ont choisi de ne rien dire, tombent un à un. À chaque fois, un lys blanc, la tige coupée en biais.\n\nIci, chaque mot laisse une trace.\nChaque silence a un prix.\nEt chaque page rapproche d’une vérité que personne ne voulait lire.',
    couverture: IMG + 'lencre-du-dernier-jour.jpg',
    pages: '455', format: 'Poche · 11 × 17 cm', dateParution: '29 octobre 2026', isbn: '979-8166225740', langue: 'Français', prix: '',
    lienAmazon: 'https://www.amazon.fr/dp/B0HPY7LDP6', lienCoolLibri: '', visible: true, ordre: 1,
  },
  {
    titre: 'De l’autre côté du sort', genre: 'Urban fantasy', statut: 'bientot',
    accroche: 'Elle maîtrise l’ombre. Il ne croit qu’à l’acier.',
    description: '*Elle maîtrise l’ombre. Il ne croit qu’à l’acier.*\n\nVespera est une sorcière de magie noire traquée par le Conseil. Julian est un chasseur sans magie, immunisé contre tous les sortilèges.\n\nLorsque leur affrontement révèle une trahison bien plus sombre, le chasseur et sa proie n’ont plus qu’un choix : s’allier ou périr.\n\n*Attention : ce grimoire est vivant.*',
    couverture: IMG + 'de-lautre-cote-du-sort.jpg',
    pages: '296', format: 'Poche · 11 × 17 cm', dateParution: '', isbn: '', langue: 'Français', prix: '',
    lienAmazon: '', lienCoolLibri: '', visible: true, ordre: 2,
  },
  {
    titre: 'Ce qu’on ne se dit pas encore', genre: 'Romance young adult', statut: 'bientot',
    accroche: 'Aux yeux de tout le lycée, Léo et Camille forment le couple parfait.',
    description: 'Aux yeux de tout le lycée, Léo et Camille forment le couple parfait.\n\nPourtant, derrière les sourires, chacun cache un secret qui bouleverse tout ce qu’il croyait savoir de lui-même.\n\nLéo tombe amoureux d’un garçon.\nCamille tombe amoureuse d’une fille.\n\nAvant d’affronter le regard des autres, ils devront trouver le courage de se dire la vérité — et de se choisir comme alliés.',
    couverture: IMG + 'ce-quon-ne-se-dit-pas-encore.jpg',
    pages: '', format: 'Poche · 11 × 17 cm', dateParution: '', isbn: '', langue: 'Français', prix: '',
    lienAmazon: '', lienCoolLibri: '', visible: true, ordre: 3,
  },
  {
    titre: 'Distribué, jamais lu', genre: 'Comédie romantique', statut: 'bientot',
    accroche: '30 jours. 3 règles. 0 photo.',
    description: '*02 h 14.* Chloé, fleuriste un brin gaffeuse, envoie un message à sa meilleure amie… au mauvais numéro. À l’autre bout, Mathis, pâtissier insomniaque, répond au lieu de bloquer.\n\nTrois règles : pas de prénoms, pas de photos, pas de rencontre avant trente jours.\n\nCe qu’ils ignorent ? Ils vivent dans le même immeuble, travaillent face à face… et chacun confie à l’autre son béguin pour l’autre.\n\nUne comédie romantique racontée entièrement en SMS, où un simple « Distribué » peut tout faire basculer.',
    couverture: IMG + 'distribue-jamais-lu.jpg',
    pages: '', format: 'Poche · 11 × 17 cm', dateParution: '', isbn: '', langue: 'Français', prix: '',
    lienAmazon: '', lienCoolLibri: '', visible: true, ordre: 4,
  },
  {
    titre: '08:14 Point de rupture', genre: 'Thriller', statut: 'bientot',
    accroche: 'Deux ennemis. Quatorze minutes.',
    description: '08:00. Le train quitte la gare.\n08:14. Tout explose.\nPuis le temps revient à zéro.\n\nSeuls deux passagers se souviennent.\nNolan veut sauver tout le monde.\nSora doit s’assurer que la bombe explose.\n\nDeux ennemis. Quatorze minutes.\nUne seule vérité, selon le filtre que vous choisissez.\n\n*Un filtre rouge, un filtre cyan : deux lectures.*',
    couverture: IMG + '08h14-point-de-rupture.jpg',
    pages: '', format: 'Poche · 11 × 17 cm', dateParution: '', isbn: '', langue: 'Français', prix: '',
    lienAmazon: '', lienCoolLibri: '', visible: true, ordre: 5,
  },
];

export const STATUTS_LIVRE = { disponible: 'Disponible', bientot: 'Bientôt', ecriture: 'En écriture' };

const esc = t => String(t ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmt = t => esc(t).replace(/\*([^*\n]+)\*/g, '<em>$1</em>').replace(/\n/g, '<br>');
const para = t => String(t || '').split(/\n{2,}/).filter(p => p.trim()).map(p => `<p>${fmt(p)}</p>`).join('');
const lienSur = u => /^https?:\/\//i.test(u || '') ? u : '';
export const slug = t => String(t || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

let livres = LIVRES_ORIGINE.map(l => ({ ...l, id: slug(l.titre) }));

function couverture(l, cls = '') {
  return l.couverture
    ? `<div class="cover ${cls}"><img src="${esc(l.couverture)}" alt="Couverture de ${esc(l.titre)}" loading="lazy"></div>`
    : `<div class="cover cover-type ${cls}"><span>${esc(l.titre)}</span><small>Kéliann Mauger</small></div>`;
}

function rendreListe() {
  const el = document.getElementById('liste-livres');
  if (!el) return;
  el.innerHTML = livres.length ? livres.map(l => `
    <a class="book" href="#livre/${esc(l.id)}">
      ${couverture(l)}
      <div class="book-body">
        ${STATUTS_LIVRE[l.statut] ? `<span class="pill ${esc(l.statut)}">${STATUTS_LIVRE[l.statut]}</span>` : ''}
        <h3>${esc(l.titre)}</h3>
        <p class="book-meta">${[l.genre, l.statut === 'disponible' ? l.dateParution : ''].filter(Boolean).map(esc).join(' · ')}</p>
        ${l.accroche ? `<p class="book-hook">${fmt(l.accroche)}</p>` : ''}
        <span class="link">Découvrir le livre →</span>
      </div>
    </a>`).join('') : '<p class="soon">Les livres arrivent bientôt.</p>';
}

function rendreFiche() {
  const m = location.hash.match(/^#livre\/(.+)$/);
  const el = document.getElementById('fiche-livre');
  if (!m || !el) return;
  const l = livres.find(x => x.id === decodeURIComponent(m[1]));
  if (!l) {
    el.innerHTML = `<section class="wrap page-hero"><a class="back" href="#livres">← Tous les livres</a><h1 class="display">Livre<br><em>introuvable.</em></h1></section>`;
    return;
  }
  document.title = l.titre + ' — KMAUGER.';
  const amazon = lienSur(l.lienAmazon), coollibri = lienSur(l.lienCoolLibri);
  const infos = [
    ['Auteur', 'Kéliann Mauger'], ['Genre', l.genre], ['Pages', l.pages], ['Format', l.format],
    ['Parution', l.dateParution], ['Langue', l.langue], ['ISBN', l.isbn], ['Prix', l.prix],
  ].filter(([, v]) => v);
  const autres = livres.filter(x => x.id !== l.id).slice(0, 4);
  el.innerHTML = `
    <section class="wrap book-page">
      <a class="back" href="#livres">← Tous les livres</a>
      <div class="book-detail">
        <div class="book-detail-cover">${couverture(l, 'big')}</div>
        <div class="book-detail-body">
          <div class="eyebrow">${esc(l.genre || 'Roman')}</div>
          <h1 class="book-title">${esc(l.titre)}</h1>
          <p class="book-author">Kéliann Mauger</p>
          ${STATUTS_LIVRE[l.statut] ? `<span class="pill ${esc(l.statut)}">${STATUTS_LIVRE[l.statut]}</span>` : ''}
          <div class="book-desc">${para(l.description || l.accroche)}</div>
          <div class="book-buy">
            ${amazon ? `<a class="btn btn-solid" href="${esc(amazon)}" target="_blank" rel="noopener">Acheter sur Amazon <span>↗</span></a>` : ''}
            ${coollibri ? `<a class="btn" href="${esc(coollibri)}" target="_blank" rel="noopener">Acheter sur CoolLibri <span>↗</span></a>` : ''}
            ${!amazon && !coollibri ? `<p class="soon-buy">${l.statut === 'ecriture' ? 'En cours d’écriture.' : 'Bientôt disponible.'} Suis l’actualité du livre sur <a href="#contact">mes réseaux</a>.</p>` : ''}
          </div>
          ${infos.length ? `<dl class="book-infos">${infos.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>` : ''}
        </div>
      </div>
    </section>
    ${autres.length ? `<section class="wrap content more-books"><div class="eyebrow">Du même auteur</div><h2 class="section-title">Les autres livres</h2>
      <div class="mini-books">${autres.map(x => `<a href="#livre/${esc(x.id)}">${couverture(x)}<span>${esc(x.titre)}</span></a>`).join('')}</div></section>` : ''}`;
}

export function definirLivres(liste) {
  livres = liste.map(l => ({ ...l, id: slug(l.titre) || l.id }));
  rendreListe();
  rendreFiche();
  window.dispatchEvent(new Event('km:donnees'));
}
export const livresCourants = () => livres;

window.addEventListener('hashchange', rendreFiche);
rendreListe();
rendreFiche();

// Livres : liste de la page Livres et fiche détaillée (adresse livres/<identifiant>/).
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
    lieu: "Rennes",
    themes: "Deuil, Silence, Secrets, Lycée, Culpabilité, Vérité",
    personnages: "Arthur — Il souriait. Il écrivait. Puis il s’est tu. Tout le roman tourne autour de ce qu’il a laissé derrière lui.\nAurore — L’amie des étés, la fille à la capuche. Silencieuse, d’un calme inquiétant, elle reçoit un livre et une lettre le jour des funérailles d’Arthur.\nLe compte sans nom — Chaque nuit, à 3 h 12, il publie. Personne ne sait qui se cache derrière.",
    indices: "Un lys blanc, la tige coupée en biais.\n3 h 12, chaque nuit.\nUn livre et une lettre, reçus sous la pluie.\nUne phrase qu’il ne faut pas oublier.\nUn procès, une salle de théâtre, une cérémonie.",
    citations: "Ce que l’on cherche n’est pas caché dans ce que l’on lit, mais dans ce que l’on ne remarque pas.\nIl existe des morts que personne n’a vu venir.\nIci, chaque mot laisse une trace.\nChaque silence a un prix.",
    extrait: "Il n’avait jamais autant plu à Rennes. Depuis une semaine entière, le ciel déversait sur la ville des torrents d’eau incessants, comme une plaie ouverte incapable de se refermer. Les gouttes, lourdes et glacées, s’écrasaient sur les pavés avec une insistance presque colérique, remplissant les rigoles d’un flot qui semblait vouloir emporter avec lui toute trace de vie. La pluie s’infiltrait partout : dans les ruelles étroites, sous les porches fatigués des vieilles bâtisses, jusque dans le cœur des habitants. Rien ne paraissait épargné. Rennes, habituellement animée malgré le mauvais temps, était méconnaissable. Les visages se cachaient sous des capuches détrempées, les parapluies malmenés se heurtaient dans une valse maladroite, et les rares passants pressaient le pas, courbant l’échine sous ce ciel oppressant.\n\nCe matin-là, pourtant, une gravité différente planait sur la ville. Au cœur de la vieille ville, l’église Saint-Germain semblait se dresser comme un témoin immuable de ces jours sombres. Ses lourdes portes en bois, ornées de ferronneries anciennes, étaient à peine entrouvertes, laissant passer un mince filet de visiteurs qui entraient en silence. À l’intérieur, la lumière des chandeliers tremblotait faiblement, se mêlant aux éclats colorés projetés par les vitraux que la pluie martelait sans relâche. L’atmosphère, saturée d’encens et d’humidité, enveloppait les lieux d’une aura presque suffocante. Tout semblait conspirer pour accentuer le poids du moment : les voûtes de pierre amplifiaient les moindres murmures, les dalles usées sous les pas craquaient à peine, comme si elles-mêmes redoutaient de troubler ce silence sacré.\n\nAu centre de la nef, un cercueil en bois clair reposait sur un piédestal recouvert d’un tissu sobre. Pas de couronne extravagante, pas de décorations ostentatoires, seulement un bouquet de lys blancs, à peine ouverts, posés délicatement sur le couvercle. Leur parfum discret se mêlait à celui de l’encens, créant un mélange lourd qui ajoutait à l’impression d’étouffement.",
    musique: "Ce livre intègre des morceaux musicaux pour accompagner certains passages. Les titres des musiques sont affichés dans un style spécifique pour indiquer quand les écouter.\n\n*Ne lance les musiques que lorsqu’elles sont mentionnées.*",
    playlist: "",
    coulisses: "*L’encre du dernier jour* est un thriller psychologique qui se déroule à Rennes, entre un lycée, un tribunal et une salle de théâtre.\n\nLe roman a été pensé comme une expérience : une histoire à lire, mais aussi à écouter, grâce à une playlist qui accompagne certains passages.\n\nIl est publié en format poche (11 × 17 cm), imprimé à la demande.",
    suite: "Une suite est en préparation.\nUne adaptation en bande dessinée est en cours.",
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
    <a class="book" href="livres/${esc(l.id)}/">
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

const lignes = t => String(t || '').split('\n').map(x => x.trim()).filter(Boolean);
const paire = l => { const i = l.search(/\s[—–-]\s|\s:\s/); return i > 0 ? [l.slice(0, i).trim(), l.slice(i).replace(/^\s[—–:-]\s/, '').trim()] : [l, '']; };
const tempsLecture = p => { const n = parseInt(p, 10); if (!n) return ''; const h = Math.round(n * 1.2 / 60); return h >= 1 ? `≈ ${h} h de lecture` : '< 1 h de lecture'; };
const section = (id, num, sur, titre, corps, cls = '') => `
  <section class="bk-sec ${cls}" id="${id}" aria-labelledby="${id}-t"><div class="wrap">
    <div class="bk-head"><span class="bk-num">${num}</span><div><div class="eyebrow">${esc(sur)}</div><h2 class="section-title" id="${id}-t">${titre}</h2></div></div>
    ${corps}
  </div></section>`;

function rendreFiche() {
  const m = (document.body.dataset.route || '').match(/^livres\/(.+)$/);
  const el = document.getElementById('fiche-livre');
  if (!m || !el) return;
  const l = livres.find(x => x.id === decodeURIComponent(m[1]));
  if (!l) {
    el.innerHTML = `<section class="wrap page-hero"><a class="back" href="livres/">← Tous les livres</a><h1 class="display">Livre<br><em>introuvable.</em></h1></section>`;
    return;
  }
  document.title = l.titre + ' — KMAUGER.';
  const amazon = lienSur(l.lienAmazon), coollibri = lienSur(l.lienCoolLibri);
  const dispo = amazon || coollibri;
  const statut = STATUTS_LIVRE[l.statut] || '';
  const lecture = tempsLecture(l.pages);
  const boutons = (cls = '') => `
    ${amazon ? `<a class="btn btn-solid ${cls}" href="${esc(amazon)}" target="_blank" rel="noopener">Acheter sur Amazon <span>↗</span></a>` : ''}
    ${coollibri ? `<a class="btn ${cls}" href="${esc(coollibri)}" target="_blank" rel="noopener">Acheter sur CoolLibri <span>↗</span></a>` : ''}`;
  const infos = [
    ['Auteur', 'Kéliann Mauger'], ['Genre', l.genre], ['Statut', statut], ['Pages', l.pages], ['Lecture', lecture], ['Format', l.format],
    ['Parution', l.dateParution], ['Langue', l.langue], ['Lieu de l’histoire', l.lieu], ['ISBN', l.isbn], ['Prix', l.prix],
  ].filter(([, v]) => v);
  const chiffres = [
    l.pages && [l.pages, 'pages'], lecture && [lecture.replace(' de lecture', ''), 'de lecture estimée'],
    l.format && [l.format.replace(/^Poche · /, ''), l.format.startsWith('Poche') ? 'format poche' : 'format'],
    l.dateParution && [l.dateParution.replace(/^\d+\s/, ''), 'parution'], l.lieu && [l.lieu, 'décor'],
  ].filter(Boolean).slice(0, 4);
  const persos = lignes(l.personnages).map(paire), indices = lignes(l.indices), citations = lignes(l.citations);
  const themes = String(l.themes || '').split(',').map(x => x.trim()).filter(Boolean);
  const playlist = lignes(l.playlist).map(paire);
  const autres = livres.filter(x => x.id !== l.id);

  let n = 0; const num = () => String(++n).padStart(2, '0');
  const blocs = [];
  blocs.push(['histoire', 'L’histoire', section('histoire', num(), 'Résumé', 'L’<em>histoire.</em>',
    `<div class="bk-story"><div class="bk-lettrine">${para(l.description || l.accroche)}</div>
      ${themes.length ? `<aside class="bk-themes"><h3>Thèmes</h3><ul class="chips">${themes.map(t => `<li>${esc(t)}</li>`).join('')}</ul>
        ${l.genre ? `<h3>Genre</h3><p>${esc(l.genre)}</p>` : ''}${l.lieu ? `<h3>Décor</h3><p>${esc(l.lieu)}</p>` : ''}</aside>` : ''}</div>`)]);
  if (persos.length) blocs.push(['personnages', 'Personnages', section('personnages', num(), 'Ils font l’histoire', 'Les <em>personnages.</em>',
    `<div class="bk-persos">${persos.map(([nom, d], i) => `<article class="bk-perso"><span class="bk-initiale" aria-hidden="true">${esc(nom.replace(/^(Le|La|Les|L’)\s*/i, '').charAt(0))}</span><h3>${esc(nom)}</h3>${d ? `<p>${fmt(d)}</p>` : ''}</article>`).join('')}</div>`, 'bk-alt')]);
  if (indices.length) blocs.push(['indices', 'Indices', section('indices', num(), 'Ce qu’il faut remarquer', 'Les <em>indices.</em>',
    `<p class="bk-intro">Sans rien dévoiler : quelques détails à garder en tête en tournant les pages.</p>
     <ol class="bk-indices">${indices.map(x => `<li>${fmt(x)}</li>`).join('')}</ol>`, 'bk-sombre')]);
  if (l.extrait) blocs.push(['extrait', 'Extrait', section('extrait', num(), 'Feuilleter', 'Lire un <em>extrait.</em>',
    `<div class="bk-page-livre"><div class="bk-page-num">I</div>${para(l.extrait)}<p class="bk-suite">La suite dans le livre…</p></div>
     ${dispo ? `<div class="bk-cta-mini">${boutons()}</div>` : ''}`)]);
  if (citations.length) blocs.push(['citations', 'Citations', section('citations', num(), 'Extraits du livre', 'Quelques <em>phrases.</em>',
    `<div class="bk-citations">${citations.map(c => `<blockquote><p>${fmt(c)}</p><cite>${esc(l.titre)}</cite></blockquote>`).join('')}</div>`, 'bk-alt')]);
  if (l.musique || playlist.length) blocs.push(['musique', 'Musique', section('musique', num(), 'À lire, à écouter', 'Un roman <em>en musique.</em>',
    `<div class="bk-musique"><div>${para(l.musique)}</div>
      ${playlist.length ? `<ol class="bk-playlist">${playlist.map(([t, a]) => `<li><span class="bk-titre-musique">${esc(t)}</span>${a ? `<small>${esc(a)}</small>` : ''}</li>`).join('')}</ol>`
        : `<div class="bk-exemple-musique"><small>Dans le livre, un titre s’affiche ainsi :</small><span class="bk-titre-musique">Un homme debout</span><small>C’est le signal : lance le morceau.</small></div>`}</div>`)]);
  if (l.coulisses || l.suite) blocs.push(['coulisses', 'Coulisses', section('coulisses', num(), 'De l’idée au livre', 'Les <em>coulisses.</em>',
    `<div class="bk-coulisses">${l.coulisses ? `<div>${para(l.coulisses)}</div>` : ''}
      ${l.suite ? `<aside class="bk-apres"><h3>Et après ?</h3><ul>${lignes(l.suite).map(x => `<li>${fmt(x)}</li>`).join('')}</ul><a class="lien-fleche" href="contact/">Suivre l’actualité →</a></aside>` : ''}</div>`, 'bk-alt')]);
  blocs.push(['fiche', 'Fiche technique', section('fiche', num(), 'En détail', 'Fiche <em>technique.</em>',
    `<div class="bk-fiche"><dl class="book-infos">${infos.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
      <div class="bk-achat"><h3>${dispo ? 'Où le trouver ?' : 'Bientôt en librairie'}</h3>
        ${dispo ? `<p>Disponible en ${esc((l.format || 'broché').toLowerCase())}${l.prix ? `, ${esc(l.prix)}` : ''}.</p><div class="book-buy">${boutons()}</div>`
          : `<p>${l.statut === 'ecriture' ? 'Le livre est en cours d’écriture.' : 'Le livre arrive bientôt.'} Pour être prévenu de sa sortie, suis-moi sur Instagram.</p><a class="btn" href="contact/">Me suivre <span>↗</span></a>`}
        <p class="bk-dedicace">Une dédicace, une rencontre, une question sur le livre ? <a href="contact/">Écris-moi.</a></p></div></div>`)]);
  const faq = [
    dispo && ['Où acheter le livre ?', `Il est disponible ${[amazon && 'sur Amazon', coollibri && 'sur CoolLibri'].filter(Boolean).join(' et ')}, en ${esc((l.format || 'version papier').toLowerCase())}.`],
    l.pages && ['Combien de temps pour le lire ?', `${esc(l.pages)} pages, soit environ ${lecture.replace('≈ ', '').replace(' de lecture', '')} de lecture à un rythme tranquille.`],
    (l.musique || playlist.length) && ['Faut-il écouter les musiques ?', 'Ce n’est pas obligatoire, mais c’est recommandé : les morceaux ont été choisis pour accompagner certains passages. Lance-les seulement quand leur titre apparaît.'],
    l.suite && ['Y aura-t-il une suite ?', fmt(lignes(l.suite)[0])],
    ['Peut-on avoir une dédicace ?', 'Oui, avec plaisir. Passe par la <a href="contact/">page Contact</a> pour en parler.'],
  ].filter(Boolean);
  blocs.push(['faq', 'Questions', section('faq', num(), 'Questions fréquentes', 'Bon à <em>savoir.</em>',
    `<div class="bk-faq">${faq.map(([q, r]) => `<details><summary>${q}</summary><p>${r}</p></details>`).join('')}</div>`, 'bk-alt')]);

  el.innerHTML = `
    <div class="bk-progression" aria-hidden="true"><span></span></div>
    <section class="wrap book-page">
      <a class="back" href="livres/">← Tous les livres</a>
      <div class="book-detail">
        <div class="book-detail-cover">${couverture(l, 'big')}</div>
        <div class="book-detail-body">
          <div class="eyebrow">${esc(l.genre || 'Roman')}</div>
          <h1 class="book-title">${esc(l.titre)}</h1>
          <p class="book-author">Kéliann Mauger</p>
          ${statut ? `<span class="pill ${esc(l.statut)}">${statut}</span>` : ''}
          ${l.accroche ? `<p class="bk-accroche">${fmt(l.accroche)}</p>` : ''}
          ${chiffres.length ? `<ul class="bk-chiffres">${chiffres.map(([v, k]) => `<li><b>${esc(v)}</b><span>${esc(k)}</span></li>`).join('')}</ul>` : ''}
          <div class="book-buy">${dispo ? boutons() : `<p class="soon-buy">${l.statut === 'ecriture' ? 'En cours d’écriture.' : 'Bientôt disponible.'} Suis l’actualité du livre sur <a href="contact/">mes réseaux</a>.</p>`}
            <button type="button" class="btn bk-partager">Partager <span>↗</span></button></div>
          <div class="bk-sommaire" role="navigation" aria-label="Sur cette page">${blocs.map(([id, t]) => `<a href="${location.pathname}#${id}" data-cible="${id}">${t}</a>`).join('')}</div>
        </div>
      </div>
    </section>
    ${blocs.map(b => b[2]).join('')}
    ${autres.length ? `<section class="wrap content more-books"><div class="eyebrow">Du même auteur</div><h2 class="section-title">Les autres livres</h2>
      <div class="mini-books">${autres.map(x => `<a href="livres/${esc(x.id)}/">${couverture(x)}<span>${esc(x.titre)}</span><small>${esc(STATUTS_LIVRE[x.statut] || '')}</small></a>`).join('')}</div></section>` : ''}
    ${dispo ? `<div class="bk-barre" hidden><div class="wrap"><div class="bk-barre-titre">${l.couverture ? `<img src="${esc(l.couverture)}" alt="">` : ''}<span><b>${esc(l.titre)}</b><small>Kéliann Mauger</small></span></div><div class="bk-barre-btn">${boutons('btn-petit')}</div></div></div>` : ''}`;
  activerFiche(el, l);
}

let ficheEcoute = null;
function activerFiche(el, l) {
  el.querySelectorAll('.bk-sommaire a').forEach(a => a.addEventListener('click', e => {
    e.preventDefault(); document.getElementById(a.dataset.cible)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }));
  el.querySelector('.bk-partager')?.addEventListener('click', async e => {
    const b = e.currentTarget, donnees = { title: l.titre + ' — Kéliann Mauger', text: l.accroche || '', url: location.href };
    try { if (navigator.share) await navigator.share(donnees); else { await navigator.clipboard.writeText(location.href); b.firstChild.textContent = 'Lien copié '; } } catch (err) {}
  });
  const barre = el.querySelector('.bk-barre'), prog = el.querySelector('.bk-progression span'), hero = el.querySelector('.book-buy');
  if (ficheEcoute) window.removeEventListener('scroll', ficheEcoute);
  ficheEcoute = () => {
    const h = document.documentElement, max = h.scrollHeight - h.clientHeight;
    if (prog) prog.style.transform = `scaleX(${max > 0 ? Math.min(1, h.scrollTop / max) : 0})`;
    if (barre && hero) barre.hidden = hero.getBoundingClientRect().bottom > 0;
  };
  window.addEventListener('scroll', ficheEcoute, { passive: true });
  ficheEcoute();
}

export function definirLivres(liste) {
  livres = liste.map(l => ({ ...l, id: slug(l.titre) || l.id }));
  rendreListe();
  rendreFiche();
  window.dispatchEvent(new Event('km:donnees'));
}
export const livresCourants = () => livres;

if (typeof document !== 'undefined') { rendreListe(); rendreFiche(); }

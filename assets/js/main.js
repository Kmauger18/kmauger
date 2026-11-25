// Navigation entre les sections, menu mobile, galerie photo (filtres + visionneuse)
const pages = [...document.querySelectorAll('.page')];
const links = [...document.querySelectorAll('nav a')];
const nav = document.getElementById('nav');
const menu = document.getElementById('menu');

function showPage() {
  let id = location.hash.slice(1) || 'accueil';
  if (id.startsWith('livre/')) id = 'livre';
  if (!document.getElementById(id)?.classList.contains('page')) id = 'accueil';
  pages.forEach(p => p.classList.toggle('active', p.id === id));
  const rubrique = id === 'livre' ? 'livres' : id;
  links.forEach(a => a.classList.toggle('active', a.hash === '#' + rubrique));
  if (id === 'livre') { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); window.scrollTo({ top: 0, behavior: 'instant' }); return; }
  nav.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
  window.scrollTo({ top: 0, behavior: 'instant' });
  document.title = id === 'accueil' ? 'KMAUGER. — A universe of creativity' : links.find(a => a.hash === '#' + id)?.textContent + ' — KMAUGER.';
}
window.addEventListener('hashchange', showPage);
menu.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
});
document.getElementById('year').textContent = new Date().getFullYear();
showPage();

// ---------------------------------------------------------------- Galerie
const galerie = document.getElementById('galerie-photos');
const filtres = document.getElementById('filtres-photos');
const lb = document.getElementById('lightbox');
let filtre = 'tout', courant = -1;

const visibles = () => [...galerie.querySelectorAll('.shot')].filter(f => !f.hidden);

function appliquerFiltre() {
  galerie.querySelectorAll('.shot').forEach(f => { f.hidden = filtre !== 'tout' && f.dataset.c !== filtre; });
  filtres.querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.f === filtre));
}

// Appelé par cms.js après chaque remplissage de la galerie
function initGalerie(categories = null) {
  if (categories && Object.keys(categories).length > 1) {
    const presentes = new Set([...galerie.querySelectorAll('.shot')].map(f => f.dataset.c));
    const liste = Object.entries(categories).filter(([k]) => presentes.has(k));
    filtres.innerHTML = liste.length > 1
      ? [['tout', 'Tout'], ...liste].map(([k, v]) => `<button type="button" data-f="${k}">${v}</button>`).join('')
      : '';
    filtres.hidden = liste.length <= 1;
    if (!presentes.has(filtre)) filtre = 'tout';
  }
  appliquerFiltre();
}
filtres.addEventListener('click', e => {
  const b = e.target.closest('button[data-f]');
  if (b) { filtre = b.dataset.f; appliquerFiltre(); }
});

async function ouvrir(i) {
  const l = visibles();
  if (!l.length) return;
  courant = (i + l.length) % l.length;
  const fig = l[courant], img = fig.querySelector('img');
  const cible = lb.querySelector('img');
  cible.src = img.src;
  cible.alt = img.alt;
  lb.querySelector('figcaption').textContent = fig.querySelector('figcaption')?.textContent.trim() || '';
  lb.hidden = false;
  document.body.classList.add('lb-open');
  // Grande version chargée depuis la base si elle existe
  if (img.dataset.hd && window.KM_hd) {
    const attendu = courant;
    try { const hd = await window.KM_hd(img.dataset.hd); if (hd && attendu === courant) cible.src = hd; } catch (e) {}
  }
}
function fermer() { lb.hidden = true; document.body.classList.remove('lb-open'); }
galerie.addEventListener('click', e => {
  const fig = e.target.closest('.shot');
  if (fig) ouvrir(visibles().indexOf(fig));
});
lb.querySelector('.lb-close').onclick = fermer;
lb.querySelector('.lb-prev').onclick = () => ouvrir(courant - 1);
lb.querySelector('.lb-next').onclick = () => ouvrir(courant + 1);
lb.addEventListener('click', e => { if (e.target === lb) fermer(); });
document.addEventListener('keydown', e => {
  if (lb.hidden) return;
  if (e.key === 'Escape') fermer();
  if (e.key === 'ArrowLeft') ouvrir(courant - 1);
  if (e.key === 'ArrowRight') ouvrir(courant + 1);
});

window.KM = { initGalerie };
initGalerie();

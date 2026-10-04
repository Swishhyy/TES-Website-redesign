const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

function setMenu(open) {
  toggle?.setAttribute('aria-expanded', String(open));
  nav?.classList.toggle('is-open', open);
}

toggle?.addEventListener('click', () => {
  setMenu(toggle.getAttribute('aria-expanded') !== 'true');
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    toggle.focus();
  }
});

nav?.addEventListener('click', event => {
  if (event.target.closest('a')) setMenu(false);
});

document.addEventListener('click', event => {
  if (!event.target.closest('.header-inner')) setMenu(false);
});

window.matchMedia('(min-width: 1101px)').addEventListener('change', event => {
  if (event.matches) setMenu(false);
});

document.querySelector('.print-button')?.addEventListener('click', () => window.print());

const readingTracker = document.querySelector('[data-reading-tracker]');
function showReadingSnapshot() {
  if (!readingTracker || readingTracker.dataset.snapshotShown) return;
  readingTracker.dataset.snapshotShown = 'true';
  readingTracker.src = readingTracker.dataset.fallback;
  readingTracker.alt = readingTracker.dataset.fallbackAlt;
  const status = document.querySelector('[data-reading-status]');
  if (status) status.hidden = false;
}
readingTracker?.addEventListener('error', showReadingSnapshot, { once: true });
if (readingTracker?.complete && readingTracker.naturalWidth === 0) showReadingSnapshot();

(() => {
'use strict';
document.body.classList.add('js-ready');
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.primary-navigation');
function closeMenu(returnFocus = false) {
  menuToggle.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
  if (returnFocus) menuToggle.focus();
}
menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-open', open);
});
navigation.addEventListener('click', event => {if (event.target.closest('a')) closeMenu();});
document.addEventListener('keydown', event => {if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') closeMenu(true);});
document.addEventListener('click', event => {if (!event.target.closest('.site-header')) closeMenu();});
matchMedia('(min-width: 761px)').addEventListener('change', event => {if(event.matches) closeMenu();});
const header = document.querySelector('.site-header');
function updateHeader() {header.classList.toggle('scrolled', scrollY > 20);}
addEventListener('scroll', updateHeader, {passive:true});
updateHeader();

const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
const flowButtons = [...document.querySelectorAll('.flow-button')];
const detailContainer = document.querySelector('.career-details');
const mobileFlow = matchMedia('(max-width: 760px)');
function setCareerDetail(button, expanded) {
  const panel = document.getElementById(button.getAttribute('aria-controls'));
  button.setAttribute('aria-expanded', String(expanded));
  panel.hidden = !expanded;
  const action = button.querySelector('.flow-action');
  action.replaceChildren(document.createTextNode(expanded ? '閉じる ' : '詳しく見る '));
  const mark = document.createElement('span');
  mark.setAttribute('aria-hidden', 'true');
  mark.textContent = expanded ? '−' : '＋';
  action.append(mark);
}
for (const button of flowButtons) {
  const panel = document.getElementById(button.getAttribute('aria-controls'));
  setCareerDetail(button, false);
  const closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.className = 'career-detail-close';
  closeButton.textContent = '閉じる −';
  closeButton.setAttribute('aria-label', button.querySelector('.flow-title').textContent + 'の説明を閉じる');
  closeButton.addEventListener('click', () => {
    setCareerDetail(button, false);
    button.focus({preventScroll: true});
    button.scrollIntoView({behavior: 'auto', block: 'nearest'});
  });
  panel.append(closeButton);
  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') !== 'true';
    flowButtons.forEach(item => setCareerDetail(item, item === button && expanded));
    if (expanded && !mobileFlow.matches) {
      panel.scrollIntoView({behavior: motionPreference.matches ? 'auto' : 'smooth', block: 'nearest'});
    }
  });
}
function arrangeCareerDetails() {
  // Keep mobile explanations directly beside the illustrated step that opens them.
  for (const button of flowButtons) {
    const panel = document.getElementById(button.getAttribute('aria-controls'));
    (mobileFlow.matches ? button.parentElement : detailContainer).append(panel);
  }
}
arrangeCareerDetails();
mobileFlow.addEventListener('change', arrangeCareerDetails);
const opening = document.querySelector('.opening');
if (!motionPreference.matches && !location.hash) {
  opening.classList.add('is-playing');
  const finishOpening = () => opening.remove();
  opening.addEventListener('animationend', event => {if (event.animationName === 'opening-out') finishOpening();});
  setTimeout(finishOpening, 3800);
  document.addEventListener('keydown', finishOpening, {once:true});
}
if ('IntersectionObserver' in window && !motionPreference.matches) {
  document.body.classList.add('motion-ready');
  const artObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      // Observe the stationary frame so off-screen botanical artwork can slide into view.
      const artwork = entry.target.classList.contains('ornament-slot') ? entry.target.querySelector('.botanical-art') : entry.target;
      artwork.classList.add('is-visible');
      artObserver.unobserve(entry.target);
    }
  }, {threshold:.1, rootMargin:'0px 0px -25px 0px'});
  document.querySelectorAll('.reveal:not(.botanical-art), .ornament-slot').forEach(element => artObserver.observe(element));
  motionPreference.addEventListener('change', event => {
    if (!event.matches) return;
    document.body.classList.remove('motion-ready');
    opening.remove();
    artObserver.disconnect();
  });
}
if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      navigation.querySelectorAll('a').forEach(link => {
        if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
    }
  }, {rootMargin:'-20% 0px -60% 0px'});
  document.querySelectorAll('main > section').forEach(section => sectionObserver.observe(section));
}

const config = window.AOI_INKO_CONFIG || {};
const contactButton = document.querySelector('#contact-button');
const contactStatus = document.querySelector('#contact-status');
const contactDialog = document.querySelector('#contact-dialog');
let validContact = false;
try {
  const contactUrl = new URL(config.contactUrl);
  validContact = (contactUrl.protocol === 'https:' && !!contactUrl.hostname) || (contactUrl.protocol === 'mailto:' && /.+@.+\..+/.test(contactUrl.pathname));
  if (validContact) contactButton.href = contactUrl.href;
} catch { /* A missing contact address leaves the preparation notice active. */ }
if (validContact) contactStatus.hidden = true;
else {
  contactButton.setAttribute('aria-haspopup', 'dialog');
  contactButton.addEventListener('click', event => {
    if (typeof contactDialog.showModal !== 'function') return;
    event.preventDefault();
    contactDialog.showModal();
  });
  contactDialog.addEventListener('click', event => {
    if (event.target !== contactDialog) return;
    const bounds = contactDialog.getBoundingClientRect();
    if(event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) contactDialog.close();
  });
}

const gallery = document.querySelector('#publication-gallery');
for (const publication of Array.isArray(config.publications) ? config.publications : []) {
  if (!publication || !publication.image || !publication.alt || !publication.title) continue;
  let imageUrl;
  try {imageUrl = new URL(publication.image, location.href);} catch {continue;}
  if (!['http:', 'https:', 'file:'].includes(imageUrl.protocol)) continue;
  const figure = document.createElement('figure');
  figure.className = 'gallery-entry';
  const img = document.createElement('img');
  img.src = imageUrl.href;
  img.alt = String(publication.alt);
  img.loading = 'lazy';
  img.decoding = 'async';
  const caption = document.createElement('figcaption');
  const title = document.createElement('h3');
  title.textContent = String(publication.title);
  caption.append(title);
  if(publication.caption) {const p=document.createElement('p');p.textContent=String(publication.caption);caption.append(p);}
  if(publication.haiku) {const poem=document.createElement('blockquote');poem.className='haiku'+(publication.vertical?' is-vertical':'');poem.textContent=String(publication.haiku);caption.append(poem);}
  figure.append(img,caption);
  gallery.append(figure);
}
gallery.hidden = gallery.childElementCount === 0;
})();

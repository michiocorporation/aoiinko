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
const scene = document.querySelector('.season-scene');
const motionToggle = document.querySelector('.motion-toggle');
const chapters = [...document.querySelectorAll('main > section')];
const ornaments = [...document.querySelectorAll('.ornament-slot')];
const hero = document.querySelector('#hero');
const heroVisual = document.querySelector('.hero-visual');
const flightPassages = [...document.querySelectorAll('[data-flight]')];
const writtenBlocks = [];
const pendingIntroText = new Set();
let textObserver;
let introColorReady = false;
const visibleFlights = new Set();
let activeFlight = null;
let motionInitialized = false;
let heroRunway = 0;
let heroStickyTop = 0;
let effectsPaused = false;
try { effectsPaused = sessionStorage.getItem('aoi-inko-motion-paused') === 'true'; } catch { /* Optional preference storage. */ }
let storyFrame = 0;
const clamp = value => Math.max(0, Math.min(1, value));
const smooth = value => { const t = clamp(value); return t * t * (3 - 2 * t); };
const mixColor = (from, to, amount) => from.map((channel, index) => Math.round(channel + (to[index] - channel) * amount));
function afterInitialLayout(callback) {
  // Wait for reload/hash scroll restoration before arming one-shot reveals.
  const ready = () => requestAnimationFrame(() => requestAnimationFrame(callback));
  if (document.readyState === 'complete') ready();
  else addEventListener('load', ready, {once: true});
}
function measureHero() {
  const height = heroVisual.offsetHeight;
  heroRunway = Math.round(innerHeight * 1.2);
  heroStickyTop = Math.min(header.offsetHeight, innerHeight - height);
  hero.style.setProperty('--hero-height', `${height}px`);
  hero.style.setProperty('--hero-runway', `${heroRunway}px`);
  hero.style.setProperty('--hero-sticky-top', `${heroStickyTop}px`);
  scheduleStory();
}
function renderStory() {
  storyFrame = 0;
  if (effectsPaused || motionPreference.matches) return;
  const viewport = innerHeight;
  // Read geometry first. Accordion changes and font loading can change chapter heights.
  const geometry = chapters.map(chapter => {
    const rect = chapter.getBoundingClientRect();
    return {top: rect.top + scrollY, height: rect.height};
  });
  const ornamentRects = ornaments.map(ornament => ornament.getBoundingClientRect());
  const introStart = geometry[0].top - heroStickyTop;
  const introProgress = clamp((scrollY - introStart) / Math.max(1, heroRunway));
  const introEnd = introStart + heroRunway;
  const green = [218,239,199];
  const stops = [introEnd, geometry[2].top + geometry[2].height * .25, geometry[3].top + viewport * .12, geometry[4].top];
  const colors = [green, green, [224,241,245], [255,242,213]];
  let color;
  let landscapeOpacity;
  if (scrollY <= introEnd) {
    // Push into the first view, hold pure white, then finish the green wash
    // before the next chapter's writing is allowed to appear.
    const whiten = smooth((introProgress - .14) / .34);
    const greenWash = smooth((introProgress - .60) / .36);
    const white = [255,255,255];
    color = introProgress < .60 ? mixColor([255,253,240], white, whiten) : mixColor(white, green, greenWash);
    landscapeOpacity = introProgress < .60 ? 1 - whiten : greenWash;
  } else {
    let index = 0;
    while (index < stops.length - 1 && scrollY > stops[index + 1]) index++;
    const next = Math.min(index + 1, stops.length - 1);
    const blend = next === index ? 0 : smooth((scrollY - stops[index]) / Math.max(1, stops[next] - stops[index]));
    color = mixColor(colors[index], colors[next], blend);
    landscapeOpacity = 1;
  }
  const journey = clamp((scrollY - introEnd) / Math.max(1, geometry.at(-1).top - introEnd));
  const focusWithinHero = hero.contains(document.activeElement) && document.activeElement.matches(':focus-visible');
  if (document.body.classList.contains('cinematic-ready')) {
    heroVisual.style.transform = focusWithinHero ? 'none' : `scale(${(1 + smooth(introProgress / .48) * 1.8).toFixed(4)})`;
    heroVisual.style.opacity = focusWithinHero ? '1' : String(1 - smooth((introProgress - .18) / .30));
    hero.classList.toggle('hero-passed', introProgress >= .48 && !focusWithinHero);
  }
  scene.style.backgroundColor = `rgb(${color.join(',')})`;
  scene.style.setProperty('--landscape-opacity', landscapeOpacity.toFixed(3));
  scene.style.setProperty('--sun-x', `${(journey * -180).toFixed(1)}px`);
  scene.style.setProperty('--sun-y', `${(journey * 120).toFixed(1)}px`);
  scene.style.setProperty('--far-y', `${(journey * -55).toFixed(1)}px`);
  scene.style.setProperty('--near-y', `${(journey * -120).toFixed(1)}px`);
  scene.style.setProperty('--land-hue', `${(98 + journey * 68).toFixed(1)}`);
  introColorReady = introProgress >= .96;
  document.body.classList.toggle('intro-color-ready', introColorReady);
  if (introColorReady) {
    pendingIntroText.forEach(block => {
      block.classList.add('is-written');
      textObserver?.unobserve(block);
    });
    pendingIntroText.clear();
  }
  ornaments.forEach((ornament, index) => {
    const rect = ornamentRects[index];
    const progress = clamp((viewport - rect.top) / (viewport + rect.height));
    const distance = innerWidth <= 760 ? 12 : 36;
    ornament.style.setProperty('--parallax-y', `${((.5 - progress) * distance).toFixed(1)}px`);
  });
}
function scheduleStory() {
  if (!storyFrame && !effectsPaused && !motionPreference.matches) storyFrame = requestAnimationFrame(renderStory);
}
function updateMotionState() {
  const stopped = effectsPaused || motionPreference.matches;
  // Keep the current chapter in place when removing the cinematic scroll space.
  const anchor = motionInitialized && chapters.slice(1).find(chapter => {
    const rect = chapter.getBoundingClientRect();
    return rect.top < innerHeight && rect.bottom > header.offsetHeight;
  });
  const anchorTop = anchor && anchor.getBoundingClientRect().top;
  document.body.classList.toggle('effects-paused', stopped);
  motionToggle.hidden = motionPreference.matches;
  motionToggle.setAttribute('aria-pressed', String(effectsPaused));
  motionToggle.querySelector('.motion-toggle-label').textContent = effectsPaused ? '演出を再生する' : '演出を止める';
  motionToggle.querySelector('.motion-toggle-icon').textContent = effectsPaused ? '▷' : 'Ⅱ';
  if (stopped) {
    cancelAnimationFrame(storyFrame);
    storyFrame = 0;
    scene.removeAttribute('style');
    heroVisual.removeAttribute('style');
    hero.classList.remove('hero-passed');
    introColorReady = true;
    document.body.classList.add('intro-color-ready');
    pendingIntroText.clear();
    ornaments.forEach(ornament => ornament.style.removeProperty('--parallax-y'));
    if (activeFlight) activeFlight.cancel();
    writtenBlocks.forEach(block => block.classList.add('is-written', 'is-settled'));
  } else {
    measureHero();
    scheduleStory();
  }
  if (anchor) {
    scrollBy({top: anchor.getBoundingClientRect().top - anchorTop, behavior: 'instant'});
  }
  motionInitialized = true;
}
document.body.classList.add('scene-ready');
if ('IntersectionObserver' in window) document.body.classList.add('cinematic-ready');
motionToggle.addEventListener('click', () => {
  effectsPaused = !effectsPaused;
  try { sessionStorage.setItem('aoi-inko-motion-paused', String(effectsPaused)); } catch { /* Storage is optional. */ }
  updateMotionState();
});
motionPreference.addEventListener('change', updateMotionState);
addEventListener('scroll', scheduleStory, {passive: true});
addEventListener('resize', measureHero, {passive: true});
hero.addEventListener('focusin', scheduleStory);
hero.addEventListener('focusout', scheduleStory);
if ('ResizeObserver' in window) {
  new ResizeObserver(scheduleStory).observe(document.querySelector('main'));
  new ResizeObserver(measureHero).observe(heroVisual);
}
measureHero();
updateMotionState();

// Two one-shot flights run on a clock after reaching their chapter boundary.
// The animation keeps moving even if the reader stops scrolling.
function playNextFlight() {
  if (activeFlight || effectsPaused || motionPreference.matches || document.hidden) return;
  const passage = flightPassages.find(item => visibleFlights.has(item) && !item.dataset.flightState);
  if (!passage) return;
  const bird = passage.querySelector('.flight-bird');
  if (!bird.animate) return;
  passage.dataset.flightState = 'playing';
  const size = bird.offsetWidth;
  const reverse = passage.dataset.flight === 'return';
  const startX = reverse ? innerWidth + size : -size;
  const endX = reverse ? -size : innerWidth + size;
  const startY = Math.max(header.offsetHeight + 10, innerHeight * .13);
  const endY = Math.max(startY + 65, innerHeight * .7 - size * .35);
  const frames = [0, .1, .48, .88, 1].map(progress => ({
    transform: `translate3d(${startX + (endX - startX) * progress}px, ${startY + (endY - startY) * progress}px, 0) rotate(${reverse ? -4 : 16}deg)`,
    opacity: progress === 0 || progress === 1 ? 0 : 1,
    offset: progress
  }));
  const animation = bird.animate(frames, {duration: reverse ? 2400 : 2200, easing: 'cubic-bezier(.42, 0, 1, 1)', fill: 'none'});
  activeFlight = animation;
  animation.finished.catch(() => {}).then(() => {
    passage.dataset.flightState = 'done';
    if (activeFlight === animation) activeFlight = null;
    playNextFlight();
  });
}
if ('IntersectionObserver' in window) {
  const flightObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => entry.isIntersecting ? visibleFlights.add(entry.target) : visibleFlights.delete(entry.target));
    playNextFlight();
  }, {rootMargin: '-15% 0px -30% 0px', threshold: 0});
  afterInitialLayout(() => flightPassages.forEach(passage => flightObserver.observe(passage)));
}
document.addEventListener('visibilitychange', () => { if (document.hidden && activeFlight) activeFlight.cancel(); });

// Keep an unsplit accessible reading copy, and preserve inline Japanese line breaking.
if ('IntersectionObserver' in window) {
  textObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) { pendingIntroText.delete(entry.target); continue; }
      if (!introColorReady && entry.target.closest('#profile') && !effectsPaused && !motionPreference.matches) {
        pendingIntroText.add(entry.target);
        continue;
      }
      entry.target.classList.add('is-written');
      textObserver.unobserve(entry.target);
    }
  }, {threshold: 0, rootMargin: '0px 0px -12% 0px'});
  document.querySelectorAll('#profile h2, #profile .prose > p, #career h2, .career-intro, #works h2, #works .prose > p, #contact h2').forEach(block => {
    const readingCopy = document.createElement('span');
    readingCopy.className = 'reading-copy';
    const copy = block.cloneNode(true);
    copy.querySelectorAll('br').forEach(br => br.replaceWith('\n'));
    readingCopy.textContent = copy.textContent;
    const visual = document.createElement('span');
    visual.className = 'text-visual';
    visual.setAttribute('aria-hidden', 'true');
    visual.append(...block.childNodes);
    const walker = document.createTreeWalker(visual, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    const count = nodes.reduce((sum, node) => sum + [...node.textContent].length, 0);
    const step = Math.min(block.matches('h2') ? 48 : 26, 1800 / Math.max(1, count - 1));
    let index = 0;
    for (const node of nodes) {
      const fragment = document.createDocumentFragment();
      for (const character of node.textContent) {
        const letter = document.createElement('span');
        letter.className = 'ink-char';
        letter.style.setProperty('--letter-delay', `${Math.round(index++ * step)}ms`);
        letter.textContent = character;
        fragment.append(letter);
      }
      node.replaceWith(fragment);
    }
    block.append(readingCopy, visual);
    block.classList.add('ink-reveal');
    writtenBlocks.push(block);
    const lastLetter = [...visual.querySelectorAll('.ink-char')].at(-1);
    block.addEventListener('animationend', event => {
      if (event.target === lastLetter && event.animationName === 'letter-arrives') block.classList.add('is-settled');
    });
    if (effectsPaused || motionPreference.matches) block.classList.add('is-written', 'is-settled');
    else afterInitialLayout(() => textObserver.observe(block));
  });
}
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
if (!motionPreference.matches && !effectsPaused && !location.hash) {
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

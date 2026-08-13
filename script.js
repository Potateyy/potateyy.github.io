const body = document.body;
const loader = document.querySelector('.loader');
const tabs = [...document.querySelectorAll('[role="tab"]')];
const panels = [...document.querySelectorAll('[role="tabpanel"]')];
const panelLinks = [...document.querySelectorAll('[data-target]')].filter((item) => !item.matches('[role="tab"]'));
const themeToggle = document.querySelector('.theme-toggle');
const progressBar = document.querySelector('.reading-progress span');

const setTheme = (theme) => {
  body.dataset.theme = theme;
  localStorage.setItem('potateyy-theme', theme);
  const isLight = theme === 'light';
  themeToggle.setAttribute('aria-label', `Switch to ${isLight ? 'dark' : 'light'} theme`);
  themeToggle.title = `Switch to ${isLight ? 'dark' : 'light'} theme`;
  document.querySelector('meta[name="theme-color"]').setAttribute('content', isLight ? '#f5efe5' : '#19110e');
};

const savedTheme = localStorage.getItem('potateyy-theme');
setTheme(savedTheme || 'light');

const activatePanel = (target, shouldFocus = false) => {
  const selectedPanel = document.getElementById(target);
  const selectedTab = document.querySelector(`[data-target="${target}"][role="tab"]`);
  if (!selectedPanel || !selectedTab) return;

  tabs.forEach((tab) => {
    const selected = tab === selectedTab;
    tab.classList.toggle('is-active', selected);
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
  });
  panels.forEach((panel) => {
    const selected = panel === selectedPanel;
    panel.hidden = !selected;
    panel.classList.toggle('is-active', selected);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (shouldFocus) selectedPanel.focus({ preventScroll: true });
};

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => activatePanel(tab.dataset.target));
  tab.addEventListener('keydown', (event) => {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    let nextIndex = index;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = tabs.length - 1;
    tabs[nextIndex].focus();
    activatePanel(tabs[nextIndex].dataset.target, true);
  });
});

panelLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    activatePanel(link.dataset.target, true);
  });
});

themeToggle.addEventListener('click', () => {
  setTheme(body.dataset.theme === 'dark' ? 'light' : 'dark');
});

document.querySelector('.back-to-top').addEventListener('click', () => activatePanel('home'));
document.querySelector('#year').textContent = new Date().getFullYear();

document.querySelector('#contact-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const status = form.querySelector('.form-status');
  const submitButton = form.querySelector('button[type="submit"]');
  const formData = Object.fromEntries(new FormData(form).entries());
  const name = formData.name.trim();

  status.textContent = 'Sending message…';
  submitButton.disabled = true;

  fetch(form.action, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
    credentials: 'same-origin',
  })
    .then(async (response) => {
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.ok) throw new Error(result.error || 'Unable to send message.');
      status.textContent = `Thanks, ${name}. Your message has been sent.`;
      form.reset();
    })
    .catch(() => {
      status.textContent = 'Message could not be sent. Please try dming me on Discord at "potateyy"';
    })
    .finally(() => {
      submitButton.disabled = true;
    });
});

document.querySelectorAll('.vouch-carousel').forEach((carousel) => {
  const track = carousel.querySelector('.vouch-track');
  const cards = [...carousel.querySelectorAll('.vouch-card')];
  const previous = carousel.querySelector('[data-vouch-prev]');
  const next = carousel.querySelector('[data-vouch-next]');
  const counter = carousel.querySelector('.vouch-counter');
  let current = 0;

  const showVouch = (index) => {
    current = (index + cards.length) % cards.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    counter.textContent = `${current + 1} / ${cards.length}`;
  };

  previous.addEventListener('click', () => showVouch(current - 1));
  next.addEventListener('click', () => showVouch(current + 1));
  showVouch(0);
});

window.addEventListener('scroll', () => {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.transform = `scaleX(${maxScroll ? window.scrollY / maxScroll : 0})`;
}, { passive: true });

const finishLoading = () => {
  window.setTimeout(() => {
    loader.classList.add('is-done');
    body.classList.add('is-ready');
  }, 1250);
};

if (document.readyState === 'complete') finishLoading();
else window.addEventListener('load', finishLoading, { once: true });

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
  const name = new FormData(form).get('name').trim();
  status.textContent = `Thanks, ${name}. Your message is ready to send.`;
  form.reset();
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

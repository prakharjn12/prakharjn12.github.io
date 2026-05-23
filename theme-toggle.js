(function () {
  const storageKey = 'prakhar-site-theme';
  const root = document.documentElement;

  function getPreferredTheme() {
    const storedTheme = localStorage.getItem(storageKey);
    if (storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme;
    }

    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function applyTheme(theme) {
    root.dataset.theme = theme;

    const toggle = document.querySelector('.theme-toggle');
    if (!toggle) {
      return;
    }

    const isLight = theme === 'light';
    toggle.setAttribute('aria-pressed', String(isLight));
    toggle.setAttribute('aria-label', `Switch to ${isLight ? 'dark' : 'light'} theme`);

    const label = toggle.querySelector('.theme-toggle-label');
    if (label) {
      label.textContent = isLight ? 'Light' : 'Dark';
    }
  }

  applyTheme(getPreferredTheme());

  document.addEventListener('DOMContentLoaded', () => {
    applyTheme(root.dataset.theme || getPreferredTheme());

    const toggle = document.querySelector('.theme-toggle');
    if (!toggle) {
      return;
    }

    toggle.addEventListener('click', () => {
      const nextTheme = root.dataset.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem(storageKey, nextTheme);
      applyTheme(nextTheme);
    });
  });
}());

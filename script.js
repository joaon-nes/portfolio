(() => {
  const root = document.documentElement;
  const toggle = document.querySelector('.theme-toggle');
  const icon = document.querySelector('.theme-icon');
  const year = document.querySelector('#current-year');
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const storedTheme = localStorage.getItem('portfolio-theme');

  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    const isLight = theme === 'light';
    toggle?.setAttribute('aria-pressed', String(isLight));
    if (icon) icon.textContent = isLight ? '☾' : '☼';
    themeColor?.setAttribute('content', isLight ? '#f6f6f4' : '#1e1e1d');
  };

  applyTheme(storedTheme || 'light');

  toggle?.addEventListener('click', () => {
    const nextTheme = root.dataset.theme === 'light' ? 'dark' : 'light';
    applyTheme(nextTheme);
    localStorage.setItem('portfolio-theme', nextTheme);
  });

  if (year) year.textContent = String(new Date().getFullYear());
})();

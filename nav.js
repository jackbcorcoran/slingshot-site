// ── SLINGSHOT ENGAGED · SHARED NAV ──
// Edit this file to update navigation across ALL pages.

(function () {
  const NAV_ITEMS = [
    { emoji: '🏠', label: 'Home',                   href: 'index.html' },
    { emoji: '💪', label: 'Beefcakes',              href: 'beefcakes.html' },
    { emoji: '📊', label: 'Record Book',            href: 'record-book.html' },
    { emoji: '📋', label: 'Constitution',           href: 'constitution.html' },
    { emoji: '📸', label: 'Album',                  href: 'album.html' },
    { emoji: '🌍', label: "Franks 'Round the World", href: 'franks.html' },
  ];

  // Inject CSS
  const style = document.createElement('style');
  style.textContent = `
    nav {
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 20px; height: 60px; background: #0d0d0d;
      border-bottom: 2px solid var(--red); position: sticky; top: 0; z-index: 100;
    }
    .nav-logo {
      font-family: 'Bebas Neue', sans-serif; font-weight: 400;
      font-size: 1.35rem; letter-spacing: 0.1em;
      color: var(--red-bright); text-transform: uppercase;
    }
    .hotdog-btn {
      background: none; border: none; cursor: pointer;
      font-size: 1.75rem; line-height: 1; padding: 4px; transition: transform 0.2s;
    }
    .hotdog-btn:hover { transform: scale(1.15) rotate(-5deg); }
    .menu-overlay {
      position: fixed; inset: 0; background: rgba(0,0,0,0.6);
      z-index: 200; opacity: 0; pointer-events: none; transition: opacity 0.25s;
    }
    .menu-overlay.open { opacity: 1; pointer-events: all; }
    .slide-menu {
      position: fixed; top: 0; right: 0;
      width: min(340px, 100vw); height: 100vh; background: #0d0d0d;
      border-left: 2px solid var(--red); z-index: 300;
      transform: translateX(100%); transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
      display: flex; flex-direction: column;
    }
    .slide-menu.open { transform: translateX(0); }
    .slide-menu-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 20px; height: 60px; border-bottom: 2px solid var(--red);
    }
    .close-btn {
      background: none; border: none; color: #666; font-size: 1.5rem;
      cursor: pointer; line-height: 1;
    }
    .close-btn:hover { color: #fff; }
    .menu-items { display: flex; flex-direction: column; }
    .menu-item {
      display: flex; align-items: center; gap: 14px;
      padding: 20px 22px; border-bottom: 1px solid #2a2a2a;
      cursor: pointer; text-decoration: none; transition: background 0.15s;
    }
    .menu-item:hover { background: #1a1a1a; }
    .menu-item-emoji { font-size: 1.4rem; }
    .menu-item-label {
      font-family: 'Bebas Neue', sans-serif; font-weight: 400;
      font-size: 1.2rem; letter-spacing: 0.12em;
      text-transform: uppercase; color: #fff;
    }
    .menu-item.active .menu-item-label { color: var(--red-bright); }
  `;
  document.head.appendChild(style);

  // Determine active page
  const currentPage = location.pathname.split('/').pop() || 'index.html';

  // Build navbar HTML
  const nav = document.createElement('nav');
  nav.innerHTML = `
    <div class="nav-logo">Slingshot Engaged</div>
    <button class="hotdog-btn" id="menuToggle" aria-label="Open menu">🌭</button>
  `;

  const overlay = document.createElement('div');
  overlay.className = 'menu-overlay';
  overlay.id = 'menuOverlay';

  const slideMenu = document.createElement('div');
  slideMenu.className = 'slide-menu';
  slideMenu.id = 'slideMenu';
  slideMenu.innerHTML = `
    <div class="slide-menu-header">
      <div class="nav-logo">Slingshot Engaged</div>
      <button class="close-btn" id="menuClose">✕</button>
    </div>
    <div class="menu-items">
      ${NAV_ITEMS.map(item => `
        <a href="${item.href}" class="menu-item${currentPage === item.href ? ' active' : ''}">
          <span class="menu-item-emoji">${item.emoji}</span>
          <span class="menu-item-label">${item.label}</span>
        </a>
      `).join('')}
    </div>
  `;

  // Insert at top of body
  document.body.prepend(slideMenu);
  document.body.prepend(overlay);
  document.body.prepend(nav);

  // Wire up open/close
  function openMenu() {
    slideMenu.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    slideMenu.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.getElementById('menuToggle').addEventListener('click', openMenu);
  document.getElementById('menuClose').addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);
})();

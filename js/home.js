/* =========================================================
   navbar.js
   Turns your existing header into the 3-line mobile/tablet menu.
   No HTML changes needed: it adds the button and wraps
   .nav-links + .contact-btn in a .nav-menu panel for you.
   ========================================================= */
(function () {
  var header = document.querySelector('header.navbar');
  if (!header) return;

  var links = header.querySelector('.nav-links');
  var contact = header.querySelector('.contact-btn');
  var menu = header.querySelector('.nav-menu');
  var toggle = header.querySelector('.menu-toggle');

  // 1. wrap the links + Contact Us button in one panel
  if (!menu) {
    menu = document.createElement('div');
    menu.className = 'nav-menu';
    menu.id = 'navMenu';
    if (links) menu.appendChild(links);
    if (contact) menu.appendChild(contact);
  }

  // 2. create the 3-line button
  if (!toggle) {
    toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'menu-toggle';
    toggle.id = 'menuToggle';
    toggle.setAttribute('aria-label', 'Open menu');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', menu.id || 'navMenu');
    toggle.innerHTML = '<span></span><span></span><span></span>';
  }

  // order inside the header: logo, button, panel
  header.appendChild(toggle);
  header.appendChild(menu);

  // 3. open / close
  function setMenu(open) {
    menu.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  toggle.addEventListener('click', function () {
    setMenu(!menu.classList.contains('open'));
  });

  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { setMenu(false); });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setMenu(false);
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 1024) setMenu(false);
  });
})();
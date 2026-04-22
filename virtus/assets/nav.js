(function () {
  var navLinks = [
    { label: 'Candidates', href: 'candidates.html' },
    { label: 'Employers',  href: 'employers.html' },
    { label: 'Sectors',    href: 'sectors.html' },
    { label: 'Insights',   href: 'insights.html' },
    { label: 'About',      href: 'about.html' },
    { label: 'Contact',    href: 'contact.html' }
  ];

  // Map every page (including child pages without a direct nav slot) to its highlighted nav label.
  var currentMap = {
    'candidates.html':    'Candidates',
    'employers.html':     'Employers',
    'sectors.html':       'Sectors',
    'insights.html':      'Insights',
    'insight.html':'Insights',
    'about.html':         'About',
    'contact.html':       'Contact',
    'roles.html':         'Candidates',
    'role.html':   'Candidates',
    'submit-role.html':   'Employers'
  };

  var page = (location.pathname.split('/').pop() || '').toLowerCase();
  var current = currentMap[page] || null;

  function navLinksHtml() {
    return navLinks.map(function (l) {
      var cls = (l.label === current) ? ' class="is-current"' : '';
      return '<li><a href="' + l.href + '"' + cls + '>' + l.label + '</a></li>';
    }).join('');
  }

  var headerHtml = ''
    + '<header class="site-header">'
    +   '<div class="header-pill">'
    +     '<div class="header-left">'
    +       '<a href="index.html" class="logo"><img src="assets/virtus-logo.svg" alt="Virtus"></a>'
    +       '<ul class="nav-links">' + navLinksHtml() + '</ul>'
    +     '</div>'
    +     '<div class="header-right">'
    +       '<a href="submit-role.html" class="btn-outline">Submit a Role</a>'
    +       '<a href="roles.html" class="btn-nav-primary">Find a Job</a>'
    +     '</div>'
    +     '<button class="nav-toggle" aria-label="Open menu" aria-controls="mobile-nav" aria-expanded="false">'
    +       '<svg viewBox="0 0 24 24" fill="none"><line class="burger-line top" x1="4" y1="12" x2="20" y2="12"/><line class="burger-line bottom" x1="4" y1="12" x2="20" y2="12"/></svg>'
    +     '</button>'
    +   '</div>'
    + '</header>';

  var mobileNavHtml = ''
    + '<nav id="mobile-nav" class="mobile-nav" aria-label="Mobile navigation">'
    +   '<div class="mobile-nav-body">'
    +     '<div class="mobile-nav-group">'
    +       '<div class="mobile-nav-eyebrow">For You</div>'
    +       '<a href="candidates.html" class="mobile-nav-link">Candidates</a>'
    +       '<a href="employers.html"  class="mobile-nav-link">Employers</a>'
    +     '</div>'
    +     '<div class="mobile-nav-group">'
    +       '<div class="mobile-nav-eyebrow">Explore</div>'
    +       '<a href="sectors.html"  class="mobile-nav-link">Sectors</a>'
    +       '<a href="insights.html" class="mobile-nav-link">Insights</a>'
    +       '<a href="about.html"    class="mobile-nav-link">About</a>'
    +       '<a href="contact.html"  class="mobile-nav-link">Contact</a>'
    +     '</div>'
    +   '</div>'
    +   '<div class="mobile-nav-cta">'
    +     '<a href="roles.html"        class="mnc-primary">Find a Job</a>'
    +     '<a href="submit-role.html"  class="mnc-secondary">Submit a Role</a>'
    +   '</div>'
    +   '<div class="mobile-nav-meta">'
    +     '<a href="mailto:hello@virtus.com.au">hello@virtus.com.au</a><br>'
    +     'Level 12, 123 Pitt Street, Sydney NSW 2000'
    +   '</div>'
    + '</nav>';

  var globalStyle = ''
    + '<style id="nav-global-overflow">'
    +   'html,body{overflow-x:hidden;max-width:100%;}'
    +   '.mobile-nav,.mobile-nav *{max-width:100%;box-sizing:border-box;}'
    +   '.mobile-nav-link{overflow-wrap:break-word;word-break:break-word;}'
    + '</style>';

  function inject() {
    var body = document.body;
    if (!body) return;
    document.head.insertAdjacentHTML('beforeend', globalStyle);
    body.insertAdjacentHTML('afterbegin', mobileNavHtml);
    body.insertAdjacentHTML('afterbegin', headerHtml);
    wire();
  }

  function wire() {
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.getElementById('mobile-nav');
    if (!toggle || !nav) return;
    function openNav()  { nav.classList.add('open');    document.body.classList.add('nav-locked');    toggle.setAttribute('aria-expanded', 'true');  toggle.setAttribute('aria-label', 'Close menu'); }
    function closeNav() { nav.classList.remove('open'); document.body.classList.remove('nav-locked'); toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Open menu'); }
    toggle.addEventListener('click', function () { nav.classList.contains('open') ? closeNav() : openNav(); });
    var closeBtn = nav.querySelector('.mobile-nav-close');
    if (closeBtn) closeBtn.addEventListener('click', closeNav);
    nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeNav); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && nav.classList.contains('open')) closeNav(); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();

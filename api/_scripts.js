/* Wireframe interaction scripts */

(function () {
  function init() {
    // Dropdown click-to-toggle
    document.querySelectorAll('.nav-dropdown > a').forEach(function (trigger) {
      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        var parent = this.parentElement;
        var wasOpen = parent.classList.contains('open');
        // Close all dropdowns first
        document.querySelectorAll('.nav-dropdown.open').forEach(function (el) {
          el.classList.remove('open');
        });
        // Open this one if it wasn't already open
        if (!wasOpen) {
          parent.classList.add('open');
        }
      });
    });

    // Click outside to close any open dropdown
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.nav-dropdown')) {
        document.querySelectorAll('.nav-dropdown.open').forEach(function (el) {
          el.classList.remove('open');
        });
      }
    });

    // Escape key closes
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        document.querySelectorAll('.nav-dropdown.open').forEach(function (el) {
          el.classList.remove('open');
        });
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

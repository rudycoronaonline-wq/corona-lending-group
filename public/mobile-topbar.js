/**
 * Mobile only (match max-width with mobile-global.css): keep phone + email in the top bar;
 * move NMLS / serving line into the top of the site footer.
 */
(function () {
  'use strict';

  var mq = window.matchMedia('(max-width: 900px)');

  function relocate() {
    document.querySelectorAll('.topbar').forEach(function (topbar) {
      var spans = topbar.querySelectorAll(':scope > span');
      if (spans.length < 2) return;

      var contact = spans[0];
      var meta = spans[1];
      contact.classList.add('topbar-contact');
      meta.classList.add('topbar-meta');

      var footer =
        document.querySelector('footer.site-footer[role="contentinfo"]') ||
        document.querySelector('footer.site-footer');
      if (!footer) return;

      var slot = footer.querySelector('.topbar-meta-footer-anchor');
      if (!slot) {
        slot = document.createElement('div');
        slot.className = 'topbar-meta-footer-anchor';
        slot.setAttribute('aria-label', 'Licensing and service area');
        footer.appendChild(slot);
      }

      if (mq.matches) {
        if (meta.parentElement !== slot) slot.appendChild(meta);
      } else {
        if (meta.parentElement !== topbar) topbar.appendChild(meta);
      }
    });
  }

  function run() {
    relocate();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }

  if (typeof mq.addEventListener === 'function') {
    mq.addEventListener('change', run);
  } else if (typeof mq.addListener === 'function') {
    mq.addListener(run);
  }
  window.addEventListener('resize', run);
})();

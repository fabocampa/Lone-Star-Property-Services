/* =========================================================
   Lone Star Property Services — interactions
   ========================================================= */
(function () {
  'use strict';

  /* ---------- Current year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Header shadow on scroll ---------- */
  var header = document.getElementById('header');
  function onScroll() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var toggle = document.getElementById('nav-toggle');
  var menu = document.getElementById('mobile-menu');
  function closeMenu() {
    if (!menu || !toggle) return;
    menu.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
  }
  function openMenu() {
    if (!menu || !toggle) return;
    menu.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close menu');
  }
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      menu.hidden ? openMenu() : closeMenu();
    });
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* ---------- Scroll reveal ---------- */
  var reveals = document.querySelectorAll('.reveal');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Before / After slider ---------- */
  var ba = document.getElementById('ba');
  var before = document.getElementById('ba-before');
  var handle = document.getElementById('ba-handle');
  if (ba && before && handle) {
    var dragging = false;

    function setPos(clientX) {
      var rect = ba.getBoundingClientRect();
      var pct = ((clientX - rect.left) / rect.width) * 100;
      pct = Math.max(0, Math.min(100, pct));
      before.style.width = pct + '%';
      handle.style.left = pct + '%';
      handle.setAttribute('aria-valuenow', Math.round(pct));
    }

    function startDrag(e) {
      dragging = true;
      ba.classList.add('is-dragging');
      var x = (e.touches ? e.touches[0].clientX : e.clientX);
      setPos(x);
    }
    function moveDrag(e) {
      if (!dragging) return;
      var x = (e.touches ? e.touches[0].clientX : e.clientX);
      setPos(x);
      if (e.cancelable) e.preventDefault();
    }
    function endDrag() { dragging = false; ba.classList.remove('is-dragging'); }

    ba.addEventListener('mousedown', startDrag);
    window.addEventListener('mousemove', moveDrag);
    window.addEventListener('mouseup', endDrag);

    ba.addEventListener('touchstart', startDrag, { passive: true });
    window.addEventListener('touchmove', moveDrag, { passive: false });
    window.addEventListener('touchend', endDrag);

    // Keyboard support
    handle.addEventListener('keydown', function (e) {
      var current = parseFloat(handle.getAttribute('aria-valuenow')) || 50;
      var step = e.shiftKey ? 10 : 4;
      if (e.key === 'ArrowLeft') { current -= step; }
      else if (e.key === 'ArrowRight') { current += step; }
      else if (e.key === 'Home') { current = 0; }
      else if (e.key === 'End') { current = 100; }
      else { return; }
      e.preventDefault();
      current = Math.max(0, Math.min(100, current));
      before.style.width = current + '%';
      handle.style.left = current + '%';
      handle.setAttribute('aria-valuenow', Math.round(current));
    });
  }

  /* ---------- Quote form ---------- */
  var form = document.getElementById('quote-form');
  var success = document.getElementById('form-success');
  // Where quote requests are sent.
  var BUSINESS_EMAIL = 'lonestarservices.tx@yahoo.com';

  if (form) {
    var el = form.elements;
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = el['name'].value.trim();
      var phone = el['phone'].value.trim();
      var email = el['email'].value.trim();
      var service = el['service'].value;
      var message = el['message'].value.trim();

      // Basic validation
      var firstInvalid = null;
      [el['name'], el['phone'], el['service']].forEach(function (input) {
        var wrap = input.closest('.field');
        if (!input.value.trim()) {
          if (wrap) wrap.classList.add('field--error');
          if (!firstInvalid) firstInvalid = input;
        } else if (wrap) {
          wrap.classList.remove('field--error');
        }
      });
      if (firstInvalid) { firstInvalid.focus(); return; }

      // Build a mailto so the lead reaches the business with no backend required.
      var subject = 'Free Quote Request — ' + service + ' (' + name + ')';
      var body =
        'New quote request from the website:\n\n' +
        'Name: ' + name + '\n' +
        'Phone: ' + phone + '\n' +
        'Email: ' + (email || '—') + '\n' +
        'Service: ' + service + '\n' +
        'Details: ' + (message || '—') + '\n';

      window.location.href = 'mailto:' + BUSINESS_EMAIL +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);

      if (success) {
        success.hidden = false;
        success.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
      }
      form.querySelector('button[type="submit"]').textContent = 'Request Sent ✓';
    });

    // Clear error state as the user types
    form.querySelectorAll('input, select, textarea').forEach(function (input) {
      input.addEventListener('input', function () {
        var wrap = input.closest('.field');
        if (wrap) wrap.classList.remove('field--error');
      });
    });
  }
})();

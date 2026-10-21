(function () {
  // Smooth scroll handler for anchor links
  document.addEventListener('click', function (e) {
    var target = e.target;
    while (target && target.tagName !== 'A') {
      target = target.parentElement;
    }
    if (target && target.getAttribute('href') && target.getAttribute('href').startsWith('#')) {
      var hash = target.getAttribute('href').substring(1);
      if (hash === '') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        history.pushState(null, null, ' ');
        return;
      }
      var scrollPoint = document.querySelector('[data-scroll-id="' + hash + '"]');
      if (scrollPoint) {
        e.preventDefault();
        scrollPoint.scrollIntoView({ behavior: 'smooth' });
        history.pushState(null, null, '#' + hash);
      }
    }
  });

  // Handle newsletter dummy subscription submit action
  var form = document.getElementById('form05');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Thank you for subscribing!');
      form.reset();
    });
  }
})();


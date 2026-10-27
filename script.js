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

const publicationBox = document.getElementById('publication-downloads');
const publicationScrollLimit = document.getElementById('publication-scroll-limit');

if (publicationBox && publicationScrollLimit) {

  const desktopQuery = window.matchMedia('(min-width: 1100px)');

  // 0 = normal scrolling
  // 1 = effectively fixed
  // 0.7 = box scrolls at 30% of normal speed
  const compensationFraction = 0.8;

  // Clearance between bottom of box and stopping point
  const bottomGap = 32;

  // Record the box's original document position ONCE.
  const originalBoxTop =
    publicationBox.getBoundingClientRect().top + window.scrollY;

  const boxHeight = publicationBox.offsetHeight;

  let ticking = false;

  function updatePublicationBox() {

    if (!desktopQuery.matches) {
      publicationBox.style.transform = '';
      ticking = false;
      return;
    }

    // How far we'd like to counteract normal scrolling
    let offset = window.scrollY * compensationFraction;

    // Absolute document position of our lower stopping marker
    const limitTop =
      publicationScrollLimit.getBoundingClientRect().top +
      window.scrollY;

    // Maximum offset before the box reaches the stopping marker
    const maxOffset =
      limitTop - originalBoxTop - boxHeight - bottomGap;

    offset = Math.max(0, Math.min(offset, maxOffset));

    publicationBox.style.transform =
      `translate3d(0, ${offset}px, 0)`;

    ticking = false;
  }

  function scheduleUpdate() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updatePublicationBox);
    }
  }

  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate);

  scheduleUpdate();
}
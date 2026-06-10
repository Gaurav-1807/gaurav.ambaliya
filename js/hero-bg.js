/* Animated Lottie background for the main dark frame (left sidebar + page margins). */
(function () {
  function initHeroBg() {
    if (typeof lottie === 'undefined') {
      // Library failed to load; the solid dark base on #hero-bg stays as a fallback.
      return;
    }

    var container = document.getElementById('hero-bg');
    if (!container) return;

    if (!window.HERO_BG_DATA) {
      // Embedded animation data missing (js/hero-bg-data.js not loaded); keep the dark base.
      return;
    }

    var anim = lottie.loadAnimation({
      container: container,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      // Embedded data (not a fetched path) so it works when the page is opened
      // directly via file:// as well as over http:// (browsers block file:// fetches).
      animationData: window.HERO_BG_DATA,
      rendererSettings: {
        // Fill the frame like background-size: cover (crops, never letterboxes).
        preserveAspectRatio: 'xMidYMid slice'
      }
    });

    // Pause while the tab is hidden to save CPU/battery.
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        anim.pause();
      } else {
        anim.play();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeroBg);
  } else {
    initHeroBg();
  }
})();

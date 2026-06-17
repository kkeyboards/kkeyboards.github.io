// ---- Theme showcase carousel ----
(function () {
  const track = document.getElementById("track");
  const dotsWrap = document.getElementById("dots");
  const prev = document.getElementById("prev");
  const next = document.getElementById("next");
  if (!track) return;

  const slides = Array.from(track.children);

  // build dots
  slides.forEach((_, i) => {
    const d = document.createElement("button");
    d.className = "dot" + (i === 0 ? " is-active" : "");
    d.setAttribute("aria-label", "Go to slide " + (i + 1));
    d.addEventListener("click", () => scrollToSlide(i));
    dotsWrap.appendChild(d);
  });
  const dots = Array.from(dotsWrap.children);

  function scrollToSlide(i) {
    const slide = slides[i];
    track.scrollTo({
      left: slide.offsetLeft - (track.clientWidth - slide.clientWidth) / 2,
      behavior: "smooth",
    });
  }

  function currentIndex() {
    const center = track.scrollLeft + track.clientWidth / 2;
    let best = 0, bestDist = Infinity;
    slides.forEach((s, i) => {
      const sc = s.offsetLeft + s.clientWidth / 2;
      const dist = Math.abs(sc - center);
      if (dist < bestDist) { bestDist = dist; best = i; }
    });
    return best;
  }

  function syncDots() {
    const idx = currentIndex();
    dots.forEach((d, i) => d.classList.toggle("is-active", i === idx));
  }

  prev.addEventListener("click", () => scrollToSlide(Math.max(0, currentIndex() - 1)));
  next.addEventListener("click", () => scrollToSlide(Math.min(slides.length - 1, currentIndex() + 1)));

  let raf;
  track.addEventListener("scroll", () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(syncDots);
  });

  // center the first slide on load
  window.addEventListener("load", () => scrollToSlide(0));
})();

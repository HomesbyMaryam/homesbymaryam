(function () {
  // Sticky header — toggle over-hero state on scroll.
  const header = document.querySelector(".site-header");
  if (header && header.dataset.transparent === "true") {
    const onScroll = () => {
      if (window.scrollY > 80) header.classList.remove("is-over-hero");
      else header.classList.add("is-over-hero");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // Mobile nav drawer.
  const toggle = document.querySelector(".nav-toggle");
  const drawer = document.getElementById("nav-drawer");
  if (toggle && drawer) {
    toggle.addEventListener("click", () => {
      const open = drawer.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      drawer.setAttribute("aria-hidden", String(!open));
    });
  }

  // Testimonial rotator.
  document.querySelectorAll("[data-testimonial]").forEach((root) => {
    const quotes = root.querySelectorAll(".testimonial__slide");
    const dots   = root.querySelectorAll(".testimonial__dots button");
    let i = 0;
    const show = (n) => {
      i = n;
      quotes.forEach((q, k) => (q.style.display = k === n ? "block" : "none"));
      dots.forEach((d, k) => d.classList.toggle("is-active", k === n));
    };
    dots.forEach((d, k) => d.addEventListener("click", () => show(k)));
    show(0);
  });

  // Listings filter.
  const grid = document.querySelector("[data-listings-grid]");
  if (grid) {
    const chips = document.querySelectorAll("[data-filter]");
    chips.forEach((c) => {
      c.addEventListener("click", () => {
        chips.forEach((x) => x.classList.remove("is-active"));
        c.classList.add("is-active");
        const f = c.dataset.filter;
        grid.querySelectorAll("[data-region]").forEach((card) => {
          card.style.display = f === "All" || card.dataset.region === f ? "" : "none";
        });
      });
    });
  }

  // Journal category filter.
  const journal = document.querySelector("[data-journal-grid]");
  if (journal) {
    const chips = document.querySelectorAll("[data-cat]");
    chips.forEach((c) => {
      c.addEventListener("click", () => {
        chips.forEach((x) => x.classList.remove("is-active"));
        c.classList.add("is-active");
        const f = c.dataset.cat;
        journal.querySelectorAll("[data-post-cat]").forEach((card) => {
          card.style.display = f === "All" || card.dataset.postCat === f ? "" : "none";
        });
      });
    });
  }
})();

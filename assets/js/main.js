/* Andrés Rogers · portfolio. Vanilla JS, no dependencies. */
(function () {
  "use strict";

  var root = document.documentElement;
  window.clearTimeout(window.__revealGuard);

  /* ---------------------------------------------------------------- theme */

  var toggle = document.getElementById("theme-toggle");
  var media = window.matchMedia ? window.matchMedia("(prefers-color-scheme: light)") : null;
  var stored = null;

  try {
    stored = window.localStorage.getItem("theme");
  } catch (e) {
    stored = null;
  }
  if (stored !== "light" && stored !== "dark") {
    stored = null;
  }

  function label(theme) {
    if (!toggle) {
      return;
    }
    var next = theme === "dark" ? "light" : "dark";
    var text = "Switch to " + next + " theme";
    toggle.setAttribute("aria-label", text);
    toggle.setAttribute("title", text);
  }

  function apply(theme, persist) {
    root.setAttribute("data-theme", theme);
    label(theme);
    if (persist) {
      try {
        window.localStorage.setItem("theme", theme);
      } catch (e) {
        /* storage unavailable: the in-page theme still changes */
      }
    }
  }

  label(root.getAttribute("data-theme") === "light" ? "light" : "dark");

  if (toggle) {
    toggle.addEventListener("click", function () {
      stored = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      apply(stored, true);
    });
  }

  if (media && typeof media.addEventListener === "function") {
    media.addEventListener("change", function (event) {
      if (!stored) {
        apply(event.matches ? "light" : "dark", false);
      }
    });
  }

  /* ----------------------------------------------------------- mobile nav */

  var menuBtn = document.getElementById("menu-toggle");
  var nav = document.getElementById("site-nav");

  function setMenu(open) {
    if (!menuBtn || !nav) {
      return;
    }
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    nav.classList.toggle("is-open", open);
  }

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      setMenu(menuBtn.getAttribute("aria-expanded") !== "true");
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        setMenu(false);
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && menuBtn.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        menuBtn.focus();
      }
    });

    document.addEventListener("click", function (event) {
      if (
        menuBtn.getAttribute("aria-expanded") === "true" &&
        !nav.contains(event.target) &&
        !menuBtn.contains(event.target)
      ) {
        setMenu(false);
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 960) {
        setMenu(false);
      }
    });
  }

  /* ------------------------------------------------------------- reveal */

  var items = document.querySelectorAll(".reveal");

  function revealAll() {
    for (var i = 0; i < items.length; i += 1) {
      items[i].classList.add("is-visible");
    }
  }

  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduced || !("IntersectionObserver" in window)) {
    revealAll();
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.04 }
    );

    for (var j = 0; j < items.length; j += 1) {
      observer.observe(items[j]);
    }
  }
})();

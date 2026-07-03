/**
 * Portfolio scripts
 */
(function () {
  "use strict";

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Open external + PDF links reliably (incl. local file preview) */
  document.querySelectorAll('a[href^="http"], a[href$=".pdf"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      if (window.location.protocol === "file:") {
        e.preventDefault();
        window.open(link.href, "_blank", "noopener,noreferrer");
      }
    });
  });

  /* Header — light bg when over work section */
  var header = document.querySelector(".header");
  var work = document.getElementById("work");

  function onScroll() {
    if (!header || !work) return;
    var rect = work.getBoundingClientRect();
    header.classList.toggle("on-light", rect.top <= 80 && rect.bottom > 80);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Scroll reveal */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    );
    reveals.forEach(function (el) { obs.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* Copy email */
  var copyBtn = document.getElementById("copy-email");
  var toast = document.getElementById("email-toast");

  if (copyBtn && toast) {
    copyBtn.addEventListener("click", function () {
      var email = copyBtn.getAttribute("data-email") || "";
      function show(msg) {
        toast.textContent = msg;
        toast.classList.add("is-visible");
        setTimeout(function () { toast.classList.remove("is-visible"); }, 2400);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(function () {
          show("Email copied!");
        }).catch(function () {
          window.location.href = "mailto:" + email;
        });
      } else {
        window.location.href = "mailto:" + email;
      }
    });
  }

  /* Close mobile nav on link click */
  var toggle = document.getElementById("nav-toggle");
  if (toggle) {
    document.querySelectorAll(".header__nav a").forEach(function (link) {
      link.addEventListener("click", function () { toggle.checked = false; });
    });
  }
})();

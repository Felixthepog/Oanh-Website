// Oanh Le, D.D.S. — site behavior
// Plain JS, no build step, no framework, no backend.

(function () {
  "use strict";

  /* Mobile nav toggle */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* Scroll-reveal for elements marked data-reveal */
  var revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* Footer year */
  var yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Contact form — posts to Formspree (no backend of our own required).
     See README.md for how to connect this to the client's own free
     Formspree endpoint. Falls back to a clear error + mailto if the
     request fails, so a message is never silently lost. */
  var form = document.querySelector("#contact-form");
  if (form) {
    var status = form.querySelector(".form-status");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var action = form.getAttribute("action");
      var placeholder = action.indexOf("YOUR_FORM_ID") !== -1;

      if (placeholder) {
        showStatus(
          "This form isn't connected yet — see README.md to add a free Formspree endpoint. " +
            "In the meantime you can email Oanh.le.dds@gmail.com directly.",
          "error"
        );
        return;
      }

      var submitBtn = form.querySelector('button[type="submit"]');
      var originalLabel = submitBtn ? submitBtn.textContent : "";
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending…";
      }

      fetch(action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      })
        .then(function (res) {
          if (res.ok) {
            form.reset();
            showStatus("Thanks — your message has been sent. We'll be in touch soon.", "success");
          } else {
            showStatus(
              "Something went wrong sending that. Please call (650) 558-9253 or email Oanh.le.dds@gmail.com.",
              "error"
            );
          }
        })
        .catch(function () {
          showStatus(
            "Something went wrong sending that. Please call (650) 558-9253 or email Oanh.le.dds@gmail.com.",
            "error"
          );
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalLabel;
          }
        });
    });

    function showStatus(message, kind) {
      if (!status) return;
      status.textContent = message;
      status.classList.remove("is-success", "is-error");
      status.classList.add("is-visible", kind === "success" ? "is-success" : "is-error");
    }
  }
})();

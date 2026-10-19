(() => {
  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();

  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#nav-links");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
      nav.classList.toggle("is-open", !isOpen);
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open navigation menu");
    }));
    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open navigation menu");
        toggle.focus();
      }
    });
  }

  const filterButtons = document.querySelectorAll("[data-filter]");
  const cards = document.querySelectorAll(".project-card[data-categories]");
  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      filterButtons.forEach(item => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      cards.forEach(card => {
        const categories = card.dataset.categories.split(/\s+/);
        card.hidden = filter !== "all" && !categories.includes(filter);
      });
    });
  });

  document.querySelectorAll(".placeholder-link").forEach(link => {
    link.setAttribute("aria-disabled", "true");
    link.addEventListener("click", event => {
      event.preventDefault();
      const note = link.dataset.placeholder || "Replace this placeholder with a working project URL.";
      window.alert(note);
    });
  });

  const form = document.querySelector("#contact-form");
  const note = document.querySelector("#form-note");
  if (form) {
    form.addEventListener("submit", event => {
      event.preventDefault();
      const data = new FormData(form);
      const email = "arabiywebtech@gmail.com";
      if (email === "arabiywebtech@gmail.com") {
        note.textContent = "";
        note.focus?.();
        return;
      }
      const subject = encodeURIComponent(data.get("subject"));
      const body = encodeURIComponent(`Name: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`);
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    });
  }
})();
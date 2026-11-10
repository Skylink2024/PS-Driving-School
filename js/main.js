(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  function setOpen(open) {
    if (!toggle || !nav) return;
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.classList.toggle("nav-open", open);
  }

  if (toggle && nav) {
    var links = Array.prototype.slice.call(nav.querySelectorAll("a"));

    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") !== "true";
      setOpen(open);
      if (open && links[0]) links[0].focus();
      if (!open) toggle.focus();
    });

    links.forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.matchMedia("(max-width: 899px)").matches) setOpen(false);
      });
    });

    document.addEventListener("keydown", function (event) {
      var open = toggle.getAttribute("aria-expanded") === "true";
      if (!open || window.matchMedia("(min-width: 900px)").matches) return;
      if (event.key === "Escape") {
        setOpen(false);
        toggle.focus();
        return;
      }
      if (event.key !== "Tab" || !links.length) return;
      var first = links[0];
      var last = links[links.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
  }

  document.querySelectorAll(".faq-q").forEach(function (button) {
    button.addEventListener("click", function () {
      var panel = document.getElementById(button.getAttribute("aria-controls"));
      var expanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", expanded ? "false" : "true");
      if (panel) panel.hidden = expanded;
      var mark = button.querySelector("[data-mark]");
      if (mark) mark.textContent = expanded ? "+" : "–";
    });
  });

  var form = document.getElementById("booking-form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var data = new FormData(form);
      var name = String(data.get("name") || "").trim();
      var phone = String(data.get("phone") || "").trim();
      var email = String(data.get("email") || "").trim();
      var service = String(data.get("service") || "").trim();
      var days = String(data.get("days") || "").trim();
      var message = String(data.get("message") || "").trim();
      var lines = [
        "Hi PS Driving School, I would like to ask about driving lessons.",
        "Name: " + name,
        "Phone: " + phone,
        "Service: " + service
      ];
      if (email) lines.push("Email: " + email);
      if (days) lines.push("Preferred days: " + days);
      if (message) lines.push(message);
      var url = "https://wa.me/27625005250?text=" + encodeURIComponent(lines.join("\n"));
      var opened = window.open(url, "_blank", "noopener");
      if (!opened) window.location.href = url;
    });
  }
})();

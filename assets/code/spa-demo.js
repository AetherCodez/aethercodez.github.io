// SPA.js demo — a simulated browser chrome, not the real library.
// This mirrors what SPA.js keeps in sync (title / favicon / url / background)
// so visitors can see the effect without needing two real origins.
(() => {
  "use strict";

  const PAGES = {
    home: {
      path: "/",
      title: "Home",
      heading: "Home",
      body: "This box represents the top-level page. Click below to simulate an in-app navigation — watch the URL bar, tab title, and favicon update together, the way SPA.js syncs an iframe with its host.",
      bg: "#141412",
    },
    docs: {
      path: "/docs",
      title: "Docs",
      heading: "Documentation",
      body: "Same origin, same frame — SPA.js pushed a new history entry and relayed the new title without a full page reload.",
      bg: "#101418",
    },
    pricing: {
      path: "/pricing",
      title: "Pricing",
      heading: "Pricing",
      body: "The favicon and background traveled with it too — both are read from the framed document and mirrored onto the host.",
      bg: "#181410",
    },
  };

  const urlEl = document.getElementById("mockUrl");
  const tabTitleEl = document.getElementById("mockTabTitle");
  const headingEl = document.getElementById("mockHeading");
  const bodyEl = document.getElementById("mockBody");
  const bodyTextEl = bodyEl.querySelector("p");
  const faviconEl = document.getElementById("mockFavicon");

  function render(key) {
    const page = PAGES[key];
    urlEl.textContent = "https://example.com" + page.path;
    tabTitleEl.textContent = page.title;
    headingEl.textContent = page.heading;
    bodyTextEl.textContent = page.body;
    bodyEl.style.backgroundColor = page.bg;
  }

  render("home");

  document.querySelectorAll("[data-nav]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-nav");

      if (key === "external") {
        // Mirrors SPA.js's real behavior: cross-origin destinations get a
        // real, visible navigation instead of being absorbed into the frame.
        urlEl.textContent = "https://a-different-site.example/";
        tabTitleEl.textContent = "Leaving frame…";
        headingEl.textContent = "Cross-origin — real navigation";
        bodyTextEl.textContent = "SPA.js does not intercept this. The browser would perform a normal top-level navigation here, exactly as if the script weren't running.";
        bodyEl.style.backgroundColor = "#1a1210";
        faviconEl.style.opacity = "0.3";
        return;
      }

      faviconEl.style.opacity = "1";
      render(key);
    });
  });
})();

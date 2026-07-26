// AetherCodez — renders the package grid on index.html from projects.json.
// Add a new project by adding an object to projects.json; nothing here
// needs to change.
(() => {
  "use strict";

  const grid = document.getElementById("pkgGrid");
  if (!grid) return;

  function arrowIcon() {
    return `<svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path d="M3 8h10m0 0-4-4m4 4-4 4" stroke="currentColor" stroke-width="1.6"
        stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
  }

  function cardHTML(p) {
    const mark = p.icon
      ? `<img src="${p.icon}" alt="" style="width:22px;height:22px;">`
      : (p.initials || "?");

    const tags = [
      typeof p.deps === "number" ? `<span>deps: ${p.deps}</span>` : "",
      p.license ? `<span>${p.license}</span>` : "",
      p.extraTag ? `<span>${p.extraTag}</span>` : "",
    ].join("");

    return `
      <a class="pkg-card" href="${p.demoUrl}">
        <div class="pkg-top">
          <span class="pkg-mark">${mark}</span>
          ${p.size ? `<span class="pkg-size">${p.size}</span>` : ""}
        </div>
        <h3>${p.name}</h3>
        <p>${p.tagline || ""}</p>
        <div class="pkg-tags">${tags}</div>
        <span class="pkg-go">View interactive demo ${arrowIcon()}</span>
      </a>`;
  }

  fetch("projects.json")
    .then((res) => {
      if (!res.ok) throw new Error("projects.json request failed: " + res.status);
      return res.json();
    })
    .then((projects) => {
      if (!Array.isArray(projects) || projects.length === 0) return;
      grid.innerHTML = projects.map(cardHTML).join("");
    })
    .catch((err) => {
      // Leave the static fallback cards already in the HTML untouched.
      console.warn("AetherCodez: couldn't load projects.json, showing static fallback.", err);
    });
})();

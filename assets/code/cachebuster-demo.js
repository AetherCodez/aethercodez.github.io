// CacheBuster.js demo — simulates cache state visually; does not touch
// the real page cache (this page has nothing worth busting).
(() => {
  "use strict";

  const cacheKeyEl = document.getElementById("cacheKey");
  const chips = Array.from(document.querySelectorAll(".asset-chip"));
  const logPanel = document.getElementById("logPanel");
  const bustBtn = document.getElementById("bustBtn");
  const hitBtn = document.getElementById("hitBtn");

  function shortId() {
    return crypto.randomUUID().split("-")[0];
  }

  function timestamp() {
    const d = new Date();
    return d.toTimeString().slice(0, 8);
  }

  function log(message, kind) {
    const line = document.createElement("div");
    line.className = "line" + (kind ? " " + kind : "");
    line.innerHTML = `<span class="t">${timestamp()}</span><span class="msg">${message}</span>`;
    logPanel.appendChild(line);
    logPanel.scrollTop = logPanel.scrollHeight;
  }

  function paintChips(key, flashed) {
    chips.forEach((chip) => {
      const stampEl = chip.querySelector(".stamp");
      stampEl.textContent = (flashed ? "refetched · " : "cached · ") + key;
      chip.classList.toggle("flashed", flashed);
    });
  }

  let currentKey = cacheKeyEl.textContent;
  paintChips(currentKey, false);
  log("page loaded, no ?cachebuster param present", null);

  hitBtn.addEventListener("click", () => {
    log(`GET /style.css — 304 from cache (key ${currentKey})`, "hit");
    log(`GET /main.js — 304 from cache (key ${currentKey})`, "hit");
  });

  bustBtn.addEventListener("click", () => {
    const newKey = shortId();
    log(`cachebuster.clearCache() called`, "bust");
    log(`→ location.replace("?cachebuster=${newKey}…")`, "bust");

    setTimeout(() => {
      currentKey = newKey;
      cacheKeyEl.textContent = newKey;
      paintChips(newKey, true);
      log(`reload complete, every asset refetched under key ${newKey}`, "bust");
      log(`history.replaceState() strips ?cachebuster= from the URL`, null);

      setTimeout(() => paintChips(newKey, false), 1400);
    }, 450);
  });
})();

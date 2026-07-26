// AetherCodez — shared site behavior (nav + copy buttons)
(() => {
  "use strict";

  document.querySelectorAll("[data-copy]").forEach((btn) => {
    const targetSel = btn.getAttribute("data-copy");
    const target = document.querySelector(targetSel);
    if (!target) return;

    btn.addEventListener("click", async () => {
      const text = target.innerText;
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        // Fallback for older/non-secure contexts.
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        ta.remove();
      }

      const original = btn.textContent;
      btn.textContent = "copied";
      btn.dataset.copied = "true";
      setTimeout(() => {
        btn.textContent = original;
        btn.dataset.copied = "false";
      }, 1600);
    });
  });
})();

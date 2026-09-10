/**
 * Probe a loopback SDT host. Lessons always load from GitHub Pages.
 * The Python console is optional and only appears when the host answers.
 */
(function () {
  const ENDPOINTS = [
    "http://127.0.0.1:8788",
    "http://127.0.0.1:8789",
    "https://127.0.0.1:8788",
    "https://127.0.0.1:8789",
  ];

  function el(id) {
    return document.getElementById(id);
  }

  function setStatus(html, ok) {
    const bar = el("sdt-host-status");
    if (!bar) return;
    bar.classList.toggle("is-on", !!ok);
    bar.classList.toggle("is-off", !ok);
    bar.innerHTML = html;
  }

  async function probeOne(base) {
    const ctrl = new AbortController();
    const timer = setTimeout(function () {
      ctrl.abort();
    }, 1500);
    try {
      const res = await fetch(base + "/api/health", {
        method: "GET",
        mode: "cors",
        cache: "no-store",
        signal: ctrl.signal,
      });
      clearTimeout(timer);
      if (!res.ok) return null;
      const data = await res.json();
      if (data && data.connected) return base;
    } catch (err) {
      clearTimeout(timer);
    }
    return null;
  }

  async function probe() {
    for (let i = 0; i < ENDPOINTS.length; i += 1) {
      const hit = await probeOne(ENDPOINTS[i]);
      if (hit) return hit;
    }
    return null;
  }

  function showOffline() {
    setStatus(
      "<strong>Python console: host offline.</strong> This lesson still works. Copy the commands into a terminal on your own computer.",
      false
    );
    const frame = el("sdt-console");
    if (frame) {
      frame.hidden = true;
      frame.removeAttribute("src");
    }
  }

  function showOnline(base) {
    const open = base + "/console";
    setStatus(
      "<strong>Python console: available.</strong> Numbered runs can execute on the lab host. <a href=\"" +
        open +
        "\" target=\"sdt-console-win\" rel=\"noopener\">Open console</a>",
      true
    );
    const frame = el("sdt-console");
    if (frame) {
      frame.hidden = false;
      frame.src = open;
    }
  }

  function tick() {
    probe().then(function (base) {
      if (base) showOnline(base);
      else showOffline();
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (!el("sdt-host-status")) return;
    showOffline();
    tick();
    setInterval(tick, 10000);
  });
})();

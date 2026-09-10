/**
 * Optional local Python console. Lessons always load from GitHub Pages.
 * Launch uses HTTPS on loopback so the public site never embeds HTTP.
 */
(function () {
  const HTTPS = "https://127.0.0.1:8789";
  const HTTP = "http://127.0.0.1:8788";

  function btn() {
    return document.getElementById("sdt-console-btn");
  }

  function setOffline() {
    const el = btn();
    if (!el) return;
    el.classList.add("is-off");
    el.setAttribute("aria-disabled", "true");
    el.removeAttribute("href");
    el.title = "Host offline. Copy the lesson commands into a terminal on your computer.";
  }

  function setOnline(openUrl) {
    const el = btn();
    if (!el) return;
    el.classList.remove("is-off");
    el.setAttribute("aria-disabled", "false");
    el.href = openUrl;
    el.target = "sdt-console";
    el.rel = "noopener";
    el.title = "Opens the Python console on the lab host (HTTPS).";
  }

  async function probe(base) {
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
      if (!res.ok) return false;
      const data = await res.json();
      return !!(data && data.connected);
    } catch (err) {
      clearTimeout(timer);
      return false;
    }
  }

  function tick() {
    probe(HTTPS).then(function (okHttps) {
      if (okHttps) {
        setOnline(HTTPS + "/console");
        return;
      }
      probe(HTTP).then(function (okHttp) {
        if (okHttp) setOnline(HTTPS + "/console");
        else setOffline();
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (!btn()) return;
    setOffline();
    tick();
    setInterval(tick, 10000);
  });
})();

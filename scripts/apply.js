/**
 * MODELS Lab application form client.
 *
 * GitHub Pages cannot run an API or keep a secret. A Cloudflare Worker
 * would need a Cloudflare account; this lab does not use one.
 *
 * Production (modelslab.org): FormSubmit emails rmcgehee@iastate.edu with
 * the PDF attachments. No extra account. Combined files must be ≤ 10MB
 * (FormSubmit's free limit).
 *
 * Local GitHub filing: in ryanpmcg/MODELS-Lab-Applications run
 * `python api/server.py` with GITHUB_TOKEN from `gh auth token`. This
 * script posts JSON to http://127.0.0.1:8787/api/apply only when the page
 * itself is served from localhost.
 */
(function () {
  const MAX_EACH = 5 * 1024 * 1024;
  const MAX_TOTAL = 10 * 1024 * 1024;
  const FORMSUBMIT = "https://formsubmit.co/ajax/rmcgehee@iastate.edu";
  const LOCAL_API = "http://127.0.0.1:8787/api/apply";

  function $(id) {
    return document.getElementById(id);
  }

  function isLocalHost() {
    const host = window.location.hostname;
    return host === "localhost" || host === "127.0.0.1";
  }

  function validatePdf(file, label, maxBytes) {
    if (!file) return label + " is required.";
    if (!file.name.toLowerCase().endsWith(".pdf")) return "Only PDF files are allowed.";
    if (file.size > maxBytes) return label + " must be ≤ 5MB.";
    return "";
  }

  function fileToBase64(file) {
    return new Promise(function (resolve, reject) {
      const reader = new FileReader();
      reader.onload = function () {
        const result = String(reader.result || "");
        const comma = result.indexOf(",");
        resolve(comma >= 0 ? result.slice(comma + 1) : result);
      };
      reader.onerror = function () {
        reject(new Error("Could not read " + file.name));
      };
      reader.readAsDataURL(file);
    });
  }

  function collectFiles(form) {
    const files = [form.cv.files[0], form.ts.files[0], form.soi.files[0]];
    for (let i = 0; i < form.other.files.length; i += 1) files.push(form.other.files[i]);
    return files.filter(Boolean);
  }

  function totalSizeError(form) {
    const files = collectFiles(form);
    let total = 0;
    for (let i = 0; i < files.length; i += 1) total += files[i].size;
    if (total > MAX_TOTAL) {
      return "Combined PDFs must be ≤ 10MB so they can be emailed. Compress and retry.";
    }
    return "";
  }

  async function submitToLocalApi(form, courses) {
    const otherFiles = [];
    for (let i = 0; i < form.other.files.length; i += 1) otherFiles.push(form.other.files[i]);
    const payload = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      message: form.message.value.trim(),
      courses: courses,
      honeypot: form.website ? form.website.value : "",
      files: {
        cv: {
          filename: form.cv.files[0].name,
          content_base64: await fileToBase64(form.cv.files[0]),
        },
        ts: {
          filename: form.ts.files[0].name,
          content_base64: await fileToBase64(form.ts.files[0]),
        },
        soi: {
          filename: form.soi.files[0].name,
          content_base64: await fileToBase64(form.soi.files[0]),
        },
        other: await Promise.all(
          otherFiles.map(async function (file) {
            return { filename: file.name, content_base64: await fileToBase64(file) };
          })
        ),
      },
    };
    const res = await fetch(LOCAL_API, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    const type = (res.headers.get("content-type") || "").toLowerCase();
    const json = type.indexOf("application/json") >= 0 ? await res.json() : null;
    if (json && json.ok) return { ok: true };
    throw new Error((json && json.error) || "Local apply API is not running.");
  }

  async function submitToFormSubmit(form, courses) {
    const data = new FormData(form);
    data.delete("website");
    data.append("_subject", "MODELS Lab application: " + (form.name.value || "").trim());
    data.append("_template", "table");
    data.append("_captcha", "false");
    data.append("_honey", form.website ? form.website.value : "");
    data.append("coursework", courses.join(", "));
    const res = await fetch(FORMSUBMIT, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });
    const json = await res.json().catch(function () {
      return null;
    });
    if (json && json.success) return { ok: true, message: json.message };
    if (json && /confirm/i.test(String(json.message || ""))) {
      return {
        ok: true,
        message:
          "First-time setup: check rmcgehee@iastate.edu and confirm FormSubmit, then submit again.",
      };
    }
    throw new Error((json && json.message) || "Error sending application.");
  }

  document.addEventListener("DOMContentLoaded", function () {
    const form = $("applyForm");
    if (!form) return;
    const status = $("status");
    const submitBtn = $("submitBtn");
    const coursesError = $("coursesError");

    function bindFile(input, errorEl, label) {
      input.addEventListener("change", function () {
        errorEl.textContent = input.files[0] ? validatePdf(input.files[0], label, MAX_EACH) : "";
      });
    }

    bindFile(form.cv, $("cvError"), "CV");
    bindFile(form.ts, $("tsError"), "Transcript");
    bindFile(form.soi, $("soiError"), "Statement of Interest");
    form.other.addEventListener("change", function () {
      let err = "";
      for (let i = 0; i < form.other.files.length; i += 1) {
        err = validatePdf(form.other.files[i], "Other document", MAX_EACH);
        if (err) break;
      }
      $("otherError").textContent = err;
    });

    form.addEventListener("submit", async function (event) {
      event.preventDefault();
      $("cvError").textContent = validatePdf(form.cv.files[0], "CV", MAX_EACH);
      $("tsError").textContent = validatePdf(form.ts.files[0], "Transcript", MAX_EACH);
      $("soiError").textContent = validatePdf(form.soi.files[0], "Statement of Interest", MAX_EACH);
      const checked = form.querySelectorAll('input[name="courses"]:checked');
      coursesError.textContent = checked.length ? "" : "Select at least one coursework item.";
      const combined = totalSizeError(form);
      if (combined) $("otherError").textContent = combined;
      if (
        $("cvError").textContent ||
        $("tsError").textContent ||
        $("soiError").textContent ||
        $("otherError").textContent ||
        coursesError.textContent
      ) {
        return;
      }

      submitBtn.disabled = true;
      status.style.color = "";
      status.textContent = "Sending…";

      const courses = [];
      checked.forEach(function (box) {
        courses.push(box.value);
      });

      try {
        if (isLocalHost()) {
          await submitToLocalApi(form, courses);
          status.textContent = "Application filed in the private GitHub intake repo.";
        } else {
          const sent = await submitToFormSubmit(form, courses);
          status.textContent = sent.message || "Application sent. Thank you.";
        }
        form.reset();
      } catch (err) {
        status.style.color = "red";
        status.textContent = err.message || "Network error.";
      }
      submitBtn.disabled = false;
    });
  });
})();

/**
 * Browser client for the MODELS Lab application form.
 * Copied to isu-models.github.io/scripts/apply.js on deploy.
 */
(function () {
  const MAX_EACH = 5 * 1024 * 1024;
  const FORMSUBMIT = "https://formsubmit.co/ajax/rmcgehee@iastate.edu";
  const APPLY_API = "/api/apply";

  function $(id) {
    return document.getElementById(id);
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

  async function postJson(url, payload) {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    const type = (res.headers.get("content-type") || "").toLowerCase();
    const json = type.indexOf("application/json") >= 0 ? await res.json() : null;
    return { res: res, json: json, type: type };
  }

  async function submitToApi(payload) {
    const result = await postJson(APPLY_API, payload);
    if (result.json && result.json.ok) return { ok: true };
    const err = new Error((result.json && result.json.error) || "not-json");
    err.status = result.res.status;
    err.fallback =
      !result.json || [404, 405, 502, 503].indexOf(result.res.status) >= 0;
    throw err;
  }

  async function submitToFormSubmit(form) {
    const data = new FormData(form);
    data.delete("website");
    data.append("_subject", "MODELS Lab application: " + (form.name.value || "").trim());
    data.append("_template", "table");
    data.append("_captcha", "false");
    data.append("_honey", form.website ? form.website.value : "");
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
      let total = 0;
      let err = "";
      for (let i = 0; i < form.other.files.length; i += 1) {
        err = validatePdf(form.other.files[i], "Other document", MAX_EACH);
        if (err) break;
        total += form.other.files[i].size;
      }
      if (!err && total > MAX_EACH) err = "Other documents total must be ≤ 5MB.";
      $("otherError").textContent = err;
    });

    form.addEventListener("submit", async function (event) {
      event.preventDefault();
      $("cvError").textContent = validatePdf(form.cv.files[0], "CV", MAX_EACH);
      $("tsError").textContent = validatePdf(form.ts.files[0], "Transcript", MAX_EACH);
      $("soiError").textContent = validatePdf(form.soi.files[0], "Statement of Interest", MAX_EACH);
      const checked = form.querySelectorAll('input[name="courses"]:checked');
      coursesError.textContent = checked.length ? "" : "Select at least one coursework item.";
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
      const otherFiles = [];
      for (let i = 0; i < form.other.files.length; i += 1) otherFiles.push(form.other.files[i]);

      try {
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

        try {
          await submitToApi(payload);
          status.textContent = "Application received. Thank you.";
          form.reset();
        } catch (apiErr) {
          if (apiErr.fallback === false) throw apiErr;
          const fallback = await submitToFormSubmit(form);
          status.textContent = fallback.message || "Application sent. Thank you.";
          form.reset();
        }
      } catch (err) {
        status.style.color = "red";
        status.textContent = err.message || "Network error.";
      }
      submitBtn.disabled = false;
    });
  });
})();

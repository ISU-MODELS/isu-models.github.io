/**
 * MODELS Lab application form client.
 *
 * GitHub Pages cannot run an API or keep a secret. A Cloudflare Worker
 * would need a Cloudflare account; this lab does not use one.
 *
 * Production (modelslab.org): the browser posts the form to FormSubmit,
 * which delivers the message and PDF attachments to rmcgehee@iastate.edu
 * in Outlook. No account and no monthly fee. Combined files must be ≤ 10MB
 * (FormSubmit's free limit). Reply-To is the applicant's email.
 *
 * Local GitHub filing: in ryanpmcg/MODELS-Lab-Applications run
 * `python api/server.py` with GITHUB_TOKEN from `gh auth token`. This
 * script posts JSON to http://127.0.0.1:8787/api/apply only when the page
 * itself is served from localhost.
 */
(function () {
  const MAX_EACH = 5 * 1024 * 1024;
  const MAX_TOTAL = 10 * 1024 * 1024;
  const LOCAL_API = "http://127.0.0.1:8787/api/apply";

  function $(id) {
    return document.getElementById(id);
  }

  const CODE_HOST_ERROR =
    "Code samples must be links on GitHub, GitLab, Bitbucket, Codeberg, SourceHut, or Azure DevOps.";

  function codeHostOk(hostname) {
    let host = String(hostname || "").toLowerCase().replace(/\.$/, "");
    if (host.indexOf("www.") === 0) host = host.slice(4);
    if (host === "github.io" || host.endsWith(".github.io")) return false;
    if (host === "github.com" || host.endsWith(".github.com")) return true;
    if (host === "githubusercontent.com" || host.endsWith(".githubusercontent.com")) return true;
    const exact = [
      "gitlab.com",
      "bitbucket.org",
      "codeberg.org",
      "sr.ht",
      "git.sr.ht",
      "dev.azure.com",
      "sourceforge.net",
    ];
    if (exact.indexOf(host) >= 0) return true;
    return host.endsWith(".visualstudio.com");
  }

  function parseCodeSamples(text) {
    const parts = String(text || "")
      .split(/\s+/)
      .map(function (part) { return part.trim(); })
      .filter(Boolean);
    if (!parts.length) return { ok: true, links: [] };
    if (parts.length > 10) return { ok: false, error: "Provide at most 10 code sample links." };
    const links = [];
    for (let i = 0; i < parts.length; i += 1) {
      let raw = parts[i];
      if (!/^[a-z][a-z0-9+.-]*:\/\//i.test(raw)) raw = "https://" + raw;
      let url;
      try {
        url = new URL(raw);
      } catch (err) {
        return { ok: false, error: CODE_HOST_ERROR };
      }
      if (url.protocol !== "https:" && url.protocol !== "http:") {
        return { ok: false, error: CODE_HOST_ERROR };
      }
      if (!codeHostOk(url.hostname)) return { ok: false, error: CODE_HOST_ERROR };
      links.push(url.toString());
    }
    return { ok: true, links: links };
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

  async function submitToLocalApi(form, courses, codeSamples) {
    const otherFiles = [];
    for (let i = 0; i < form.other.files.length; i += 1) otherFiles.push(form.other.files[i]);
    const payload = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      message: form.message.value.trim(),
      courses: courses,
      code_samples: codeSamples,
      honeypot: form.elements["_honey"] ? form.elements["_honey"].value : "",
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

  function prepareOutlookDelivery(form, courses) {
    var subject = form.elements["_subject"];
    var coursework = form.elements["coursework"];
    var reply = form.elements["_replyto"];
    if (subject) subject.value = "MODELS Lab application: " + form.name.value.trim();
    if (coursework) coursework.value = courses.join(", ");
    if (!reply) {
      reply = document.createElement("input");
      reply.type = "hidden";
      reply.name = "_replyto";
      form.appendChild(reply);
    }
    reply.value = form.email.value.trim();
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
      $("cvError").textContent = validatePdf(form.cv.files[0], "CV", MAX_EACH);
      $("tsError").textContent = validatePdf(form.ts.files[0], "Transcript", MAX_EACH);
      $("soiError").textContent = validatePdf(form.soi.files[0], "Statement of Interest", MAX_EACH);
      const checked = form.querySelectorAll("input.course-box:checked");
      coursesError.textContent = checked.length ? "" : "Select at least one coursework item.";
      const combined = totalSizeError(form);
      if (combined) $("otherError").textContent = combined;
      const codeField = $("codeSamples");
      const codeParsed = parseCodeSamples(codeField ? codeField.value : "");
      $("codeError").textContent = codeParsed.ok ? "" : codeParsed.error;
      if (
        $("cvError").textContent ||
        $("tsError").textContent ||
        $("soiError").textContent ||
        $("otherError").textContent ||
        coursesError.textContent ||
        $("codeError").textContent
      ) {
        event.preventDefault();
        status.style.color = "red";
        status.textContent = "Application was not submitted.";
        return;
      }
      status.style.color = "";
      status.textContent = "";
      if (codeField) codeField.value = codeParsed.links.join("\n");

      const courses = [];
      checked.forEach(function (box) {
        courses.push(box.value);
      });

      if (isLocalHost()) {
        event.preventDefault();
        submitBtn.disabled = true;
        status.style.color = "";
        status.textContent = "Sending…";
        try {
          await submitToLocalApi(form, courses, codeParsed.links);
          status.textContent = "Application filed in the private GitHub intake repo.";
          form.reset();
        } catch (err) {
          status.style.color = "red";
          status.textContent = err.message || "Network error.";
        }
        submitBtn.disabled = false;
        return;
      }

      prepareOutlookDelivery(form, courses);
      status.style.color = "";
      status.textContent = "Sending to rmcgehee@iastate.edu…";
    });
  });
})();

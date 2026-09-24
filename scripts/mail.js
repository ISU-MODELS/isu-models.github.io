/**
 * Contact form. GitHub Pages cannot send mail itself.
 * The form posts to FormSubmit, which delivers to rmcgehee@iastate.edu
 * (Outlook) with Reply-To set from the email field. No account and no
 * monthly fee. The same endpoint is used by the application form.
 */
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var notice = document.getElementById("sentNotice");
    if (notice && new URLSearchParams(window.location.search).get("sent") === "1") {
      notice.hidden = false;
      notice.scrollIntoView({ block: "center" });
    }

    var form = document.getElementById("contactForm");
    if (!form) return;
    form.addEventListener("submit", function () {
      var subject = form.querySelector('[name="subject"]');
      var target = form.querySelector('[name="_subject"]');
      var reply = form.querySelector('[name="_replyto"]');
      var text = subject && subject.value ? subject.value.trim() : "";
      if (target) target.value = text ? "MODELS Lab: " + text : "MODELS Lab message";
      if (!reply) {
        reply = document.createElement("input");
        reply.type = "hidden";
        reply.name = "_replyto";
        form.appendChild(reply);
      }
      reply.value = form.email.value.trim();
    });
  });
})();

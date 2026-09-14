(function () {
    function slugify(text, used) {
        const base = String(text || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "section";
        let id = base;
        let n = 2;
        while (used.has(id)) {
            id = base + "-" + n;
            n += 1;
        }
        used.add(id);
        return id;
    }

    function addLink(parent, header) {
        const a = document.createElement("a");
        a.textContent = header.textContent;
        a.href = "#" + header.id;
        a.addEventListener("click", function (e) {
            e.preventDefault();
            header.scrollIntoView({ behavior: "smooth", block: "start" });
            history.replaceState(null, "", "#" + header.id);
        });
        parent.appendChild(a);
        return a;
    }

    document.addEventListener("DOMContentLoaded", function () {
        const tocList = document.getElementById("toc-list");
        const main = document.querySelector("main.tutorial");
        if (!tocList || !main) return;

        tocList.innerHTML = "";
        const used = new Set();
        const headers = main.querySelectorAll("h2, h3");
        let subList = null;

        if (!headers.length) {
            main.querySelectorAll(".grid-list a").forEach(function (src) {
                const li = document.createElement("li");
                li.className = "h2";
                const a = document.createElement("a");
                a.href = src.getAttribute("href");
                a.textContent = src.textContent;
                li.appendChild(a);
                tocList.appendChild(li);
            });
            return;
        }

        headers.forEach(function (header) {
            if (!header.id) header.id = slugify(header.textContent, used);
            else used.add(header.id);
            if (header.tagName === "H2") {
                const wrap = document.createElement("li");
                wrap.className = "h2";
                addLink(wrap, header);
                subList = document.createElement("ul");
                wrap.appendChild(subList);
                tocList.appendChild(wrap);
                return;
            }
            const li = document.createElement("li");
            li.className = "h3";
            addLink(li, header);
            if (subList) subList.appendChild(li);
            else tocList.appendChild(li);
        });
    });
})();

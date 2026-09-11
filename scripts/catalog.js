(function () {
  function unique(values) {
    return Array.from(new Set(values.filter(Boolean))).sort(function (a, b) {
      return String(a).localeCompare(String(b), undefined, { numeric: true });
    });
  }

  function fillSelect(select, values, allLabel) {
    select.innerHTML = "";
    const all = document.createElement("option");
    all.value = "";
    all.textContent = allLabel;
    select.appendChild(all);
    values.forEach(function (value) {
      const opt = document.createElement("option");
      opt.value = value;
      opt.textContent = value;
      select.appendChild(opt);
    });
  }

  function matches(item, q) {
    if (!q) return true;
    const blob = [
      item.title,
      (item.authors || []).join(" "),
      item.journal,
      item.type,
      (item.topics || []).join(" "),
      (item.projects || []).join(" "),
      item.note || ""
    ].join(" ").toLowerCase();
    return blob.indexOf(q) !== -1;
  }

  function hasTag(list, value) {
    if (!value) return true;
    return (list || []).indexOf(value) !== -1;
  }

  function card(item) {
    const el = document.createElement("article");
    el.className = "catalog-card";
    const authors = (item.authors || []).join(", ");
    const tags = []
      .concat(item.type ? [item.type] : [])
      .concat(item.topics || [])
      .concat(item.projects || []);
    const tagHtml = tags
      .map(function (t) {
        return "<span>" + t + "</span>";
      })
      .join("");
    const link = item.url
      ? '<a href="' + item.url + '" rel="noopener noreferrer" target="_blank">Open source</a>'
      : "";
    const note = item.note ? '<p class="catalog-note">' + item.note + "</p>" : "";
    el.innerHTML =
      "<h3>" +
      item.title +
      "</h3>" +
      '<p class="meta">' +
      [item.year, item.journal, item.type].filter(Boolean).join(" · ") +
      "</p>" +
      '<p class="authors">' +
      authors +
      "</p>" +
      '<div class="catalog-tags">' +
      tagHtml +
      "</div>" +
      link +
      note;
    return el;
  }

  function bind(root) {
    const src = root.getAttribute("data-src");
    const kind = root.getAttribute("data-kind") || "item";
    const list = root.querySelector(".catalog-list");
    const count = root.querySelector(".catalog-count");
    const search = root.querySelector("[data-filter=search]");
    const filters = {
      journal: root.querySelector("[data-filter=journal]"),
      topic: root.querySelector("[data-filter=topic]"),
      year: root.querySelector("[data-filter=year]"),
      type: root.querySelector("[data-filter=type]"),
      project: root.querySelector("[data-filter=project]"),
      author: root.querySelector("[data-filter=author]")
    };
    const clearBtn = root.querySelector("[data-action=clear]");

    fetch(src)
      .then(function (res) {
        if (!res.ok) throw new Error("catalog missing");
        return res.json();
      })
      .then(function (items) {
        items.sort(function (a, b) {
          return (b.year || 0) - (a.year || 0) || a.title.localeCompare(b.title);
        });
        fillSelect(filters.journal, unique(items.map(function (i) { return i.journal; })), "All journals");
        fillSelect(filters.topic, unique(items.flatMap(function (i) { return i.topics || []; })), "All topics");
        fillSelect(filters.year, unique(items.map(function (i) { return String(i.year); })).reverse(), "All years");
        fillSelect(filters.type, unique(items.map(function (i) { return i.type; })), "All types");
        fillSelect(filters.project, unique(items.flatMap(function (i) { return i.projects || []; })), "All projects");
        fillSelect(filters.author, unique(items.flatMap(function (i) { return i.authors || []; })), "All authors");

        function render() {
          const q = (search.value || "").trim().toLowerCase();
          const shown = items.filter(function (item) {
            return (
              matches(item, q) &&
              (!filters.journal.value || item.journal === filters.journal.value) &&
              hasTag(item.topics, filters.topic.value) &&
              (!filters.year.value || String(item.year) === filters.year.value) &&
              (!filters.type.value || item.type === filters.type.value) &&
              hasTag(item.projects, filters.project.value) &&
              (!filters.author.value || (item.authors || []).indexOf(filters.author.value) !== -1)
            );
          });
          list.innerHTML = "";
          if (!shown.length) {
            const empty = document.createElement("p");
            empty.className = "catalog-empty";
            empty.textContent = "No " + kind + "s match those filters.";
            list.appendChild(empty);
          } else {
            shown.forEach(function (item) {
              list.appendChild(card(item));
            });
          }
          count.textContent = shown.length + " of " + items.length + " " + kind + (items.length === 1 ? "" : "s");
        }

        [search, filters.journal, filters.topic, filters.year, filters.type, filters.project, filters.author].forEach(function (el) {
          el.addEventListener("input", render);
          el.addEventListener("change", render);
        });
        if (clearBtn) {
          clearBtn.addEventListener("click", function () {
            search.value = "";
            Object.keys(filters).forEach(function (key) {
              filters[key].value = "";
            });
            render();
          });
        }
        render();
      })
      .catch(function () {
        count.textContent = "Catalog could not be loaded.";
      });
  }

  document.querySelectorAll(".catalog-viewport[data-src]").forEach(bind);
})();

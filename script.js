const translations = {
  uk: {
    subtitle: "Каталог і статус проєктів",
    status: "Статус",
    all: "Усі",
    works: "Працює",
    works_but_abandoned: "Працює, але закинутий",
    under_review: "Перевіряється",
    broken: "Не працює",
    archived: "Архів",
    creator: "Автор",
    checked: "Перевірено",
    pros: "Плюси",
    cons: "Мінуси",
    empty: "Нічого не знайдено",
    emptyHint: "Спробуй інший статус."
  },
  ru: {
    subtitle: "Каталог и статус проектов",
    status: "Статус",
    all: "Все",
    works: "Работает",
    works_but_abandoned: "Работает, но заброшен",
    under_review: "Проверяется",
    broken: "Не работает",
    archived: "Архив",
    creator: "Автор",
    checked: "Проверено",
    pros: "Плюсы",
    cons: "Минусы",
    empty: "Ничего не найдено",
    emptyHint: "Попробуй другой статус."
  },
  en: {
    subtitle: "Catalog & status tracker",
    status: "Status",
    all: "All",
    works: "Works",
    works_but_abandoned: "Works, but abandoned",
    under_review: "Under review",
    broken: "Broken",
    archived: "Archived",
    creator: "Creator",
    checked: "Checked",
    pros: "Pros",
    cons: "Cons",
    empty: "No entries found",
    emptyHint: "Try another status."
  }
};

const statusOrder = ["all", "works", "works_but_abandoned", "under_review", "broken", "archived"];

const mods = [
  {
    id: "josh-rivals-modded",
    title: "Josh's RIVALS MODDED",
    status: "works_but_abandoned",
    placeUrl: "https://www.roblox.com/share?code=aca6d5852921d14d803ef0da00774ded&type=ExperienceDetails&stamp=1792819304207",
    creator: "Ixspan7039",
    creatorUrl: "https://www.roblox.com/users/10797552845/profile",
    checked: "2026-10-24",
    description: "Одна з версій моддед RIVALS з моддед-шопом. Запускається без проблем, але давно не оновлювався.",
    pros: [
      "Запускається без проблем",
      "Є моддед-шоп",
      "Стандартні звуки ходьби, стрибків і кліків з оригіналу"
    ],
    cons: [
      "Стара версія моду",
      "Повністю платна адмін-панель",
      "Сміттєві адмін-гармати та скіни за робукси",
      "Немає ранкед-шопу та інспектів",
      "Закрито багато контенту: скіни ранкед-шопу, кейс-скіни, арч-скіни, кристал-скіни, секретні предмети"
    ],
    tags: ["modded", "rivals", "roblox", "abandoned", "shop"]
  }
];

let currentLang = "uk";

const brandSubtitle = document.getElementById("brandSubtitle");
const statusLabel = document.getElementById("statusLabel");
const statusFilter = document.getElementById("statusFilter");
const modList = document.getElementById("modList");
const langButtons = document.querySelectorAll(".lang-btn");

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function t(key) {
  return (translations[currentLang] && translations[currentLang][key]) || key;
}

function rebuildStatusFilter() {
  const prev = statusFilter.value || "all";
  statusFilter.innerHTML = statusOrder
    .map(v => `<option value="${v}">${esc(t(v))}</option>`)
    .join("");
  statusFilter.value = prev;
}

function renderMods() {
  const selected = statusFilter.value || "all";
  const visible = mods.filter(m => selected === "all" || m.status === selected);

  if (visible.length === 0) {
    modList.innerHTML = `
      <div class="empty">
        <h3>${esc(t("empty"))}</h3>
        <p>${esc(t("emptyHint"))}</p>
      </div>
    `;
    return;
  }

  modList.innerHTML = visible.map(m => {
    const pros = m.pros.map(p => `<li>${esc(p)}</li>`).join("");
    const cons = m.cons.map(c => `<li>${esc(c)}</li>`).join("");
    const tags = (m.tags || []).map(tag => `<span class="tag">${esc(tag)}</span>`).join("");

    return `
      <article class="card">
        <div class="card-head">
          <h3 class="card-title">
            <a href="${esc(m.placeUrl)}" target="_blank" rel="noopener noreferrer">${esc(m.title)}</a>
          </h3>
          <span class="badge badge-${esc(m.status)}">${esc(t(m.status))}</span>
        </div>
        <div class="card-meta">
          <span>${esc(t("creator"))}: <a class="creator" href="${esc(m.creatorUrl)}" target="_blank" rel="noopener noreferrer">${esc(m.creator)}</a></span>
          <span>${esc(t("checked"))}: ${esc(m.checked)}</span>
        </div>
        <p class="card-desc">${esc(m.description)}</p>
        <div class="tags">${tags}</div>
        <div class="lists">
          <div class="list-box">
            <h4>${esc(t("pros"))}</h4>
            <ul>${pros}</ul>
          </div>
          <div class="list-box">
            <h4>${esc(t("cons"))}</h4>
            <ul>${cons}</ul>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function applyLang() {
  brandSubtitle.textContent = t("subtitle");
  statusLabel.textContent = t("status");
  rebuildStatusFilter();
  langButtons.forEach(b => b.classList.toggle("active", b.dataset.lang === currentLang));
  renderMods();
}

langButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    currentLang = btn.dataset.lang;
    applyLang();
  });
});

statusFilter.addEventListener("change", renderMods);

applyLang();
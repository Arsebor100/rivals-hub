const translations = {
  uk: {
    subtitle: "Каталог і статус проєктів",
    statusLabel: "Статус",
    all: "Усі",
    works: "Працює",
    works_but_abandoned: "Працює, але заброшений",
    under_review: "Перевіряється",
    broken: "Зламаний",
    archived: "Архів"
  },
  ru: {
    subtitle: "Каталог и статус проектов",
    statusLabel: "Статус",
    all: "Все",
    works: "Работает",
    works_but_abandoned: "Работает, но заброшен",
    under_review: "Проверяется",
    broken: "Сломан",
    archived: "Архив"
  },
  en: {
    subtitle: "Catalog & status tracker",
    statusLabel: "Status",
    all: "All",
    works: "Works",
    works_but_abandoned: "Works, but abandoned",
    under_review: "Under review",
    broken: "Broken",
    archived: "Archived"
  }
};

const statusOrder = [
  { value: "all", labelKey: "all" },
  { value: "works_but_abandoned", labelKey: "works_but_abandoned" },
  { value: "works", labelKey: "works" },
  { value: "under_review", labelKey: "under_review" },
  { value: "broken", labelKey: "broken" },
  { value: "archived", labelKey: "archived" }
];

const mod = {
  id: 1,
  title: "Josh's RIVALS MODDED",
  creator: "Ixspan7039",
  creatorProfileUrl: "https://www.roblox.com/users/10797552845/profile",
  placeUrl: "https://www.roblox.com/share?code=aca6d5852921d14d803ef0da00774ded&type=ExperienceDetails&stamp=1792819304207",
  status: "works_but_abandoned",
  description:
    "Одна з версій моддед RIVALS, де присутній моддед-шоп. Запускається без проблем, але давно не оновлювався.",
  pros: [
    "Запускається без проблем",
    "Є моддед-шоп",
    "Є стандартні звуки ходьби, стрибків і кліків по інтерфейсу з оригіналу"
  ],
  cons: [
    "Стара версія мода",
    "Повністю платна адмін-панель",
    "Сміттєві адмін-гармати та сміттєві скіни за робукси",
    "Немає ранкед-шопа та інспектів",
    "Закритий контент: немає скінів ранкед-шопа, кейс-скінів, арх-скінів, кристал-скінів та секретних предметів"
  ],
  tags: ["modded", "rivals", "roblox", "abandoned", "shop"],
  lastChecked: "2026-10-24"
};

const statusFilter = document.getElementById("statusFilter");
const modList = document.getElementById("modList");
const statusLabel = document.getElementById("statusLabel");
const brandTitle = document.querySelector(".brand-title");
const brandSubtitle = document.querySelector(".brand-subtitle");
const langButtons = document.querySelectorAll(".lang-btn");

let currentLang = "uk";

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function translateStatus(value) {
  return translations[currentLang][value] || value;
}

function updateLangUI() {
  const t = translations[currentLang];
  brandSubtitle.textContent = t.subtitle;
  statusLabel.textContent = t.statusLabel;

  statusFilter.innerHTML = statusOrder
    .map((opt) => `<option value="${opt.value}">${t[opt.labelKey]}</option>`)
    .join("");

  statusFilter.value = "all";

  langButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === currentLang);
  });

  renderMods();
}

function getStatusClass(status) {
  return `status-${status}`;
}

function renderMods() {
  const selectedStatus = statusFilter.value;
  const visible = selectedStatus === "all" || mod.status === selectedStatus;

  modList.innerHTML = "";

  if (!visible) {
    modList.innerHTML = `
      <div class="empty-state">
        <h3>No entries found</h3>
        <p>Try another status.</p>
      </div>
    `;
    return;
  }

  const prosList = mod.pros
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("");

  const consList = mod.cons
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("");

  const tags = mod.tags
    .map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`)
    .join("");

  const statusText = translateStatus(mod.status);

  modList.innerHTML = `
    <article class="mod-card">
      <div class="card-head">
        <h3 class="card-title">
          <a href="${escapeHtml(mod.placeUrl)}" target="_blank" rel="noreferrer noopener">${escapeHtml(mod.title)}</a>
        </h3>
        <span class="status-badge ${getStatusClass(mod.status)}">${statusText}</span>
      </div>

      <div class="card-meta">
        <span>
          <a href="${escapeHtml(mod.creatorProfileUrl || "#")}" target="_blank" rel="noreferrer noopener" class="creator-link">
            Creator: ${escapeHtml(mod.creator)}
          </a>
        </span>
        <span>Checked: ${escapeHtml(mod.lastChecked || "Unknown")}</span>
      </div>

      <p class="card-description">${escapeHtml(mod.description)}</p>

      <div class="tags">${tags}</div>

      <div class="data-grid">
        <div class="list-box">
          <h4>Pros</h4>
          <ul>${prosList}</ul>
        </div>

        <div class="list-box">
          <h4>Cons</h4>
          <ul>${consList}</ul>
        </div>
      </div>
    </article>
  `;
}

langButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentLang = button.dataset.lang;
    updateLangUI();
  });
});

statusFilter.addEventListener("change", renderMods);
updateLangUI();

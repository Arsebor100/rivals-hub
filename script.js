const initialMods = [
  {
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
    lastChecked: "2026-10-24",
    verified: true
  }
];

const statusLabels = {
  all: "All",
  works: "Works",
  works_but_abandoned: "Works, but abandoned",
  under_review: "Under review",
  broken: "Broken",
  archived: "Archived"
};

const statusFilter = document.getElementById("statusFilter");
const modList = document.getElementById("modList");

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getStatusClass(status) {
  return `status-${status}`;
}

function renderMods() {
  const selectedStatus = statusFilter.value;
  const visibleMods = initialMods.filter((mod) => {
    return selectedStatus === "all" || mod.status === selectedStatus;
  });

  modList.innerHTML = "";

  if (!visibleMods.length) {
    modList.innerHTML = `
      <div class="empty-state">
        <h3>No entries found</h3>
        <p>Try another status.</p>
      </div>
    `;
    return;
  }

  visibleMods.forEach((mod) => {
    const prosList = (mod.pros || [])
      .map((item) => `<li>${escapeHtml(item)}</li>`)
      .join("");

    const consList = (mod.cons || [])
      .map((item) => `<li>${escapeHtml(item)}</li>`)
      .join("");

    const tags = (mod.tags || [])
      .map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`)
      .join("");

    const card = `
      <article class="mod-card">
        <div class="card-head">
          <h3 class="card-title">
            <a href="${escapeHtml(mod.placeUrl)}" target="_blank" rel="noreferrer noopener">${escapeHtml(mod.title)}</a>
          </h3>
          <span class="status-badge ${getStatusClass(mod.status)}">${statusLabels[mod.status]}</span>
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

    modList.insertAdjacentHTML("beforeend", card);
  });
}

statusFilter.addEventListener("change", renderMods);
renderMods();

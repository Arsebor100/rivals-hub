const initialMods = [
  {
    id: 1,
    title: "Josh's RIVALS MODDED",
    creator: "Ixspan7039",
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
  },
  {
    id: 2,
    title: "Rivals Community Test Build",
    creator: "ExampleCreator",
    placeUrl: "https://www.roblox.com",
    status: "under_review",
    description:
      "Example project draft for testing the catalog layout. Replace this with a real Rivals-related build when you are ready.",
    pros: ["Quick test entry", "Good for UI validation"],
    cons: ["Placeholder only", "Needs real verification"],
    tags: ["example", "test", "community"],
    lastChecked: "2026-10-24",
    verified: false
  },
  {
    id: 3,
    title: "Legacy Rivals Archive",
    creator: "ArchiveTeam",
    placeUrl: "https://www.roblox.com",
    status: "archived",
    description:
      "Old archived community build used for comparisons and legacy testing. Not recommended for active gameplay.",
    pros: ["Useful for history", "Can be compared with newer builds"],
    cons: ["Outdated", "Unstable on newer versions"],
    tags: ["archive", "legacy", "old"],
    lastChecked: "2026-10-24",
    verified: true
  }
];

const statusLabels = {
  works: "Works",
  works_but_abandoned: "Works, but abandoned",
  under_review: "Under review",
  broken: "Broken",
  archived: "Archived"
};

let mods = [...initialMods];

const modList = document.getElementById("modList");
const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");
const modForm = document.getElementById("modForm");

function getStatusClass(status) {
  return `status-${status}`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderMods() {
  const searchText = searchInput.value.trim().toLowerCase();
  const selectedStatus = statusFilter.value;

  const visibleMods = mods.filter((mod) => {
    const matchesStatus = selectedStatus === "all" || mod.status === selectedStatus;
    const haystack = [
      mod.title,
      mod.creator,
      mod.description,
      ...(mod.tags || []),
      statusLabels[mod.status]
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch = !searchText || haystack.includes(searchText);
    return matchesStatus && matchesSearch;
  });

  modList.innerHTML = "";

  if (!visibleMods.length) {
    modList.innerHTML = `
      <div class="empty-state">
        <h3>No entries found</h3>
        <p>Try another search or add a new Rivals project.</p>
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
          <h3 class="card-title">${escapeHtml(mod.title)}</h3>
          <span class="status-badge ${getStatusClass(mod.status)}">${statusLabels[mod.status]}</span>
        </div>

        <div class="card-meta">
          <span>Creator: ${escapeHtml(mod.creator)}</span>
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

        <div class="card-actions">
          <a class="link-button" href="${escapeHtml(mod.placeUrl)}" target="_blank" rel="noreferrer noopener">
            Open place
          </a>
        </div>
      </article>
    `;

    modList.insertAdjacentHTML("beforeend", card);
  });
}

function updateStats() {
  const total = mods.length;
  const working = mods.filter((mod) => mod.status === "works").length;
  const review = mods.filter((mod) => mod.status === "under_review").length;
  const archived = mods.filter((mod) => mod.status === "archived").length;

  document.getElementById("stat-projects").textContent = total;
  document.getElementById("stat-working").textContent = working;
  document.getElementById("stat-review").textContent = review;
  document.getElementById("stat-archived").textContent = archived;
}

searchInput.addEventListener("input", renderMods);
statusFilter.addEventListener("change", renderMods);

modForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(modForm);
  const title = String(formData.get("title") || "").trim();
  const creator = String(formData.get("creator") || "").trim();
  const placeUrl = String(formData.get("placeUrl") || "").trim();
  const status = String(formData.get("status") || "under_review");
  const description = String(formData.get("description") || "").trim();

  const pros = String(formData.get("pros") || "")
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);

  const cons = String(formData.get("cons") || "")
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (!title || !creator || !placeUrl || !description) {
    return;
  }

  mods.unshift({
    id: Date.now(),
    title,
    creator,
    placeUrl,
    status,
    description,
    pros,
    cons,
    tags: ["submitted", "community"],
    lastChecked: new Date().toISOString().slice(0, 10),
    verified: false
  });

  modForm.reset();
  updateStats();
  renderMods();
});

updateStats();
renderMods();

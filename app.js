const STORAGE_KEY = "home-menu-state-v1";

const mealTypes = [
  { id: "breakfast", label: "Завтрак" },
  { id: "lunch", label: "Обед" },
  { id: "dinner", label: "Ужин" },
];

const dayNames = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
const dayShort = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

const defaultState = {
  currentWeekStart: getWeekStart(new Date()).toISOString(),
  activeFilter: "Все",
  activeMemberId: "member-family",
  dishSearch: "",
  importText: "",
  pantry: ["яйца", "мука", "лук"],
  profiles: [
    { id: "member-family", name: "Семья", likes: ["любимое", "домашнее"], avoids: [] },
    { id: "member-kids", name: "Дети", likes: ["дети любят", "быстро"], avoids: ["рыба"] },
    { id: "member-adults", name: "Взрослые", likes: ["легкое", "овощи"], avoids: [] },
  ],
  slotSearch: "",
  shoppingDone: [],
  dishes: [
    {
      id: "dish-chicken-soup",
      name: "Куриный суп",
      category: "Суп",
      tags: ["дети любят", "на два дня", "шаббат"],
      ingredients: ["курица", "морковь", "картофель", "лук", "лапша"],
      note: "Хорошо готовить большой кастрюлей.",
      lastCooked: "",
      wanted: true,
      wantedBy: ["member-family"],
    },
    {
      id: "dish-syrniki",
      name: "Сырники",
      category: "Завтрак",
      tags: ["быстро", "молочное", "любимое"],
      ingredients: ["творог", "яйца", "мука", "сметана"],
      note: "Можно сделать вечером и утром разогреть.",
      lastCooked: "",
      wanted: false,
    },
    {
      id: "dish-salmon",
      name: "Лосось с овощами",
      category: "Основное",
      tags: ["рыба", "быстро", "легкое"],
      ingredients: ["лосось", "лимон", "кабачок", "помидоры"],
      note: "Запечь на одном противне.",
      lastCooked: "",
      wanted: false,
    },
    {
      id: "dish-pizza",
      name: "Домашняя пицца",
      category: "Основное",
      tags: ["дети любят", "пятница", "любимое"],
      ingredients: ["тесто", "томатный соус", "сыр", "оливки"],
      note: "Подходит для вечера без сложной готовки.",
      lastCooked: "",
      wanted: true,
      wantedBy: ["member-kids"],
    },
    {
      id: "dish-cutlets",
      name: "Котлеты с пюре",
      category: "Основное",
      tags: ["мясное", "домашнее", "сытное"],
      ingredients: ["фарш", "картофель", "лук", "огурцы"],
      note: "Сразу сделать запас на завтра.",
      lastCooked: "",
      wanted: false,
    },
    {
      id: "dish-pancakes",
      name: "Блины",
      category: "Завтрак",
      tags: ["любимое", "молочное", "выходной"],
      ingredients: ["молоко", "яйца", "мука", "масло"],
      note: "Хорошо с творогом или вареньем.",
      lastCooked: "",
      wanted: true,
      wantedBy: ["member-family", "member-kids"],
    },
    {
      id: "dish-salad",
      name: "Салат с огурцом и помидором",
      category: "Салат",
      tags: ["овощи", "быстро", "каждый день"],
      ingredients: ["огурцы", "помидоры", "зелень", "оливковое масло"],
      note: "Добавлять к мясным блюдам.",
      lastCooked: "",
      wanted: false,
    },
    {
      id: "dish-nuggets",
      name: "Наггетсы",
      category: "Основное",
      tags: ["дети любят", "быстро"],
      ingredients: ["куриное филе", "панировка", "картофель фри"],
      note: "Лучше планировать с овощами.",
      lastCooked: "",
      wanted: false,
    },
  ],
  plans: {},
};

let state = loadState();
let activeView = "week";
let importCandidates = [];
let pendingSlot = null;
let tesseractModule = null;
let toastTimer = null;

const els = {
  weekTitle: document.querySelector("#weekTitle"),
  weekRange: document.querySelector("#weekRange"),
  weekGrid: document.querySelector("#weekGrid"),
  weekInsights: document.querySelector("#weekInsights"),
  dishList: document.querySelector("#dishList"),
  dishFilters: document.querySelector("#dishFilters"),
  dishSearch: document.querySelector("#dishSearch"),
  backupPanel: document.querySelector("#backupPanel"),
  familyPanel: document.querySelector("#familyPanel"),
  importDialog: document.querySelector("#importDialog"),
  importForm: document.querySelector("#importForm"),
  importText: document.querySelector("#importText"),
  importCandidates: document.querySelector("#importCandidates"),
  ocrFileInput: document.querySelector("#ocrFileInput"),
  ocrLanguage: document.querySelector("#ocrLanguage"),
  ocrStatus: document.querySelector("#ocrStatus"),
  pantryPanel: document.querySelector("#pantryPanel"),
  wishBoard: document.querySelector("#wishBoard"),
  shoppingSummary: document.querySelector("#shoppingSummary"),
  shoppingList: document.querySelector("#shoppingList"),
  dishDialog: document.querySelector("#dishDialog"),
  dishForm: document.querySelector("#dishForm"),
  dishDialogTitle: document.querySelector("#dishDialogTitle"),
  slotDialog: document.querySelector("#slotDialog"),
  slotForm: document.querySelector("#slotForm"),
  slotDialogContext: document.querySelector("#slotDialogContext"),
  slotSearch: document.querySelector("#slotSearch"),
  quickPicks: document.querySelector("#quickPicks"),
  slotDishList: document.querySelector("#slotDishList"),
  toast: document.querySelector("#toast"),
};

document.querySelectorAll(".nav-item").forEach((button) => {
  button.addEventListener("click", () => setView(button.dataset.view));
});

document.querySelectorAll('dialog [value="cancel"]').forEach((button) => {
  button.addEventListener("click", () => button.closest("dialog").close());
});

document.querySelector("#previousWeekButton").addEventListener("click", () => shiftWeek(-7));
document.querySelector("#nextWeekButton").addEventListener("click", () => shiftWeek(7));
document.querySelector("#openDishFormButton").addEventListener("click", () => openDishForm());
document.querySelector("#openImportButton").addEventListener("click", openImportDialog);
document.querySelector("#autoPlanButton").addEventListener("click", autoPlanWeek);
document.querySelector("#copyShoppingButton").addEventListener("click", copyShoppingList);
document.querySelector("#resetDemoButton").addEventListener("click", resetDemo);

els.dishSearch.addEventListener("input", (event) => {
  state.dishSearch = event.target.value;
  saveState();
  renderDishes();
});

els.slotSearch.addEventListener("input", (event) => {
  state.slotSearch = event.target.value;
  renderSlotDishList();
});

els.dishForm.addEventListener("submit", (event) => {
  event.preventDefault();
  saveDishFromForm();
});

document.querySelector("#parseImportButton").addEventListener("click", () => {
  importCandidates = parseImportCandidates(els.importText.value);
  renderImportCandidates();
});

document.querySelector("#runOcrButton").addEventListener("click", runOcrImport);

els.importForm.addEventListener("submit", (event) => {
  event.preventDefault();
  saveImportedDishes();
});

els.slotForm.addEventListener("submit", (event) => {
  event.preventDefault();
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js").catch(() => {
    // The prototype still works without offline caching.
  });
}

render();

function render() {
  els.dishSearch.value = state.dishSearch;
  renderWeek();
  renderDishes();
  renderFamilyPanel();
  renderWishes();
  renderShopping();
}

function setView(view) {
  activeView = view;
  document.querySelectorAll(".view").forEach((section) => {
    section.classList.toggle("is-active", section.id === `view-${view}`);
  });
  document.querySelectorAll(".nav-item").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.view === view);
  });
}

function renderWeek() {
  const weekStart = new Date(state.currentWeekStart);
  const weekEnd = addDays(weekStart, 6);
  els.weekTitle.textContent = isCurrentWeek(weekStart) ? "Эта неделя" : "Неделя";
  els.weekRange.textContent = `${formatDate(weekStart)} - ${formatDate(weekEnd)}`;

  const plannedDishIds = getWeekPlanEntries(weekStart)
    .map((entry) => entry.dishId)
    .filter(Boolean);
  const uniquePlanned = new Set(plannedDishIds);
  const wantedPlanned = state.dishes.filter((dish) => hasWishes(dish) && uniquePlanned.has(dish.id)).length;
  const wantedTotal = state.dishes.filter(hasWishes).length;
  const emptySlots = 7 * mealTypes.length - plannedDishIds.length;

  els.weekInsights.innerHTML = [
    insight(plannedDishIds.length, "приемов пищи запланировано"),
    insight(wantedTotal ? `${wantedPlanned}/${wantedTotal}` : "0", "желаний уже в меню"),
    insight(emptySlots, "свободных слотов осталось"),
  ].join("");

  els.weekGrid.innerHTML = dayNames
    .map((dayName, dayIndex) => {
      const date = addDays(weekStart, dayIndex);
      const dateKey = toDateKey(date);
      const slots = mealTypes
        .map((meal) => {
          const dishId = state.plans[dateKey]?.[meal.id];
          const dish = findDish(dishId);
          return `
            <div class="meal-slot">
              <div class="slot-label">${meal.label}</div>
              <div class="slot-content">
                ${
                  dish
                    ? `<div class="planned-dish">
                        <strong>${escapeHtml(dish.name)}</strong>
                        <span>${dish.category} · ${formatTags(dish.tags)}</span>
                      </div>`
                    : `<div class="empty-slot">Пока пусто</div>`
                }
                <div class="slot-actions">
                  <button class="mini-button" type="button" data-slot-add="${dateKey}:${meal.id}" aria-label="Выбрать блюдо">＋</button>
                  ${
                    dish
                      ? `<button class="mini-button is-danger" type="button" data-slot-clear="${dateKey}:${meal.id}" aria-label="Очистить">×</button>`
                      : ""
                  }
                </div>
              </div>
            </div>
          `;
        })
        .join("");

      return `
        <article class="day-panel">
          <div class="day-header">
            <div>
              <h3>${dayName}</h3>
              <p>${formatDate(date)}</p>
            </div>
            <button class="mini-button" type="button" data-day-auto="${dateKey}">Подобрать</button>
          </div>
          <div class="meal-slots">${slots}</div>
        </article>
      `;
    })
    .join("");

  els.weekGrid.querySelectorAll("[data-slot-add]").forEach((button) => {
    button.addEventListener("click", () => openSlotPicker(button.dataset.slotAdd));
  });
  els.weekGrid.querySelectorAll("[data-slot-clear]").forEach((button) => {
    button.addEventListener("click", () => clearSlot(button.dataset.slotClear));
  });
  els.weekGrid.querySelectorAll("[data-day-auto]").forEach((button) => {
    button.addEventListener("click", () => autoPlanDay(button.dataset.dayAuto));
  });
}

function renderDishes() {
  renderDishFilters();
  const dishes = getFilteredDishes();

  els.dishList.innerHTML = dishes.length
    ? dishes.map(renderDishCard).join("")
    : `<div class="empty-state">Нет блюд под этот фильтр. Добавьте новое блюдо или измените поиск.</div>`;

  els.dishList.querySelectorAll("[data-edit-dish]").forEach((button) => {
    button.addEventListener("click", () => openDishForm(button.dataset.editDish));
  });
  els.dishList.querySelectorAll("[data-want-dish]").forEach((button) => {
    button.addEventListener("click", () => toggleWanted(button.dataset.wantDish));
  });
  els.dishList.querySelectorAll("[data-plan-dish]").forEach((button) => {
    button.addEventListener("click", () => planDishSoon(button.dataset.planDish));
  });
}

function renderDishFilters() {
  const activeMember = getActiveMember();
  const filters = [
    "Все",
    "Желания",
    `${activeMember.name} хочет`,
    "Давно не ели",
    ...new Set(state.dishes.map((dish) => dish.category)),
  ];
  els.dishFilters.innerHTML = filters
    .map(
      (filter) => `
        <button class="chip ${state.activeFilter === filter ? "is-active" : ""}" type="button" data-filter="${escapeHtml(filter)}">
          ${escapeHtml(filter)}
        </button>
      `,
    )
    .join("");

  els.dishFilters.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeFilter = button.dataset.filter;
      saveState();
      renderDishes();
    });
  });
}

function renderDishCard(dish) {
  const daysAgo = getDaysAgo(dish.lastCooked);
  const cookedLabel = daysAgo === null ? "еще не готовили" : daysAgo === 0 ? "готовили сегодня" : `${daysAgo} дн. назад`;
  const wantedBy = getWantedBy(dish);
  const activeWants = wantedBy.includes(state.activeMemberId);
  const wantedLabel = wantedBy.length ? `Хотят: ${formatProfileNames(wantedBy)}` : "Пока никто не выбрал";
  const conflicts = getProfileConflicts(dish);
  const matches = getProfileMatches(dish);
  const compatibilityLabel = conflicts.length
    ? `Не подходит для ${getActiveMember().name}: ${conflicts.join(", ")}`
    : matches.length
      ? `${getActiveMember().name} любит: ${matches.join(", ")}`
      : `Без ограничений для ${getActiveMember().name}`;
  return `
    <article class="dish-card">
      <div class="dish-main">
        <div class="dish-art" aria-hidden="true">${dish.name.slice(0, 1).toUpperCase()}</div>
        <div class="dish-meta">
          <h3>${escapeHtml(dish.name)}</h3>
          <p class="dish-note">${escapeHtml(dish.category)} · ${cookedLabel}</p>
          <p class="dish-note">${escapeHtml(wantedLabel)}</p>
          <p class="dish-note ${conflicts.length ? "warn-line" : "ok-line"}">${escapeHtml(compatibilityLabel)}</p>
          <p class="dish-ingredients">${escapeHtml(dish.ingredients.join(", "))}</p>
          <div class="dish-tags">${dish.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div>
        </div>
      </div>
      <div class="dish-actions">
        <button type="button" data-plan-dish="${dish.id}">В меню</button>
        <button class="${activeWants ? "is-selected" : ""}" type="button" data-want-dish="${dish.id}">${activeWants ? "Выбрано" : "Хочу"}</button>
        <button type="button" data-edit-dish="${dish.id}">Править</button>
      </div>
    </article>
  `;
}

function renderFamilyPanel() {
  const activeProfile = getActiveMember();
  els.familyPanel.innerHTML = `
    <section class="manage-panel">
      <div class="panel-heading">
        <div>
          <p class="eyebrow">Кто выбирает</p>
          <h3>Семья</h3>
        </div>
        <span class="panel-count">${state.profiles.length}</span>
      </div>
      <div class="member-list">
        ${state.profiles
          .map(
            (profile) => `
              <button class="member-pill ${profile.id === state.activeMemberId ? "is-active" : ""}" type="button" data-member-select="${profile.id}">
                ${escapeHtml(profile.name)}
              </button>
            `,
          )
          .join("")}
      </div>
      <form class="inline-form" id="memberForm">
        <input id="memberName" type="text" placeholder="Имя" autocomplete="off" />
        <button class="secondary-button" type="submit">Добавить</button>
      </form>
      <div class="member-actions">
        ${state.profiles
          .filter((profile) => profile.id !== "member-family")
          .map(
            (profile) => `
              <button class="text-button" type="button" data-member-remove="${profile.id}">
                Убрать ${escapeHtml(profile.name)}
              </button>
            `,
          )
          .join("")}
      </div>
      <form class="preference-form" id="profilePrefsForm">
        <label class="field">
          ${escapeHtml(activeProfile.name)} любит
          <input id="profileLikes" type="text" value="${escapeHtml(activeProfile.likes.join(", "))}" placeholder="дети любят, быстро, овощи" />
        </label>
        <label class="field">
          Нельзя / не любит
          <input id="profileAvoids" type="text" value="${escapeHtml(activeProfile.avoids.join(", "))}" placeholder="рыба, молочное, острое" />
        </label>
        <button class="secondary-button full-width" type="submit">Сохранить предпочтения</button>
      </form>
    </section>
  `;

  els.familyPanel.querySelectorAll("[data-member-select]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeMemberId = button.dataset.memberSelect;
      state.activeFilter = "Все";
      saveState();
      render();
    });
  });

  els.familyPanel.querySelectorAll("[data-member-remove]").forEach((button) => {
    button.addEventListener("click", () => removeProfile(button.dataset.memberRemove));
  });

  els.familyPanel.querySelector("#memberForm").addEventListener("submit", (event) => {
    event.preventDefault();
    addProfile(els.familyPanel.querySelector("#memberName").value);
  });

  els.familyPanel.querySelector("#profilePrefsForm").addEventListener("submit", (event) => {
    event.preventDefault();
    saveProfilePreferences();
  });
}

function renderWishes() {
  const wished = [...state.dishes]
    .filter((dish) => hasWishes(dish) || isLongAgo(dish.lastCooked))
    .sort(sortRecommended);

  els.wishBoard.innerHTML = wished.length
    ? wished
        .map((dish) => {
          const wantedBy = getWantedBy(dish);
          const reason = wantedBy.length ? `Хотят: ${formatProfileNames(wantedBy)}` : "Давно не было в меню";
          return `
            <article class="wish-card wish-card-stacked">
              <div>
                <h3>${escapeHtml(dish.name)}</h3>
                <p>${reason} · ${formatTags(dish.tags)}</p>
              </div>
              <div class="person-toggles">
                ${state.profiles
                  .map(
                    (profile) => `
                      <button class="toggle-pill ${wantedBy.includes(profile.id) ? "is-active" : ""}" type="button" data-wish-person="${dish.id}:${profile.id}">
                        ${escapeHtml(profile.name)}
                      </button>
                    `,
                  )
                  .join("")}
              </div>
              <button class="secondary-button full-width" type="button" data-plan-dish="${dish.id}">В меню</button>
            </article>
          `;
        })
        .join("")
    : `<div class="empty-state">Пока нет желаний. Отметьте блюда кнопкой “Хочу”.</div>`;

  els.wishBoard.querySelectorAll("[data-plan-dish]").forEach((button) => {
    button.addEventListener("click", () => planDishSoon(button.dataset.planDish));
  });
  els.wishBoard.querySelectorAll("[data-wish-person]").forEach((button) => {
    button.addEventListener("click", () => {
      const [dishId, profileId] = button.dataset.wishPerson.split(":");
      toggleWanted(dishId, profileId);
    });
  });
}

function renderShopping() {
  renderPantryPanel();
  renderBackupPanel();
  const groups = buildShoppingGroups();
  const totalItems = groups.reduce((count, group) => count + group.items.length, 0);
  const pantryCount = groups.reduce((count, group) => count + group.items.filter((item) => item.inPantry).length, 0);
  const toBuyItems = groups.flatMap((group) => group.items).filter((item) => !item.inPantry);
  const doneCount = groups.reduce(
    (count, group) => count + group.items.filter((item) => !item.inPantry && state.shoppingDone.includes(item.key)).length,
    0,
  );

  els.shoppingSummary.innerHTML = `
    <p><strong>${toBuyItems.length}</strong> купить · <strong>${pantryCount}</strong> уже дома · <strong>${doneCount}</strong> отмечено.</p>
  `;

  els.shoppingList.innerHTML = groups.length
    ? groups
        .map(
          (group) => `
            <section class="shopping-group">
              <h3>${escapeHtml(group.name)}</h3>
              ${group.items.map(renderShoppingItem).join("")}
            </section>
          `,
        )
        .join("")
    : `<div class="empty-state">Добавьте блюда в неделю, и список покупок появится автоматически.</div>`;

  els.shoppingList.querySelectorAll("[data-toggle-shopping]").forEach((button) => {
    button.addEventListener("click", () => toggleShoppingDone(button.dataset.toggleShopping));
  });
  els.shoppingList.querySelectorAll("[data-add-pantry]").forEach((button) => {
    button.addEventListener("click", () => addPantryItems(button.dataset.addPantry));
  });
  els.shoppingList.querySelectorAll("[data-remove-pantry]").forEach((button) => {
    button.addEventListener("click", () => removePantryItem(button.dataset.removePantry));
  });
}

function renderShoppingItem(item) {
  const isDone = state.shoppingDone.includes(item.key);
  const statusClass = item.inPantry ? "is-stocked" : isDone ? "is-done" : "";
  return `
    <div class="shopping-item ${statusClass}">
      <div>
        <strong class="shopping-name">${escapeHtml(item.name)}</strong>
        <span class="shopping-source">${escapeHtml([...item.sources].join(", "))}${item.inPantry ? " · есть дома" : ""}</span>
      </div>
      <div class="shopping-buttons">
        ${
          item.inPantry
            ? `<button class="mini-button" type="button" data-remove-pantry="${escapeHtml(item.key)}">↺</button>`
            : `<button class="mini-button" type="button" data-add-pantry="${escapeHtml(item.name)}">Дома</button>
               <button class="mini-button" type="button" data-toggle-shopping="${escapeHtml(item.key)}">${isDone ? "↺" : "✓"}</button>`
        }
      </div>
    </div>
  `;
}

function renderPantryPanel() {
  els.pantryPanel.innerHTML = `
    <section class="manage-panel pantry-panel">
      <div class="panel-heading">
        <div>
          <p class="eyebrow">Не покупать лишнее</p>
          <h3>Запасы дома</h3>
        </div>
        <span class="panel-count">${state.pantry.length}</span>
      </div>
      <form class="inline-form" id="pantryForm">
        <input id="pantryInput" type="text" placeholder="молоко, рис, яйца" autocomplete="off" />
        <button class="secondary-button" type="submit">Добавить</button>
      </form>
      <div class="pantry-chips">
        ${
          state.pantry.length
            ? state.pantry
                .map(
                  (item) => `
                    <button class="pantry-chip" type="button" data-pantry-remove="${escapeHtml(normalize(item))}">
                      ${escapeHtml(item)} <span aria-hidden="true">×</span>
                    </button>
                  `,
                )
                .join("")
            : `<span class="muted-line">Список пуст</span>`
        }
      </div>
    </section>
  `;

  els.pantryPanel.querySelector("#pantryForm").addEventListener("submit", (event) => {
    event.preventDefault();
    addPantryItems(els.pantryPanel.querySelector("#pantryInput").value);
  });

  els.pantryPanel.querySelectorAll("[data-pantry-remove]").forEach((button) => {
    button.addEventListener("click", () => removePantryItem(button.dataset.pantryRemove));
  });
}

function renderBackupPanel() {
  els.backupPanel.innerHTML = `
    <section class="manage-panel">
      <div class="panel-heading">
        <div>
          <p class="eyebrow">Перенос между телефонами</p>
          <h3>Резервная копия</h3>
        </div>
        <span class="panel-count">${state.dishes.length}</span>
      </div>
      <div class="backup-actions">
        <button class="secondary-button" id="exportBackupButton" type="button">Скачать backup</button>
        <label class="secondary-button file-button">
          Загрузить backup
          <input id="backupFileInput" type="file" accept="application/json,.json" />
        </label>
      </div>
      <p class="muted-line">Это временная синхронизация без облака: файл можно отправить себе и загрузить на другом телефоне.</p>
    </section>
  `;

  els.backupPanel.querySelector("#exportBackupButton").addEventListener("click", exportBackup);
  els.backupPanel.querySelector("#backupFileInput").addEventListener("change", importBackup);
}

function openDishForm(dishId = "") {
  const dish = findDish(dishId);
  els.dishDialogTitle.textContent = dish ? "Редактировать блюдо" : "Добавить блюдо";
  document.querySelector("#dishId").value = dish?.id ?? "";
  document.querySelector("#dishName").value = dish?.name ?? "";
  document.querySelector("#dishCategory").value = dish?.category ?? "Основное";
  document.querySelector("#dishTags").value = dish?.tags.join(", ") ?? "";
  document.querySelector("#dishIngredients").value = dish?.ingredients.join(", ") ?? "";
  document.querySelector("#dishNote").value = dish?.note ?? "";
  els.dishDialog.showModal();
}

function saveDishFromForm() {
  const dishId = document.querySelector("#dishId").value || `dish-${Date.now()}`;
  const previous = findDish(dishId);
  const nextDish = {
    id: dishId,
    name: document.querySelector("#dishName").value.trim(),
    category: document.querySelector("#dishCategory").value,
    tags: parseList(document.querySelector("#dishTags").value),
    ingredients: parseList(document.querySelector("#dishIngredients").value),
    note: document.querySelector("#dishNote").value.trim(),
    lastCooked: previous?.lastCooked ?? "",
    wanted: previous?.wanted ?? false,
    wantedBy: previous ? getWantedBy(previous) : [],
  };

  if (!nextDish.name) return;

  state.dishes = previous
    ? state.dishes.map((dish) => (dish.id === dishId ? nextDish : dish))
    : [nextDish, ...state.dishes];

  saveState();
  els.dishDialog.close();
  showToast("Блюдо сохранено");
  render();
}

function openImportDialog() {
  els.importText.value = state.importText || "";
  importCandidates = parseImportCandidates(els.importText.value);
  renderImportCandidates();
  els.importDialog.showModal();
}

function renderImportCandidates() {
  els.importCandidates.innerHTML = importCandidates.length
    ? importCandidates
        .map(
          (candidate) => `
            <label class="import-candidate">
              <input type="checkbox" value="${escapeHtml(candidate)}" checked />
              <span>${escapeHtml(candidate)}</span>
            </label>
          `,
        )
        .join("")
    : `<div class="empty-state">Нет кандидатов</div>`;
}

function saveImportedDishes() {
  state.importText = els.importText.value;
  const selected = [...els.importCandidates.querySelectorAll("input:checked")].map((input) => input.value.trim()).filter(Boolean);
  const existing = new Set(state.dishes.map((dish) => normalize(dish.name)));
  const newDishes = selected
    .filter((name) => !existing.has(normalize(name)))
    .map((name) => ({
      id: `dish-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      name,
      category: document.querySelector("#importCategory").value,
      tags: ["импорт"],
      ingredients: [],
      note: "Добавлено из списка.",
      lastCooked: "",
      wanted: false,
      wantedBy: [],
    }));

  if (!newDishes.length) {
    showToast("Новых блюд нет");
    return;
  }

  state.dishes = [...newDishes, ...state.dishes];
  saveState();
  els.importDialog.close();
  showToast(`Добавлено блюд: ${newDishes.length}`);
  render();
}

async function runOcrImport() {
  const files = [...els.ocrFileInput.files];
  if (!files.length) {
    showToast("Выберите фото");
    return;
  }

  const languages = els.ocrLanguage.value;
  els.ocrStatus.textContent = "Загружаю OCR...";
  document.querySelector("#runOcrButton").disabled = true;

  let worker;
  try {
    const tesseract = await loadTesseract();
    worker = await tesseract.createWorker(languages, 1, {
      logger: (message) => {
        if (!message?.status) return;
        const progress = Math.round((message.progress || 0) * 100);
        els.ocrStatus.textContent = `${message.status}${progress ? ` · ${progress}%` : ""}`;
      },
    });

    const texts = [];
    for (const file of files) {
      els.ocrStatus.textContent = `Распознаю: ${file.name}`;
      const {
        data: { text },
      } = await worker.recognize(file);
      texts.push(text);
    }

    const combined = [els.importText.value, texts.join("\n")].filter(Boolean).join("\n");
    els.importText.value = combined.trim();
    state.importText = els.importText.value;
    importCandidates = parseImportCandidates(els.importText.value);
    renderImportCandidates();
    els.ocrStatus.textContent = `Готово. Найдено кандидатов: ${importCandidates.length}. Проверьте текст перед добавлением.`;
  } catch (error) {
    els.ocrStatus.textContent = "OCR не сработал. Можно вставить текст вручную.";
    showToast("OCR не сработал");
  } finally {
    if (worker) await worker.terminate();
    document.querySelector("#runOcrButton").disabled = false;
  }
}

async function loadTesseract() {
  if (tesseractModule) return tesseractModule;
  const module = await import("https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.esm.min.js");
  tesseractModule = module.default || module;
  return tesseractModule;
}

function openSlotPicker(slotKey) {
  const [dateKey, mealId] = slotKey.split(":");
  pendingSlot = { dateKey, mealId };
  const date = parseDateKey(dateKey);
  const meal = mealTypes.find((item) => item.id === mealId);
  els.slotDialogContext.textContent = `${dayShort[date.getDay()]} · ${meal.label.toLowerCase()}`;
  state.slotSearch = "";
  els.slotSearch.value = "";
  renderQuickPicks();
  renderSlotDishList();
  els.slotDialog.showModal();
}

function renderQuickPicks() {
  const picks = [
    { label: "Желания", matcher: (dish) => hasWishes(dish) },
    { label: `${getActiveMember().name} хочет`, matcher: (dish) => getWantedBy(dish).includes(state.activeMemberId) },
    { label: "Давно не ели", matcher: (dish) => isLongAgo(dish.lastCooked) },
    { label: "Быстро", matcher: (dish) => dish.tags.includes("быстро") },
    { label: "Дети любят", matcher: (dish) => dish.tags.includes("дети любят") },
  ];

  els.quickPicks.innerHTML = picks
    .map((pick) => `<button class="chip" type="button" data-slot-filter="${pick.label}">${pick.label}</button>`)
    .join("");

  els.quickPicks.querySelectorAll("[data-slot-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      els.slotSearch.value = button.dataset.slotFilter;
      state.slotSearch = button.dataset.slotFilter;
      renderSlotDishList();
    });
  });
}

function renderSlotDishList() {
  const search = normalize(state.slotSearch);
  const dishes = [...state.dishes]
    .filter((dish) => {
      if (!search) return true;
      if (search === normalize("Желания")) return hasWishes(dish);
      if (search === normalize(`${getActiveMember().name} хочет`)) return getWantedBy(dish).includes(state.activeMemberId);
      if (search === normalize("Давно не ели")) return isLongAgo(dish.lastCooked);
      return getDishSearchText(dish).includes(search);
    })
    .sort(sortRecommended);

  els.slotDishList.innerHTML = dishes.length
    ? dishes
        .map(
          (dish) => {
            const conflicts = getProfileConflicts(dish);
            const matches = getProfileMatches(dish);
            const profileLine = conflicts.length
              ? `Не подходит: ${conflicts.join(", ")}`
              : matches.length
                ? `Подходит: ${matches.join(", ")}`
                : "Без ограничений";
            return `
              <button class="wish-card" type="button" data-choose-dish="${dish.id}">
                <div>
                  <h3>${escapeHtml(dish.name)}</h3>
                  <p>${escapeHtml(dish.category)} · ${formatTags(dish.tags)}</p>
                  <p class="${conflicts.length ? "warn-line" : "ok-line"}">${escapeHtml(profileLine)}</p>
                </div>
                <span class="mini-button" aria-hidden="true">＋</span>
              </button>
            `;
          },
        )
        .join("")
    : `<div class="empty-state">Такого блюда пока нет.</div>`;

  els.slotDishList.querySelectorAll("[data-choose-dish]").forEach((button) => {
    button.addEventListener("click", () => chooseDishForSlot(button.dataset.chooseDish));
  });
}

function chooseDishForSlot(dishId) {
  if (!pendingSlot) return;
  setSlot(pendingSlot.dateKey, pendingSlot.mealId, dishId);
  els.slotDialog.close();
}

function setSlot(dateKey, mealId, dishId) {
  state.plans[dateKey] = state.plans[dateKey] || {};
  state.plans[dateKey][mealId] = dishId;
  const dish = findDish(dishId);
  if (dish) {
    dish.lastCooked = dateKey;
    dish.wanted = false;
    dish.wantedBy = [];
  }
  saveState();
  showToast("Добавлено в меню");
  render();
}

function clearSlot(slotKey) {
  const [dateKey, mealId] = slotKey.split(":");
  if (state.plans[dateKey]) {
    delete state.plans[dateKey][mealId];
    if (!Object.keys(state.plans[dateKey]).length) delete state.plans[dateKey];
  }
  saveState();
  render();
}

function autoPlanDay(dateKey) {
  const usedThisWeek = new Set(getWeekPlanEntries(new Date(state.currentWeekStart)).map((entry) => entry.dishId));
  mealTypes.forEach((meal) => {
    if (state.plans[dateKey]?.[meal.id]) return;
    const dish = pickRecommendedDish(usedThisWeek, meal.id);
    if (!dish) return;
    usedThisWeek.add(dish.id);
    state.plans[dateKey] = state.plans[dateKey] || {};
    state.plans[dateKey][meal.id] = dish.id;
    dish.lastCooked = dateKey;
    dish.wanted = false;
    dish.wantedBy = [];
  });
  saveState();
  showToast("День заполнен");
  render();
}

function autoPlanWeek() {
  const weekStart = new Date(state.currentWeekStart);
  const usedThisWeek = new Set(getWeekPlanEntries(weekStart).map((entry) => entry.dishId));
  for (let dayIndex = 0; dayIndex < 7; dayIndex += 1) {
    const dateKey = toDateKey(addDays(weekStart, dayIndex));
    mealTypes.forEach((meal) => {
      if (state.plans[dateKey]?.[meal.id]) return;
      const dish = pickRecommendedDish(usedThisWeek, meal.id);
      if (!dish) return;
      usedThisWeek.add(dish.id);
      state.plans[dateKey] = state.plans[dateKey] || {};
      state.plans[dateKey][meal.id] = dish.id;
      dish.lastCooked = dateKey;
      dish.wanted = false;
      dish.wantedBy = [];
    });
  }
  saveState();
  showToast("Неделя заполнена");
  render();
  setView("week");
}

function pickRecommendedDish(usedThisWeek, mealId) {
  const preferredCategory = mealId === "breakfast" ? "Завтрак" : null;
  const candidates = [...state.dishes]
    .filter((dish) => !usedThisWeek.has(dish.id))
    .filter((dish) => (preferredCategory ? dish.category === preferredCategory : dish.category !== "Завтрак"));
  const compatible = candidates.filter((dish) => !getProfileConflicts(dish).length);
  return (compatible.length ? compatible : candidates).sort(sortRecommended)[0];
}

function planDishSoon(dishId) {
  const weekStart = new Date(state.currentWeekStart);
  for (let dayIndex = 0; dayIndex < 7; dayIndex += 1) {
    const dateKey = toDateKey(addDays(weekStart, dayIndex));
    for (const meal of mealTypes) {
      if (!state.plans[dateKey]?.[meal.id]) {
        setSlot(dateKey, meal.id, dishId);
        setView("week");
        return;
      }
    }
  }
  showToast("В неделе нет свободных слотов");
}

function toggleWanted(dishId, profileId = state.activeMemberId) {
  const dish = findDish(dishId);
  if (!dish) return;
  const wantedBy = getWantedBy(dish);
  dish.wantedBy = wantedBy.includes(profileId) ? wantedBy.filter((id) => id !== profileId) : [...wantedBy, profileId];
  dish.wanted = dish.wantedBy.length > 0;
  saveState();
  render();
}

function toggleShoppingDone(key) {
  state.shoppingDone = state.shoppingDone.includes(key)
    ? state.shoppingDone.filter((item) => item !== key)
    : [...state.shoppingDone, key];
  saveState();
  renderShopping();
}

async function copyShoppingList() {
  const groups = buildShoppingGroups();
  const text = groups
    .map((group) => {
      const items = group.items.filter((item) => !item.inPantry && !state.shoppingDone.includes(item.key));
      if (!items.length) return "";
      return `${group.name}\n${items.map((item) => `- ${item.name}`).join("\n")}`;
    })
    .filter(Boolean)
    .join("\n\n");

  if (!text) {
    showToast("Список пока пустой");
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    showToast("Список скопирован");
  } catch {
    showToast("Не получилось скопировать");
  }
}

function buildShoppingGroups() {
  const weekStart = new Date(state.currentWeekStart);
  const plannedDishes = getWeekPlanEntries(weekStart)
    .map((entry) => findDish(entry.dishId))
    .filter(Boolean);
  const ingredientMap = new Map();

  plannedDishes.forEach((dish) => {
    dish.ingredients.forEach((ingredient) => {
      const name = ingredient.trim();
      if (!name) return;
      const key = normalize(name);
      if (!ingredientMap.has(key)) {
        ingredientMap.set(key, {
          key,
          name,
          sources: new Set(),
          group: getIngredientGroup(name),
          inPantry: isInPantry(name),
        });
      }
      ingredientMap.get(key).sources.add(dish.name);
    });
  });

  const grouped = new Map();
  [...ingredientMap.values()].forEach((item) => {
    if (!grouped.has(item.group)) grouped.set(item.group, []);
    grouped.get(item.group).push(item);
  });

  return [...grouped.entries()].map(([name, items]) => ({
    name,
    items: items.sort((a, b) => a.name.localeCompare(b.name, "ru")),
  }));
}

function getIngredientGroup(name) {
  const text = normalize(name);
  const groups = [
    ["Овощи и фрукты", ["морковь", "картофель", "лук", "огур", "помид", "зелень", "кабач", "лимон", "оливки"]],
    ["Мясо и рыба", ["кур", "фарш", "лосось", "рыба"]],
    ["Молочное", ["сыр", "творог", "сметана", "молоко", "масло"]],
    ["Бакалея", ["мука", "лапша", "тесто", "соус", "панировка"]],
  ];
  return groups.find(([, words]) => words.some((word) => text.includes(word)))?.[0] ?? "Остальное";
}

function shiftWeek(days) {
  state.currentWeekStart = addDays(new Date(state.currentWeekStart), days).toISOString();
  saveState();
  render();
}

function getFilteredDishes() {
  const search = normalize(state.dishSearch);
  const activeMemberFilter = `${getActiveMember().name} хочет`;
  return [...state.dishes]
    .filter((dish) => {
      if (state.activeFilter === "Желания") return hasWishes(dish);
      if (state.activeFilter === activeMemberFilter) return getWantedBy(dish).includes(state.activeMemberId);
      if (state.activeFilter === "Давно не ели") return isLongAgo(dish.lastCooked);
      if (state.activeFilter !== "Все") return dish.category === state.activeFilter;
      return true;
    })
    .filter((dish) => !search || getDishSearchText(dish).includes(search))
    .sort(sortRecommended);
}

function sortRecommended(a, b) {
  const conflict = Number(getProfileConflicts(a).length > 0) - Number(getProfileConflicts(b).length > 0);
  if (conflict) return conflict;
  const activeWanted = Number(getWantedBy(b).includes(state.activeMemberId)) - Number(getWantedBy(a).includes(state.activeMemberId));
  if (activeWanted) return activeWanted;
  const wanted = Number(hasWishes(b)) - Number(hasWishes(a));
  if (wanted) return wanted;
  const profileMatches = getProfileMatches(b).length - getProfileMatches(a).length;
  if (profileMatches) return profileMatches;
  return (getDaysAgo(b.lastCooked) ?? 9999) - (getDaysAgo(a.lastCooked) ?? 9999);
}

function getWeekPlanEntries(weekStart) {
  const entries = [];
  for (let dayIndex = 0; dayIndex < 7; dayIndex += 1) {
    const dateKey = toDateKey(addDays(weekStart, dayIndex));
    mealTypes.forEach((meal) => {
      const dishId = state.plans[dateKey]?.[meal.id];
      if (dishId) entries.push({ dateKey, mealId: meal.id, dishId });
    });
  }
  return entries;
}

function getDishSearchText(dish) {
  return normalize([dish.name, dish.category, dish.tags.join(" "), dish.ingredients.join(" "), dish.note].join(" "));
}

function findDish(dishId) {
  return state.dishes.find((dish) => dish.id === dishId);
}

function getActiveMember() {
  return state.profiles.find((profile) => profile.id === state.activeMemberId) || state.profiles[0];
}

function getDishMatchText(dish) {
  return normalize([dish.name, dish.category, dish.tags.join(" "), dish.ingredients.join(" "), dish.note].join(" "));
}

function getProfileConflicts(dish, profile = getActiveMember()) {
  const text = getDishMatchText(dish);
  return profile.avoids.filter((term) => term && text.includes(normalize(term)));
}

function getProfileMatches(dish, profile = getActiveMember()) {
  const text = getDishMatchText(dish);
  return profile.likes.filter((term) => term && text.includes(normalize(term)));
}

function getWantedBy(dish) {
  if (Array.isArray(dish.wantedBy)) return dish.wantedBy.filter((profileId) => state.profiles.some((profile) => profile.id === profileId));
  return dish.wanted ? ["member-family"] : [];
}

function hasWishes(dish) {
  return getWantedBy(dish).length > 0;
}

function formatProfileNames(profileIds) {
  const names = profileIds
    .map((profileId) => state.profiles.find((profile) => profile.id === profileId)?.name)
    .filter(Boolean);
  return names.join(", ");
}

function addProfile(name) {
  const trimmed = name.trim();
  if (!trimmed) return;
  const exists = state.profiles.some((profile) => normalize(profile.name) === normalize(trimmed));
  if (exists) {
    showToast("Такой профиль уже есть");
    return;
  }
  const profile = { id: `member-${Date.now()}`, name: trimmed, likes: [], avoids: [] };
  state.profiles = [...state.profiles, profile];
  state.activeMemberId = profile.id;
  state.activeFilter = "Все";
  saveState();
  render();
}

function saveProfilePreferences() {
  const profileId = state.activeMemberId;
  const likes = parseList(els.familyPanel.querySelector("#profileLikes").value);
  const avoids = parseList(els.familyPanel.querySelector("#profileAvoids").value);
  state.profiles = state.profiles.map((profile) => (profile.id === profileId ? { ...profile, likes, avoids } : profile));
  saveState();
  showToast("Предпочтения сохранены");
  render();
}

function removeProfile(profileId) {
  if (profileId === "member-family") return;
  state.profiles = state.profiles.filter((profile) => profile.id !== profileId);
  state.dishes = state.dishes.map((dish) => {
    const wantedBy = getWantedBy(dish).filter((id) => id !== profileId);
    return { ...dish, wantedBy, wanted: wantedBy.length > 0 };
  });
  if (!state.profiles.some((profile) => profile.id === state.activeMemberId)) {
    state.activeMemberId = "member-family";
  }
  saveState();
  render();
}

function addPantryItems(value) {
  const nextItems = parseList(value);
  if (!nextItems.length) return;
  const existing = new Set(state.pantry.map(normalize));
  nextItems.forEach((item) => {
    if (!existing.has(normalize(item))) {
      state.pantry.push(item);
      existing.add(normalize(item));
    }
  });
  saveState();
  renderShopping();
}

function removePantryItem(key) {
  state.pantry = state.pantry.filter((item) => normalize(item) !== normalize(key));
  saveState();
  renderShopping();
}

function isInPantry(name) {
  const ingredient = normalize(name);
  return state.pantry.some((item) => {
    const pantryItem = normalize(item);
    return pantryItem === ingredient || ingredient.includes(pantryItem) || pantryItem.includes(ingredient);
  });
}

function parseList(value) {
  return value
    .split(/[,\n;]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseImportCandidates(value) {
  const stopWords = new Set([
    "что я люблю есть",
    "что мы любим есть",
    "что давно не ели",
    "что не ели давно",
    "מה אני אוהב/ת לאכול",
    "מה לא אכלנו מזמן ומתחשק לנו",
    "יום ראשון",
    "יום שני",
    "יום שלישי",
    "יום רביעי",
    "יום חמישי",
    "יום שישי",
    "שבת",
  ]);
  const seen = new Set();

  return value
    .split(/[\n;•]+/)
    .map((line) =>
      line
        .replace(/^[\s\d.)\-–—]+/, "")
        .replace(/\s+/g, " ")
        .trim(),
    )
    .filter((line) => line.length >= 2)
    .filter((line) => !line.includes("?"))
    .filter((line) => !stopWords.has(normalize(line)))
    .filter((line) => {
      const key = normalize(line);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 60);
}

function exportBackup() {
  const backup = {
    exportedAt: new Date().toISOString(),
    app: "home-menu",
    version: 3,
    state: normalizeState(structuredClone(state)),
  };
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `home-menu-backup-${toDateKey(new Date())}.json`;
  link.click();
  URL.revokeObjectURL(url);
  showToast("Backup скачан");
}

function importBackup(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(String(reader.result || ""));
      const incomingState = parsed.state || parsed;
      state = normalizeState({
        ...structuredClone(defaultState),
        ...incomingState,
        plans: incomingState.plans ?? {},
        dishes: incomingState.dishes?.length ? incomingState.dishes : structuredClone(defaultState.dishes),
      });
      saveState();
      render();
      showToast("Backup загружен");
    } catch {
      showToast("Не удалось прочитать backup");
    } finally {
      event.target.value = "";
    }
  };
  reader.readAsText(file);
}

function insight(value, label) {
  return `<div class="insight"><strong>${value}</strong><span>${label}</span></div>`;
}

function formatTags(tags) {
  return tags.slice(0, 3).join(", ") || "без тегов";
}

function getDaysAgo(dateKey) {
  if (!dateKey) return null;
  const now = stripTime(new Date());
  const date = parseDateKey(dateKey);
  return Math.round((now - date) / 86400000);
}

function isLongAgo(dateKey) {
  const days = getDaysAgo(dateKey);
  return days === null || days >= 14;
}

function isCurrentWeek(weekStart) {
  return toDateKey(weekStart) === toDateKey(getWeekStart(new Date()));
}

function getWeekStart(date) {
  const start = stripTime(date);
  start.setDate(start.getDate() - start.getDay());
  return start;
}

function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return stripTime(next);
}

function stripTime(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function toDateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function parseDateKey(dateKey) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function formatDate(date) {
  return new Intl.DateTimeFormat("ru", { day: "numeric", month: "short" }).format(date);
}

function normalize(value) {
  return String(value).trim().toLowerCase();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved) return normalizeState(structuredClone(defaultState));
    return normalizeState({
      ...structuredClone(defaultState),
      ...saved,
      dishes: saved.dishes?.length ? saved.dishes : structuredClone(defaultState.dishes),
      plans: saved.plans ?? {},
      profiles: saved.profiles?.length ? saved.profiles : structuredClone(defaultState.profiles),
      pantry: Array.isArray(saved.pantry) ? saved.pantry : structuredClone(defaultState.pantry),
      shoppingDone: saved.shoppingDone ?? [],
    });
  } catch {
    return normalizeState(structuredClone(defaultState));
  }
}

function normalizeState(nextState) {
  const profiles = nextState.profiles?.length ? nextState.profiles : structuredClone(defaultState.profiles);
  const hasFamily = profiles.some((profile) => profile.id === "member-family");
  nextState.profiles = (hasFamily ? profiles : [defaultState.profiles[0], ...profiles]).map(normalizeProfile);
  nextState.activeMemberId = nextState.profiles.some((profile) => profile.id === nextState.activeMemberId)
    ? nextState.activeMemberId
    : "member-family";
  nextState.pantry = Array.isArray(nextState.pantry) ? nextState.pantry : [];
  nextState.importText = nextState.importText || "";
  nextState.dishes = nextState.dishes.map(normalizeDish);
  return nextState;
}

function normalizeProfile(profile) {
  const fallback = defaultState.profiles.find((item) => item.id === profile.id);
  return {
    id: profile.id,
    name: profile.name || "Профиль",
    likes: Array.isArray(profile.likes) ? profile.likes : fallback?.likes || [],
    avoids: Array.isArray(profile.avoids) ? profile.avoids : fallback?.avoids || [],
  };
}

function normalizeDish(dish) {
  const wantedBy = Array.isArray(dish.wantedBy) ? dish.wantedBy : dish.wanted ? ["member-family"] : [];
  return {
    id: dish.id,
    name: dish.name,
    category: dish.category || "Основное",
    tags: Array.isArray(dish.tags) ? dish.tags : [],
    ingredients: Array.isArray(dish.ingredients) ? dish.ingredients : [],
    note: dish.note || "",
    lastCooked: dish.lastCooked || "",
    wanted: wantedBy.length > 0,
    wantedBy,
  };
}

function resetDemo() {
  state = structuredClone(defaultState);
  saveState();
  showToast("Демо-данные восстановлены");
  render();
}

function showToast(message) {
  clearTimeout(toastTimer);
  els.toast.textContent = message;
  els.toast.classList.add("is-visible");
  toastTimer = setTimeout(() => els.toast.classList.remove("is-visible"), 2200);
}

const STORAGE_KEY = "home-menu-state-v1";

const FILTER_ALL = "Все";
const FILTER_WISHES = "Желания";
const FILTER_MEMBER_WANTS = "__member_wants__";
const FILTER_LONG_AGO = "Давно не ели";

const SUPPORTED_LANGUAGES = ["ru", "he"];
const SUPABASE_MODULE_URL = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const translations = {
  ru: {
    app: {
      title: "Домашнее меню",
      eyebrow: "Семейный планировщик еды",
    },
    language: {
      label: "Язык",
    },
    actions: {
      add: "Добавить",
      close: "Закрыть",
      copy: "Скопировать",
      dish: "Блюдо",
      fillWeek: "Заполнить неделю",
      import: "Импорт",
      nextWeek: "Следующая неделя",
      previousWeek: "Предыдущая неделя",
      resetDemo: "Вернуть демо-данные",
      save: "Сохранить",
    },
    nav: {
      label: "Основная навигация",
      week: "Неделя",
      dishes: "Блюда",
      wishes: "Желания",
      shopping: "Покупки",
    },
    week: {
      current: "Эта неделя",
      regular: "Неделя",
      rangeFallback: "Воскресенье - суббота",
      planned: "приемов пищи запланировано",
      wishesInMenu: "желаний уже в меню",
      emptySlots: "свободных слотов осталось",
      emptySlot: "Пока пусто",
      chooseDish: "Выбрать блюдо",
      clear: "Очистить",
      autoPick: "Подобрать",
    },
    dishes: {
      eyebrow: "Банк домашних блюд",
      title: "Блюда",
      searchPlaceholder: "Поиск по названию, тегу или ингредиенту",
      empty: "Нет блюд под этот фильтр. Добавьте новое блюдо или измените поиск.",
      notCooked: "еще не готовили",
      cookedToday: "готовили сегодня",
      daysAgo: "{count} дн. назад",
      wantedBy: "Хотят: {names}",
      nobodyWants: "Пока никто не выбрал",
      conflictFor: "Не подходит для {name}: {items}",
      likesFor: "{name} любит: {items}",
      noLimitsFor: "Без ограничений для {name}",
      plan: "В меню",
      selected: "Выбрано",
      want: "Хочу",
      edit: "Править",
    },
    filters: {
      all: "Все",
      wishes: "Желания",
      memberWants: "{name} хочет",
      longAgo: "Давно не ели",
      quickFast: "Быстро",
      quickKids: "Дети любят",
    },
    wishes: {
      eyebrow: "Что хочется семье",
      title: "Желания",
      longReason: "Давно не было в меню",
      empty: "Пока нет желаний. Отметьте блюда кнопкой “Хочу”.",
    },
    shopping: {
      eyebrow: "Из меню недели",
      title: "Покупки",
      summary: "<strong>{toBuy}</strong> купить · <strong>{pantry}</strong> уже дома · <strong>{done}</strong> отмечено.",
      empty: "Добавьте блюда в неделю, и список покупок появится автоматически.",
      inPantry: "есть дома",
      home: "Дома",
      pantryEyebrow: "Не покупать лишнее",
      pantryTitle: "Запасы дома",
      pantryPlaceholder: "молоко, рис, яйца",
      emptyPantry: "Список пуст",
    },
    backup: {
      eyebrow: "Перенос между телефонами",
      title: "Резервная копия",
      export: "Скачать backup",
      import: "Загрузить backup",
      help: "Это временная синхронизация без облака: файл можно отправить себе и загрузить на другом телефоне.",
    },
    sync: {
      eyebrow: "Общее семейное меню",
      title: "Облачная синхронизация",
      disabled: "Не подключено",
      connected: "Подключено",
      signedIn: "Вход выполнен: {email}",
      notSignedIn: "Войдите по email, чтобы синхронизировать это устройство.",
      url: "Supabase URL",
      urlPlaceholder: "https://xxxx.supabase.co",
      anonKey: "Anon public key",
      anonKeyPlaceholder: "sb_publishable_...",
      email: "Семейный email",
      emailPlaceholder: "family@example.com",
      saveSettings: "Сохранить настройки",
      sendLink: "Отправить ссылку входа",
      push: "Сохранить в облако",
      pull: "Загрузить из облака",
      signOut: "Выйти",
      help: "Один семейный email можно открыть на нескольких телефонах. Данные защищаются Supabase Auth и RLS.",
      lastSync: "Последняя синхронизация: {time}",
      neverSynced: "Еще не синхронизировано",
      setupMissing: "Заполните Supabase URL, anon key и email.",
      settingsSaved: "Настройки синхронизации сохранены",
      linkSent: "Ссылка входа отправлена на email",
      loginRequired: "Сначала войдите по email",
      cloudSaved: "Сохранено в облако",
      cloudLoaded: "Загружено из облака",
      noCloudData: "В облаке пока нет данных",
      signedOut: "Вы вышли из облака",
      failed: "Синхронизация не сработала",
    },
    family: {
      eyebrow: "Кто выбирает",
      title: "Семья",
      namePlaceholder: "Имя",
      add: "Добавить",
      remove: "Убрать {name}",
      likes: "{name} любит",
      likesPlaceholder: "дети любят, быстро, овощи",
      avoids: "Нельзя / не любит",
      avoidsPlaceholder: "рыба, молочное, острое",
      savePrefs: "Сохранить предпочтения",
    },
    profile: {
      family: "Семья",
      kids: "Дети",
      adults: "Взрослые",
      fallback: "Профиль",
    },
    dishForm: {
      eyebrow: "Новая карточка",
      addTitle: "Добавить блюдо",
      editTitle: "Редактировать блюдо",
      name: "Название",
      namePlaceholder: "Например: куриный суп",
      category: "Категория",
      tags: "Теги через запятую",
      tagsPlaceholder: "быстро, дети любят, мясное",
      ingredients: "Ингредиенты через запятую",
      ingredientsPlaceholder: "курица, морковь, картофель",
      note: "Заметка",
      notePlaceholder: "Например: удобно готовить на два дня",
    },
    import: {
      eyebrow: "Быстрое наполнение",
      title: "Импорт блюд",
      text: "Текст из фото или списка",
      textPlaceholder: "суп\nкотлеты\nблины",
      category: "Категория для новых блюд",
      parse: "Разобрать",
      addSelected: "Добавить выбранные",
      empty: "Нет кандидатов",
    },
    ocr: {
      photo: "Фото списка",
      languages: "Языки OCR",
      langAll: "Русский + иврит + английский",
      langRu: "Русский + английский",
      langHe: "Иврит + английский",
      langEn: "Английский",
      run: "Распознать фото",
      statusIdle: "Фото распознается локально в браузере. После OCR проверьте текст вручную.",
      choosePhoto: "Выберите фото",
      loading: "Загружаю OCR...",
      recognizing: "Распознаю: {name}",
      done: "Готово. Найдено кандидатов: {count}. Проверьте текст перед добавлением.",
      failedStatus: "OCR не сработал. Можно вставить текст вручную.",
      failedToast: "OCR не сработал",
    },
    slot: {
      context: "Выбор блюда",
      title: "Что поставить?",
      searchPlaceholder: "Найти блюдо",
      conflict: "Не подходит: {items}",
      match: "Подходит: {items}",
      noLimits: "Без ограничений",
      empty: "Такого блюда пока нет.",
    },
    category: {
      main: "Основное",
      breakfast: "Завтрак",
      soup: "Суп",
      salad: "Салат",
      side: "Гарнир",
      snack: "Перекус",
      dessert: "Десерт",
    },
    meal: {
      breakfast: "Завтрак",
      lunch: "Обед",
      dinner: "Ужин",
    },
    days: {
      long: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
      short: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
    },
    groups: {
      vegetables: "Овощи и фрукты",
      meat: "Мясо и рыба",
      dairy: "Молочное",
      pantry: "Бакалея",
      other: "Остальное",
    },
    tags: {
      none: "без тегов",
      import: "импорт",
    },
    notes: {
      imported: "Добавлено из списка.",
    },
    toasts: {
      dishSaved: "Блюдо сохранено",
      noNewDishes: "Новых блюд нет",
      dishesAdded: "Добавлено блюд: {count}",
      addedToMenu: "Добавлено в меню",
      dayFilled: "День заполнен",
      weekFilled: "Неделя заполнена",
      noFreeSlots: "В неделе нет свободных слотов",
      emptyList: "Список пока пустой",
      listCopied: "Список скопирован",
      copyFailed: "Не получилось скопировать",
      profileExists: "Такой профиль уже есть",
      prefsSaved: "Предпочтения сохранены",
      backupExported: "Backup скачан",
      backupImported: "Backup загружен",
      backupFailed: "Не удалось прочитать backup",
      demoReset: "Демо-данные восстановлены",
    },
    demo: {
      resetHebrew: "Демо-блюда обновлены: есть русские и ивритские названия.",
    },
  },
  he: {
    app: {
      title: "תפריט ביתי",
      eyebrow: "מתכנן ארוחות משפחתי",
    },
    language: {
      label: "שפה",
    },
    actions: {
      add: "הוספה",
      close: "סגירה",
      copy: "העתקה",
      dish: "מנה",
      fillWeek: "למלא שבוע",
      import: "יבוא",
      nextWeek: "השבוע הבא",
      previousWeek: "השבוע הקודם",
      resetDemo: "איפוס נתוני הדגמה",
      save: "שמירה",
    },
    nav: {
      label: "ניווט ראשי",
      week: "שבוע",
      dishes: "מנות",
      wishes: "רצונות",
      shopping: "קניות",
    },
    week: {
      current: "השבוע",
      regular: "שבוע",
      rangeFallback: "ראשון - שבת",
      planned: "ארוחות מתוכננות",
      wishesInMenu: "רצונות כבר בתפריט",
      emptySlots: "מקומות פנויים נשארו",
      emptySlot: "עדיין ריק",
      chooseDish: "בחירת מנה",
      clear: "ניקוי",
      autoPick: "בחירה אוטומטית",
    },
    dishes: {
      eyebrow: "מאגר מנות ביתיות",
      title: "מנות",
      searchPlaceholder: "חיפוש לפי שם, תגית או מרכיב",
      empty: "אין מנות שמתאימות למסנן הזה. אפשר להוסיף מנה או לשנות חיפוש.",
      notCooked: "עדיין לא הכנו",
      cookedToday: "הוכן היום",
      daysAgo: "לפני {count} ימים",
      wantedBy: "רוצים: {names}",
      nobodyWants: "אף אחד עדיין לא בחר",
      conflictFor: "לא מתאים ל{name}: {items}",
      likesFor: "{name} אוהב/ת: {items}",
      noLimitsFor: "אין הגבלות ל{name}",
      plan: "לתפריט",
      selected: "נבחר",
      want: "רוצה",
      edit: "עריכה",
    },
    filters: {
      all: "הכל",
      wishes: "רצונות",
      memberWants: "רצונות של {name}",
      longAgo: "לא אכלנו מזמן",
      quickFast: "מהיר",
      quickKids: "ילדים אוהבים",
    },
    wishes: {
      eyebrow: "מה מתחשק למשפחה",
      title: "רצונות",
      longReason: "לא היה בתפריט הרבה זמן",
      empty: "עדיין אין רצונות. סמנו מנות עם הכפתור \"רוצה\".",
    },
    shopping: {
      eyebrow: "מתוך תפריט השבוע",
      title: "קניות",
      summary: "<strong>{toBuy}</strong> לקנות · <strong>{pantry}</strong> כבר בבית · <strong>{done}</strong> סומנו.",
      empty: "הוסיפו מנות לשבוע ורשימת הקניות תופיע אוטומטית.",
      inPantry: "יש בבית",
      home: "בבית",
      pantryEyebrow: "לא לקנות מיותר",
      pantryTitle: "מלאי בבית",
      pantryPlaceholder: "חלב, אורז, ביצים",
      emptyPantry: "הרשימה ריקה",
    },
    backup: {
      eyebrow: "מעבר בין טלפונים",
      title: "גיבוי",
      export: "הורדת backup",
      import: "טעינת backup",
      help: "זה סנכרון זמני בלי ענן: אפשר לשלוח את הקובץ לעצמכם ולטעון בטלפון אחר.",
    },
    sync: {
      eyebrow: "תפריט משפחתי משותף",
      title: "סנכרון ענן",
      disabled: "לא מחובר",
      connected: "מחובר",
      signedIn: "מחובר/ת: {email}",
      notSignedIn: "התחברו באימייל כדי לסנכרן את המכשיר הזה.",
      url: "Supabase URL",
      urlPlaceholder: "https://xxxx.supabase.co",
      anonKey: "Anon public key",
      anonKeyPlaceholder: "sb_publishable_...",
      email: "אימייל משפחתי",
      emailPlaceholder: "family@example.com",
      saveSettings: "שמירת הגדרות",
      sendLink: "שליחת קישור כניסה",
      push: "שמירה לענן",
      pull: "טעינה מהענן",
      signOut: "יציאה",
      help: "אפשר להשתמש באותו אימייל משפחתי בכמה טלפונים. הנתונים מוגנים בעזרת Supabase Auth ו-RLS.",
      lastSync: "סנכרון אחרון: {time}",
      neverSynced: "עדיין לא סונכרן",
      setupMissing: "מלאו Supabase URL, anon key ואימייל.",
      settingsSaved: "הגדרות הסנכרון נשמרו",
      linkSent: "קישור כניסה נשלח לאימייל",
      loginRequired: "קודם צריך להתחבר באימייל",
      cloudSaved: "נשמר בענן",
      cloudLoaded: "נטען מהענן",
      noCloudData: "עדיין אין נתונים בענן",
      signedOut: "התנתקתם מהענן",
      failed: "הסנכרון לא הצליח",
    },
    family: {
      eyebrow: "מי בוחר",
      title: "משפחה",
      namePlaceholder: "שם",
      add: "הוספה",
      remove: "הסרה של {name}",
      likes: "{name} אוהב/ת",
      likesPlaceholder: "ילדים אוהבים, מהיר, ירקות",
      avoids: "אסור / לא אוהב/ת",
      avoidsPlaceholder: "דגים, חלבי, חריף",
      savePrefs: "שמירת העדפות",
    },
    profile: {
      family: "משפחה",
      kids: "ילדים",
      adults: "מבוגרים",
      fallback: "פרופיל",
    },
    dishForm: {
      eyebrow: "כרטיס חדש",
      addTitle: "הוספת מנה",
      editTitle: "עריכת מנה",
      name: "שם",
      namePlaceholder: "לדוגמה: מרק עוף",
      category: "קטגוריה",
      tags: "תגיות מופרדות בפסיקים",
      tagsPlaceholder: "מהיר, ילדים אוהבים, בשרי",
      ingredients: "מרכיבים מופרדים בפסיקים",
      ingredientsPlaceholder: "עוף, גזר, תפוחי אדמה",
      note: "הערה",
      notePlaceholder: "לדוגמה: נוח להכין ליומיים",
    },
    import: {
      eyebrow: "מילוי מהיר",
      title: "יבוא מנות",
      text: "טקסט מתוך צילום או רשימה",
      textPlaceholder: "מרק\nקציצות\nפנקייק",
      category: "קטגוריה למנות חדשות",
      parse: "פירוק",
      addSelected: "הוספת המסומנות",
      empty: "אין מועמדים",
    },
    ocr: {
      photo: "צילום רשימה",
      languages: "שפות OCR",
      langAll: "רוסית + עברית + אנגלית",
      langRu: "רוסית + אנגלית",
      langHe: "עברית + אנגלית",
      langEn: "אנגלית",
      run: "זיהוי צילום",
      statusIdle: "הצילום מזוהה מקומית בדפדפן. אחרי OCR כדאי לבדוק את הטקסט ידנית.",
      choosePhoto: "בחרו צילום",
      loading: "טוען OCR...",
      recognizing: "מזהה: {name}",
      done: "סיום. נמצאו מועמדים: {count}. בדקו את הטקסט לפני ההוספה.",
      failedStatus: "OCR לא הצליח. אפשר להדביק טקסט ידנית.",
      failedToast: "OCR לא הצליח",
    },
    slot: {
      context: "בחירת מנה",
      title: "מה לשים?",
      searchPlaceholder: "חיפוש מנה",
      conflict: "לא מתאים: {items}",
      match: "מתאים: {items}",
      noLimits: "אין הגבלות",
      empty: "מנה כזאת עדיין לא קיימת.",
    },
    category: {
      main: "עיקרית",
      breakfast: "ארוחת בוקר",
      soup: "מרק",
      salad: "סלט",
      side: "תוספת",
      snack: "נשנוש",
      dessert: "קינוח",
    },
    meal: {
      breakfast: "ארוחת בוקר",
      lunch: "צהריים",
      dinner: "ערב",
    },
    days: {
      long: ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"],
      short: ["א׳", "ב׳", "ג׳", "ד׳", "ה׳", "ו׳", "שבת"],
    },
    groups: {
      vegetables: "ירקות ופירות",
      meat: "בשר ודגים",
      dairy: "חלבי",
      pantry: "מזווה",
      other: "אחר",
    },
    tags: {
      none: "בלי תגיות",
      import: "יבוא",
    },
    notes: {
      imported: "נוסף מתוך רשימה.",
    },
    toasts: {
      dishSaved: "המנה נשמרה",
      noNewDishes: "אין מנות חדשות",
      dishesAdded: "נוספו מנות: {count}",
      addedToMenu: "נוסף לתפריט",
      dayFilled: "היום מולא",
      weekFilled: "השבוע מולא",
      noFreeSlots: "אין מקומות פנויים בשבוע",
      emptyList: "הרשימה עדיין ריקה",
      listCopied: "הרשימה הועתקה",
      copyFailed: "לא הצלחנו להעתיק",
      profileExists: "פרופיל כזה כבר קיים",
      prefsSaved: "ההעדפות נשמרו",
      backupExported: "Backup ירד",
      backupImported: "Backup נטען",
      backupFailed: "לא הצלחנו לקרוא backup",
      demoReset: "נתוני ההדגמה שוחזרו",
    },
    demo: {
      resetHebrew: "מנות ההדגמה עודכנו: יש שמות ברוסית ובעברית.",
    },
  },
};

const categoryLabelKeys = {
  Основное: "category.main",
  Завтрак: "category.breakfast",
  Суп: "category.soup",
  Салат: "category.salad",
  Гарнир: "category.side",
  Перекус: "category.snack",
  Десерт: "category.dessert",
};

const groupLabelKeys = {
  "Овощи и фрукты": "groups.vegetables",
  "Мясо и рыба": "groups.meat",
  Молочное: "groups.dairy",
  Бакалея: "groups.pantry",
  Остальное: "groups.other",
};

const profileLabelKeys = {
  "member-family": { defaultName: "Семья", key: "profile.family" },
  "member-kids": { defaultName: "Дети", key: "profile.kids" },
  "member-adults": { defaultName: "Взрослые", key: "profile.adults" },
};

const mealTypes = [
  { id: "breakfast", labelKey: "meal.breakfast" },
  { id: "lunch", labelKey: "meal.lunch" },
  { id: "dinner", labelKey: "meal.dinner" },
];

const defaultState = {
  language: "ru",
  currentWeekStart: getWeekStart(new Date()).toISOString(),
  activeFilter: FILTER_ALL,
  activeMemberId: "member-family",
  dishSearch: "",
  importText: "",
  sync: {
    supabaseUrl: "",
    anonKey: "",
    email: "",
    lastSyncedAt: "",
  },
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
      i18n: {
        he: {
          name: "מרק עוף",
          tags: ["ילדים אוהבים", "ליומיים", "שבת"],
          ingredients: ["עוף", "גזר", "תפוחי אדמה", "בצל", "אטריות"],
          note: "נוח להכין סיר גדול ליומיים.",
        },
      },
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
      i18n: {
        he: {
          name: "לביבות גבינה",
          tags: ["מהיר", "חלבי", "אהוב"],
          ingredients: ["גבינה לבנה", "ביצים", "קמח", "שמנת חמוצה"],
          note: "אפשר להכין בערב ולחמם בבוקר.",
        },
      },
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
      i18n: {
        he: {
          name: "סלמון עם ירקות",
          tags: ["דגים", "מהיר", "קל"],
          ingredients: ["סלמון", "לימון", "קישוא", "עגבניות"],
          note: "לאפות הכל בתבנית אחת.",
        },
      },
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
      i18n: {
        he: {
          name: "פיצה ביתית",
          tags: ["ילדים אוהבים", "שישי", "אהוב"],
          ingredients: ["בצק", "רוטב עגבניות", "גבינה", "זיתים"],
          note: "מתאים לערב בלי בישול מסובך.",
        },
      },
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
      i18n: {
        he: {
          name: "קציצות עם פירה",
          tags: ["בשרי", "ביתי", "משביע"],
          ingredients: ["בשר טחון", "תפוחי אדמה", "בצל", "מלפפונים"],
          note: "כדאי להכין כמות גם למחר.",
        },
      },
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
      i18n: {
        he: {
          name: "בלינצ׳ס",
          tags: ["אהוב", "חלבי", "סוף שבוע"],
          ingredients: ["חלב", "ביצים", "קמח", "חמאה"],
          note: "טעים עם גבינה או ריבה.",
        },
      },
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
      i18n: {
        he: {
          name: "סלט מלפפונים ועגבניות",
          tags: ["ירקות", "מהיר", "כל יום"],
          ingredients: ["מלפפונים", "עגבניות", "ירק", "שמן זית"],
          note: "מתאים ליד מנות בשריות.",
        },
      },
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
      i18n: {
        he: {
          name: "נאגטס",
          tags: ["ילדים אוהבים", "מהיר"],
          ingredients: ["חזה עוף", "פירורי לחם", "צ׳יפס"],
          note: "עדיף לתכנן עם ירקות בצד.",
        },
      },
      lastCooked: "",
      wanted: false,
    },
    {
      id: "dish-shakshuka",
      name: "Шакшука",
      category: "Завтрак",
      tags: ["быстро", "яйца", "израильское"],
      ingredients: ["яйца", "помидоры", "перец", "лук", "пита"],
      note: "Хорошо на поздний завтрак или легкий ужин.",
      i18n: {
        he: {
          name: "שקשוקה",
          tags: ["מהיר", "ביצים", "ישראלי"],
          ingredients: ["ביצים", "עגבניות", "פלפל", "בצל", "פיתה"],
          note: "טוב לארוחת בוקר מאוחרת או ערב קל.",
        },
      },
      lastCooked: "",
      wanted: true,
      wantedBy: ["member-adults"],
    },
    {
      id: "dish-ptitim",
      name: "Птитим с курицей",
      category: "Основное",
      tags: ["дети любят", "быстро", "на два дня"],
      ingredients: ["птитим", "курица", "морковь", "лук"],
      note: "Удобно готовить в одной кастрюле.",
      i18n: {
        he: {
          name: "פתיתים עם עוף",
          tags: ["ילדים אוהבים", "מהיר", "ליומיים"],
          ingredients: ["פתיתים", "עוף", "גזר", "בצל"],
          note: "נוח להכין בסיר אחד.",
        },
      },
      lastCooked: "",
      wanted: false,
    },
    {
      id: "dish-hummus-plate",
      name: "Хумус с питой и салатом",
      category: "Перекус",
      tags: ["быстро", "легкое", "без мяса"],
      ingredients: ["хумус", "пита", "огурцы", "помидоры", "оливковое масло"],
      note: "Подходит для быстрого ужина.",
      i18n: {
        he: {
          name: "חומוס עם פיתה וסלט",
          tags: ["מהיר", "קל", "בלי בשר"],
          ingredients: ["חומוס", "פיתה", "מלפפונים", "עגבניות", "שמן זית"],
          note: "מתאים לארוחת ערב מהירה.",
        },
      },
      lastCooked: "",
      wanted: false,
    },
    {
      id: "dish-majadera",
      name: "Маджадра",
      category: "Гарнир",
      tags: ["без мяса", "домашнее", "сытное"],
      ingredients: ["рис", "чечевица", "лук", "оливковое масло"],
      note: "Можно подавать с салатом или йогуртом.",
      i18n: {
        he: {
          name: "מג׳דרה",
          tags: ["בלי בשר", "ביתי", "משביע"],
          ingredients: ["אורז", "עדשים", "בצל", "שמן זית"],
          note: "אפשר להגיש עם סלט או יוגורט.",
        },
      },
      lastCooked: "",
      wanted: false,
    },
    {
      id: "dish-schnitzel",
      name: "Шницель с рисом",
      category: "Основное",
      tags: ["дети любят", "мясное", "домашнее"],
      ingredients: ["куриное филе", "панировка", "яйца", "рис", "лимон"],
      note: "Классика для обеда, хорошо идет с салатом.",
      i18n: {
        he: {
          name: "שניצל עם אורז",
          tags: ["ילדים אוהבים", "בשרי", "ביתי"],
          ingredients: ["חזה עוף", "פירורי לחם", "ביצים", "אורז", "לימון"],
          note: "קלאסי לצהריים, הולך טוב עם סלט.",
        },
      },
      lastCooked: "",
      wanted: true,
      wantedBy: ["member-kids"],
    },
    {
      id: "dish-couscous",
      name: "Кускус с овощами",
      category: "Основное",
      tags: ["овощи", "на два дня", "без мяса"],
      ingredients: ["кускус", "морковь", "кабачок", "нут", "лук"],
      note: "Хорошо готовить большой порцией.",
      i18n: {
        he: {
          name: "קוסקוס עם ירקות",
          tags: ["ירקות", "ליומיים", "בלי בשר"],
          ingredients: ["קוסקוס", "גזר", "קישוא", "חומוס", "בצל"],
          note: "כדאי להכין כמות גדולה.",
        },
      },
      lastCooked: "",
      wanted: false,
    },
    {
      id: "dish-tuna-pasta",
      name: "Паста с тунцом",
      category: "Основное",
      tags: ["быстро", "рыба", "из запасов"],
      ingredients: ["паста", "тунец", "томатный соус", "оливки"],
      note: "Запасной вариант, когда мало времени.",
      i18n: {
        he: {
          name: "פסטה עם טונה",
          tags: ["מהיר", "דגים", "מהמזווה"],
          ingredients: ["פסטה", "טונה", "רוטב עגבניות", "זיתים"],
          note: "פתרון גיבוי כשאין הרבה זמן.",
        },
      },
      lastCooked: "",
      wanted: false,
    },
    {
      id: "dish-vegetable-omelet",
      name: "Омлет с овощами",
      category: "Завтрак",
      tags: ["быстро", "овощи", "легкое"],
      ingredients: ["яйца", "помидоры", "зелень", "сыр"],
      note: "Подходит и на завтрак, и на ужин.",
      i18n: {
        he: {
          name: "חביתה עם ירקות",
          tags: ["מהיר", "ירקות", "קל"],
          ingredients: ["ביצים", "עגבניות", "ירק", "גבינה"],
          note: "מתאים גם לבוקר וגם לערב.",
        },
      },
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
let supabaseModule = null;
let supabaseClient = null;
let syncSession = null;
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
  syncPanel: document.querySelector("#syncPanel"),
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
  languageOptions: document.querySelectorAll("[data-language-option]"),
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

els.languageOptions.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.languageOption));
});

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
initializeCloudSync();

function render() {
  applyLanguage();
  els.dishSearch.value = state.dishSearch;
  renderWeek();
  renderDishes();
  renderFamilyPanel();
  renderWishes();
  renderShopping();
}

function setLanguage(language) {
  if (!SUPPORTED_LANGUAGES.includes(language) || state.language === language) return;
  state.language = language;
  saveState();
  render();
}

function applyLanguage() {
  document.documentElement.lang = state.language;
  document.documentElement.dir = getDirection();
  document.title = t("app.title");

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.setAttribute("placeholder", t(element.dataset.i18nPlaceholder));
  });
  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    element.setAttribute("aria-label", t(element.dataset.i18nAriaLabel));
  });
  document.querySelectorAll("[data-i18n-title]").forEach((element) => {
    element.setAttribute("title", t(element.dataset.i18nTitle));
  });
  els.languageOptions.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.languageOption === state.language);
  });
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
  els.weekTitle.textContent = isCurrentWeek(weekStart) ? t("week.current") : t("week.regular");
  els.weekRange.textContent = `${formatDate(weekStart)} - ${formatDate(weekEnd)}`;

  const plannedDishIds = getWeekPlanEntries(weekStart)
    .map((entry) => entry.dishId)
    .filter(Boolean);
  const uniquePlanned = new Set(plannedDishIds);
  const wantedPlanned = state.dishes.filter((dish) => hasWishes(dish) && uniquePlanned.has(dish.id)).length;
  const wantedTotal = state.dishes.filter(hasWishes).length;
  const emptySlots = 7 * mealTypes.length - plannedDishIds.length;

  els.weekInsights.innerHTML = [
    insight(plannedDishIds.length, t("week.planned")),
    insight(wantedTotal ? `${wantedPlanned}/${wantedTotal}` : "0", t("week.wishesInMenu")),
    insight(emptySlots, t("week.emptySlots")),
  ].join("");

  els.weekGrid.innerHTML = Array.from({ length: 7 }, (_, dayIndex) => {
      const dayName = getDayName(dayIndex);
      const date = addDays(weekStart, dayIndex);
      const dateKey = toDateKey(date);
      const slots = mealTypes
        .map((meal) => {
          const mealLabel = t(meal.labelKey);
          const dishId = state.plans[dateKey]?.[meal.id];
          const dish = findDish(dishId);
          return `
            <div class="meal-slot">
              <div class="slot-label">${mealLabel}</div>
              <div class="slot-content">
                ${
                  dish
                    ? `<div class="planned-dish">
                        <strong>${escapeHtml(displayDishName(dish))}</strong>
                        <span>${displayCategory(dish.category)} · ${formatTags(displayDishTags(dish))}</span>
                      </div>`
                    : `<div class="empty-slot">${t("week.emptySlot")}</div>`
                }
                <div class="slot-actions">
                  <button class="mini-button" type="button" data-slot-add="${dateKey}:${meal.id}" aria-label="${t("week.chooseDish")}">＋</button>
                  ${
                    dish
                      ? `<button class="mini-button is-danger" type="button" data-slot-clear="${dateKey}:${meal.id}" aria-label="${t("week.clear")}">×</button>`
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
            <button class="mini-button" type="button" data-day-auto="${dateKey}">${t("week.autoPick")}</button>
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
    : `<div class="empty-state">${t("dishes.empty")}</div>`;

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
    { value: FILTER_ALL, label: t("filters.all") },
    { value: FILTER_WISHES, label: t("filters.wishes") },
    { value: FILTER_MEMBER_WANTS, label: formatMessage("filters.memberWants", { name: displayProfileName(activeMember) }) },
    { value: FILTER_LONG_AGO, label: t("filters.longAgo") },
    ...[...new Set(state.dishes.map((dish) => dish.category))].map((category) => ({
      value: category,
      label: displayCategory(category),
    })),
  ];
  els.dishFilters.innerHTML = filters
    .map(
      (filter) => `
        <button class="chip ${state.activeFilter === filter.value ? "is-active" : ""}" type="button" data-filter="${escapeHtml(filter.value)}">
          ${escapeHtml(filter.label)}
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
  const cookedLabel =
    daysAgo === null ? t("dishes.notCooked") : daysAgo === 0 ? t("dishes.cookedToday") : formatMessage("dishes.daysAgo", { count: daysAgo });
  const wantedBy = getWantedBy(dish);
  const activeWants = wantedBy.includes(state.activeMemberId);
  const activeMemberName = displayProfileName(getActiveMember());
  const wantedLabel = wantedBy.length ? formatMessage("dishes.wantedBy", { names: formatProfileNames(wantedBy) }) : t("dishes.nobodyWants");
  const conflicts = getProfileConflicts(dish);
  const matches = getProfileMatches(dish);
  const compatibilityLabel = conflicts.length
    ? formatMessage("dishes.conflictFor", { name: activeMemberName, items: conflicts.join(", ") })
    : matches.length
      ? formatMessage("dishes.likesFor", { name: activeMemberName, items: matches.join(", ") })
      : formatMessage("dishes.noLimitsFor", { name: activeMemberName });
  return `
    <article class="dish-card">
      <div class="dish-main">
        <div class="dish-art" aria-hidden="true">${displayDishName(dish).slice(0, 1).toUpperCase()}</div>
        <div class="dish-meta">
          <h3>${escapeHtml(displayDishName(dish))}</h3>
          <p class="dish-note">${escapeHtml(displayCategory(dish.category))} · ${escapeHtml(cookedLabel)}</p>
          <p class="dish-note">${escapeHtml(wantedLabel)}</p>
          <p class="dish-note ${conflicts.length ? "warn-line" : "ok-line"}">${escapeHtml(compatibilityLabel)}</p>
          <p class="dish-ingredients">${escapeHtml(displayDishIngredients(dish).join(", "))}</p>
          <div class="dish-tags">${displayDishTags(dish).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div>
        </div>
      </div>
      <div class="dish-actions">
        <button type="button" data-plan-dish="${dish.id}">${t("dishes.plan")}</button>
        <button class="${activeWants ? "is-selected" : ""}" type="button" data-want-dish="${dish.id}">${activeWants ? t("dishes.selected") : t("dishes.want")}</button>
        <button type="button" data-edit-dish="${dish.id}">${t("dishes.edit")}</button>
      </div>
    </article>
  `;
}

function renderFamilyPanel() {
  const activeProfile = getActiveMember();
  const activeProfileName = displayProfileName(activeProfile);
  els.familyPanel.innerHTML = `
    <section class="manage-panel">
      <div class="panel-heading">
        <div>
          <p class="eyebrow">${t("family.eyebrow")}</p>
          <h3>${t("family.title")}</h3>
        </div>
        <span class="panel-count">${state.profiles.length}</span>
      </div>
      <div class="member-list">
        ${state.profiles
          .map(
            (profile) => `
              <button class="member-pill ${profile.id === state.activeMemberId ? "is-active" : ""}" type="button" data-member-select="${profile.id}">
                ${escapeHtml(displayProfileName(profile))}
              </button>
            `,
          )
          .join("")}
      </div>
      <form class="inline-form" id="memberForm">
        <input id="memberName" type="text" placeholder="${escapeHtml(t("family.namePlaceholder"))}" autocomplete="off" />
        <button class="secondary-button" type="submit">${t("family.add")}</button>
      </form>
      <div class="member-actions">
        ${state.profiles
          .filter((profile) => profile.id !== "member-family")
          .map(
            (profile) => `
              <button class="text-button" type="button" data-member-remove="${profile.id}">
                ${escapeHtml(formatMessage("family.remove", { name: displayProfileName(profile) }))}
              </button>
            `,
          )
          .join("")}
      </div>
      <form class="preference-form" id="profilePrefsForm">
        <label class="field">
          ${escapeHtml(formatMessage("family.likes", { name: activeProfileName }))}
          <input id="profileLikes" type="text" value="${escapeHtml(activeProfile.likes.join(", "))}" placeholder="${escapeHtml(t("family.likesPlaceholder"))}" />
        </label>
        <label class="field">
          ${escapeHtml(t("family.avoids"))}
          <input id="profileAvoids" type="text" value="${escapeHtml(activeProfile.avoids.join(", "))}" placeholder="${escapeHtml(t("family.avoidsPlaceholder"))}" />
        </label>
        <button class="secondary-button full-width" type="submit">${t("family.savePrefs")}</button>
      </form>
    </section>
  `;

  els.familyPanel.querySelectorAll("[data-member-select]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeMemberId = button.dataset.memberSelect;
      state.activeFilter = FILTER_ALL;
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
          const reason = wantedBy.length ? formatMessage("dishes.wantedBy", { names: formatProfileNames(wantedBy) }) : t("wishes.longReason");
          return `
            <article class="wish-card wish-card-stacked">
              <div>
                <h3>${escapeHtml(displayDishName(dish))}</h3>
                <p>${escapeHtml(reason)} · ${escapeHtml(formatTags(displayDishTags(dish)))}</p>
              </div>
              <div class="person-toggles">
                ${state.profiles
                  .map(
                    (profile) => `
                      <button class="toggle-pill ${wantedBy.includes(profile.id) ? "is-active" : ""}" type="button" data-wish-person="${dish.id}:${profile.id}">
                        ${escapeHtml(displayProfileName(profile))}
                      </button>
                    `,
                  )
                  .join("")}
              </div>
              <button class="secondary-button full-width" type="button" data-plan-dish="${dish.id}">${t("dishes.plan")}</button>
            </article>
          `;
        })
        .join("")
    : `<div class="empty-state">${t("wishes.empty")}</div>`;

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
  renderSyncPanel();
  const groups = buildShoppingGroups();
  const totalItems = groups.reduce((count, group) => count + group.items.length, 0);
  const pantryCount = groups.reduce((count, group) => count + group.items.filter((item) => item.inPantry).length, 0);
  const toBuyItems = groups.flatMap((group) => group.items).filter((item) => !item.inPantry);
  const doneCount = groups.reduce(
    (count, group) => count + group.items.filter((item) => !item.inPantry && state.shoppingDone.includes(item.key)).length,
    0,
  );

  els.shoppingSummary.innerHTML = `
    <p>${formatMessage("shopping.summary", { toBuy: toBuyItems.length, pantry: pantryCount, done: doneCount })}</p>
  `;

  els.shoppingList.innerHTML = groups.length
    ? groups
        .map(
          (group) => `
            <section class="shopping-group">
              <h3>${escapeHtml(displayIngredientGroup(group.name))}</h3>
              ${group.items.map(renderShoppingItem).join("")}
            </section>
          `,
        )
        .join("")
    : `<div class="empty-state">${t("shopping.empty")}</div>`;

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

function renderSyncPanel() {
  const sync = state.sync || {};
  const isConfigured = Boolean(sync.supabaseUrl && sync.anonKey && sync.email);
  const statusLabel = syncSession?.user?.email
    ? formatMessage("sync.signedIn", { email: syncSession.user.email })
    : isConfigured
      ? t("sync.notSignedIn")
      : t("sync.disabled");
  const lastSyncLabel = sync.lastSyncedAt
    ? formatMessage("sync.lastSync", { time: new Intl.DateTimeFormat(getLocale(), { dateStyle: "short", timeStyle: "short" }).format(new Date(sync.lastSyncedAt)) })
    : t("sync.neverSynced");

  els.syncPanel.innerHTML = `
    <section class="manage-panel sync-panel">
      <div class="panel-heading">
        <div>
          <p class="eyebrow">${t("sync.eyebrow")}</p>
          <h3>${t("sync.title")}</h3>
        </div>
        <span class="sync-badge ${syncSession ? "is-connected" : ""}">${syncSession ? t("sync.connected") : t("sync.disabled")}</span>
      </div>
      <form class="sync-form" id="syncSettingsForm">
        <label class="field">
          ${t("sync.url")}
          <input id="syncSupabaseUrl" type="url" value="${escapeHtml(sync.supabaseUrl || "")}" placeholder="${escapeHtml(t("sync.urlPlaceholder"))}" autocomplete="off" />
        </label>
        <label class="field">
          ${t("sync.anonKey")}
          <input id="syncAnonKey" type="password" value="${escapeHtml(sync.anonKey || "")}" placeholder="${escapeHtml(t("sync.anonKeyPlaceholder"))}" autocomplete="off" />
        </label>
        <label class="field">
          ${t("sync.email")}
          <input id="syncEmail" type="email" value="${escapeHtml(sync.email || "")}" placeholder="${escapeHtml(t("sync.emailPlaceholder"))}" autocomplete="email" />
        </label>
        <button class="secondary-button full-width" type="submit">${t("sync.saveSettings")}</button>
      </form>
      <div class="backup-actions">
        <button class="secondary-button" id="syncLoginButton" type="button">${t("sync.sendLink")}</button>
        <button class="secondary-button" id="syncPullButton" type="button">${t("sync.pull")}</button>
        <button class="primary-button" id="syncPushButton" type="button">${t("sync.push")}</button>
        ${syncSession ? `<button class="text-button" id="syncSignOutButton" type="button">${t("sync.signOut")}</button>` : ""}
      </div>
      <p class="muted-line">${escapeHtml(statusLabel)}</p>
      <p class="muted-line">${escapeHtml(lastSyncLabel)}</p>
      <p class="muted-line">${t("sync.help")}</p>
    </section>
  `;

  els.syncPanel.querySelector("#syncSettingsForm").addEventListener("submit", (event) => {
    event.preventDefault();
    saveSyncSettings();
  });
  els.syncPanel.querySelector("#syncLoginButton").addEventListener("click", sendSyncLoginLink);
  els.syncPanel.querySelector("#syncPullButton").addEventListener("click", pullCloudState);
  els.syncPanel.querySelector("#syncPushButton").addEventListener("click", pushCloudState);
  els.syncPanel.querySelector("#syncSignOutButton")?.addEventListener("click", signOutCloudSync);
}

async function initializeCloudSync() {
  if (!hasSyncSettings()) return;

  try {
    const client = await getSupabaseClient();
    const {
      data: { session },
    } = await client.auth.getSession();
    syncSession = session;
    client.auth.onAuthStateChange((_event, session) => {
      syncSession = session;
      renderSyncPanel();
    });
    renderSyncPanel();
  } catch {
    // Cloud sync remains optional; local mode still works.
  }
}

function hasSyncSettings() {
  const sync = state.sync || {};
  return Boolean(sync.supabaseUrl && sync.anonKey && sync.email);
}

function saveSyncSettings() {
  const previousUrl = state.sync?.supabaseUrl || "";
  const previousKey = state.sync?.anonKey || "";
  const nextSync = {
    ...(state.sync || {}),
    supabaseUrl: els.syncPanel.querySelector("#syncSupabaseUrl").value.trim(),
    anonKey: els.syncPanel.querySelector("#syncAnonKey").value.trim(),
    email: els.syncPanel.querySelector("#syncEmail").value.trim(),
  };

  state.sync = nextSync;
  if (previousUrl !== nextSync.supabaseUrl || previousKey !== nextSync.anonKey) {
    supabaseClient = null;
    syncSession = null;
  }
  saveState();
  showToast(t("sync.settingsSaved"));
  renderShopping();
  initializeCloudSync();
}

async function sendSyncLoginLink() {
  if (!hasSyncSettings()) {
    showToast(t("sync.setupMissing"));
    return;
  }

  try {
    const client = await getSupabaseClient();
    const { error } = await client.auth.signInWithOtp({
      email: state.sync.email,
      options: {
        emailRedirectTo: `${location.origin}${location.pathname}`,
      },
    });
    if (error) throw error;
    showToast(t("sync.linkSent"));
  } catch (error) {
    showToast(t("sync.failed"));
  }
}

async function pushCloudState() {
  try {
    const { client, session } = await requireCloudSession();
    const syncedAt = new Date().toISOString();
    const { error } = await client.from("home_menu_states").upsert(
      {
        user_id: session.user.id,
        state: sanitizeStateForSync(state),
        updated_at: syncedAt,
      },
      { onConflict: "user_id" },
    );
    if (error) throw error;

    state.sync.lastSyncedAt = syncedAt;
    saveState();
    renderSyncPanel();
    showToast(t("sync.cloudSaved"));
  } catch (error) {
    showToast(error?.message === "login-required" ? t("sync.loginRequired") : t("sync.failed"));
  }
}

async function pullCloudState() {
  try {
    const { client, session } = await requireCloudSession();
    const { data, error } = await client.from("home_menu_states").select("state, updated_at").eq("user_id", session.user.id).maybeSingle();
    if (error) throw error;
    if (!data?.state) {
      showToast(t("sync.noCloudData"));
      return;
    }

    const syncSettings = {
      ...(state.sync || {}),
      lastSyncedAt: data.updated_at || new Date().toISOString(),
    };
    state = normalizeState({
      ...structuredClone(defaultState),
      ...data.state,
      sync: syncSettings,
      plans: data.state.plans ?? {},
      dishes: data.state.dishes?.length ? data.state.dishes : structuredClone(defaultState.dishes),
      profiles: data.state.profiles?.length ? data.state.profiles : structuredClone(defaultState.profiles),
      pantry: Array.isArray(data.state.pantry) ? data.state.pantry : structuredClone(defaultState.pantry),
      shoppingDone: data.state.shoppingDone ?? [],
    });
    saveState();
    render();
    showToast(t("sync.cloudLoaded"));
  } catch (error) {
    showToast(error?.message === "login-required" ? t("sync.loginRequired") : t("sync.failed"));
  }
}

async function signOutCloudSync() {
  try {
    const client = await getSupabaseClient();
    await client.auth.signOut();
    syncSession = null;
    renderSyncPanel();
    showToast(t("sync.signedOut"));
  } catch {
    showToast(t("sync.failed"));
  }
}

async function requireCloudSession() {
  if (!hasSyncSettings()) throw new Error("login-required");
  const client = await getSupabaseClient();
  const {
    data: { session },
  } = await client.auth.getSession();
  syncSession = session;
  if (!session?.user) throw new Error("login-required");
  return { client, session };
}

async function getSupabaseClient() {
  if (supabaseClient) return supabaseClient;
  if (!hasSyncSettings()) throw new Error("missing-settings");
  const supabase = await loadSupabase();
  supabaseClient = supabase.createClient(state.sync.supabaseUrl, state.sync.anonKey);
  return supabaseClient;
}

async function loadSupabase() {
  if (supabaseModule) return supabaseModule;
  supabaseModule = await import(SUPABASE_MODULE_URL);
  return supabaseModule;
}

function sanitizeStateForSync(sourceState) {
  const copy = normalizeState(structuredClone(sourceState));
  delete copy.sync;
  return copy;
}

function renderShoppingItem(item) {
  const isDone = state.shoppingDone.includes(item.key);
  const statusClass = item.inPantry ? "is-stocked" : isDone ? "is-done" : "";
  return `
    <div class="shopping-item ${statusClass}">
      <div>
        <strong class="shopping-name">${escapeHtml(item.name)}</strong>
        <span class="shopping-source">${escapeHtml([...item.sources].join(", "))}${item.inPantry ? ` · ${t("shopping.inPantry")}` : ""}</span>
      </div>
      <div class="shopping-buttons">
        ${
          item.inPantry
            ? `<button class="mini-button" type="button" data-remove-pantry="${escapeHtml(item.key)}">↺</button>`
            : `<button class="mini-button" type="button" data-add-pantry="${escapeHtml(item.name)}">${t("shopping.home")}</button>
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
          <p class="eyebrow">${t("shopping.pantryEyebrow")}</p>
          <h3>${t("shopping.pantryTitle")}</h3>
        </div>
        <span class="panel-count">${state.pantry.length}</span>
      </div>
      <form class="inline-form" id="pantryForm">
        <input id="pantryInput" type="text" placeholder="${escapeHtml(t("shopping.pantryPlaceholder"))}" autocomplete="off" />
        <button class="secondary-button" type="submit">${t("actions.add")}</button>
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
            : `<span class="muted-line">${t("shopping.emptyPantry")}</span>`
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
          <p class="eyebrow">${t("backup.eyebrow")}</p>
          <h3>${t("backup.title")}</h3>
        </div>
        <span class="panel-count">${state.dishes.length}</span>
      </div>
      <div class="backup-actions">
        <button class="secondary-button" id="exportBackupButton" type="button">${t("backup.export")}</button>
        <label class="secondary-button file-button">
          ${t("backup.import")}
          <input id="backupFileInput" type="file" accept="application/json,.json" />
        </label>
      </div>
      <p class="muted-line">${t("backup.help")}</p>
    </section>
  `;

  els.backupPanel.querySelector("#exportBackupButton").addEventListener("click", exportBackup);
  els.backupPanel.querySelector("#backupFileInput").addEventListener("change", importBackup);
}

function openDishForm(dishId = "") {
  const dish = findDish(dishId);
  els.dishDialogTitle.textContent = dish ? t("dishForm.editTitle") : t("dishForm.addTitle");
  document.querySelector("#dishId").value = dish?.id ?? "";
  document.querySelector("#dishName").value = dish ? displayDishName(dish) : "";
  document.querySelector("#dishCategory").value = dish?.category ?? "Основное";
  document.querySelector("#dishTags").value = dish ? displayDishTags(dish).join(", ") : "";
  document.querySelector("#dishIngredients").value = dish ? displayDishIngredients(dish).join(", ") : "";
  document.querySelector("#dishNote").value = dish ? displayDishNote(dish) : "";
  els.dishDialog.showModal();
}

function saveDishFromForm() {
  const dishId = document.querySelector("#dishId").value || `dish-${Date.now()}`;
  const previous = findDish(dishId);
  const name = document.querySelector("#dishName").value.trim();
  const category = document.querySelector("#dishCategory").value;
  const tags = parseList(document.querySelector("#dishTags").value);
  const ingredients = parseList(document.querySelector("#dishIngredients").value);
  const note = document.querySelector("#dishNote").value.trim();

  if (!name) return;

  const nextDish = {
    id: dishId,
    name,
    category,
    tags,
    ingredients,
    note,
    lastCooked: previous?.lastCooked ?? "",
    wanted: previous?.wanted ?? false,
    wantedBy: previous ? getWantedBy(previous) : [],
    i18n: previous?.i18n ?? {},
  };

  if (state.language !== "ru") {
    nextDish.i18n = {
      ...(previous?.i18n ?? {}),
      [state.language]: { name, tags, ingredients, note },
    };
    if (previous) {
      nextDish.name = previous.name;
      nextDish.tags = previous.tags;
      nextDish.ingredients = previous.ingredients;
      nextDish.note = previous.note;
    }
  }

  state.dishes = previous
    ? state.dishes.map((dish) => (dish.id === dishId ? nextDish : dish))
    : [nextDish, ...state.dishes];

  saveState();
  els.dishDialog.close();
  showToast(t("toasts.dishSaved"));
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
    : `<div class="empty-state">${t("import.empty")}</div>`;
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
      tags: [t("tags.import")],
      ingredients: [],
      note: t("notes.imported"),
      lastCooked: "",
      wanted: false,
      wantedBy: [],
    }));

  if (!newDishes.length) {
    showToast(t("toasts.noNewDishes"));
    return;
  }

  state.dishes = [...newDishes, ...state.dishes];
  saveState();
  els.importDialog.close();
  showToast(formatMessage("toasts.dishesAdded", { count: newDishes.length }));
  render();
}

async function runOcrImport() {
  const files = [...els.ocrFileInput.files];
  if (!files.length) {
    showToast(t("ocr.choosePhoto"));
    return;
  }

  const languages = els.ocrLanguage.value;
  els.ocrStatus.textContent = t("ocr.loading");
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
      els.ocrStatus.textContent = formatMessage("ocr.recognizing", { name: file.name });
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
    els.ocrStatus.textContent = formatMessage("ocr.done", { count: importCandidates.length });
  } catch (error) {
    els.ocrStatus.textContent = t("ocr.failedStatus");
    showToast(t("ocr.failedToast"));
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
  els.slotDialogContext.textContent = `${getDayName(date.getDay(), "short")} · ${t(meal.labelKey).toLowerCase()}`;
  state.slotSearch = "";
  els.slotSearch.value = "";
  renderQuickPicks();
  renderSlotDishList();
  els.slotDialog.showModal();
}

function renderQuickPicks() {
  const picks = [
    { key: FILTER_WISHES, label: t("filters.wishes") },
    { key: FILTER_MEMBER_WANTS, label: formatMessage("filters.memberWants", { name: displayProfileName(getActiveMember()) }) },
    { key: FILTER_LONG_AGO, label: t("filters.longAgo") },
    { key: "quick-fast", label: t("filters.quickFast") },
    { key: "quick-kids", label: t("filters.quickKids") },
  ];

  els.quickPicks.innerHTML = picks
    .map((pick) => `<button class="chip" type="button" data-slot-filter="${pick.key}" data-slot-label="${escapeHtml(pick.label)}">${escapeHtml(pick.label)}</button>`)
    .join("");

  els.quickPicks.querySelectorAll("[data-slot-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      els.slotSearch.value = button.dataset.slotLabel;
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
      if (state.slotSearch === FILTER_WISHES || isLocalizedSearch(search, "filters.wishes")) return hasWishes(dish);
      if (state.slotSearch === FILTER_MEMBER_WANTS || isLocalizedSearch(search, "filters.memberWants", { name: displayProfileName(getActiveMember()) })) {
        return getWantedBy(dish).includes(state.activeMemberId);
      }
      if (state.slotSearch === FILTER_LONG_AGO || isLocalizedSearch(search, "filters.longAgo")) return isLongAgo(dish.lastCooked);
      if (state.slotSearch === "quick-fast" || isLocalizedSearch(search, "filters.quickFast")) return hasAnyTag(dish, ["быстро", "מהיר"]);
      if (state.slotSearch === "quick-kids" || isLocalizedSearch(search, "filters.quickKids")) return hasAnyTag(dish, ["дети любят", "ילדים אוהבים"]);
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
              ? formatMessage("slot.conflict", { items: conflicts.join(", ") })
              : matches.length
                ? formatMessage("slot.match", { items: matches.join(", ") })
                : t("slot.noLimits");
            return `
              <button class="wish-card" type="button" data-choose-dish="${dish.id}">
                <div>
                  <h3>${escapeHtml(dish.name)}</h3>
                  <p>${escapeHtml(displayCategory(dish.category))} · ${escapeHtml(formatTags(displayDishTags(dish)))}</p>
                  <p class="${conflicts.length ? "warn-line" : "ok-line"}">${escapeHtml(profileLine)}</p>
                </div>
                <span class="mini-button" aria-hidden="true">＋</span>
              </button>
            `;
          },
        )
        .join("")
    : `<div class="empty-state">${t("slot.empty")}</div>`;

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
  showToast(t("toasts.addedToMenu"));
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
  showToast(t("toasts.dayFilled"));
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
  showToast(t("toasts.weekFilled"));
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
  showToast(t("toasts.noFreeSlots"));
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
      return `${displayIngredientGroup(group.name)}\n${items.map((item) => `- ${item.name}`).join("\n")}`;
    })
    .filter(Boolean)
    .join("\n\n");

  if (!text) {
    showToast(t("toasts.emptyList"));
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    showToast(t("toasts.listCopied"));
  } catch {
    showToast(t("toasts.copyFailed"));
  }
}

function buildShoppingGroups() {
  const weekStart = new Date(state.currentWeekStart);
  const plannedDishes = getWeekPlanEntries(weekStart)
    .map((entry) => findDish(entry.dishId))
    .filter(Boolean);
  const ingredientMap = new Map();

  plannedDishes.forEach((dish) => {
    displayDishIngredients(dish).forEach((ingredient) => {
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
      ingredientMap.get(key).sources.add(displayDishName(dish));
    });
  });

  const grouped = new Map();
  [...ingredientMap.values()].forEach((item) => {
    if (!grouped.has(item.group)) grouped.set(item.group, []);
    grouped.get(item.group).push(item);
  });

  return [...grouped.entries()].map(([name, items]) => ({
    name,
    items: items.sort((a, b) => a.name.localeCompare(b.name, getLocale())),
  }));
}

function getIngredientGroup(name) {
  const text = normalize(name);
  const groups = [
    ["Овощи и фрукты", ["морковь", "картофель", "лук", "огур", "помид", "зелень", "кабач", "лимон", "оливки", "גזר", "תפוח", "בצל", "מלפפון", "עגב", "ירק", "קישוא", "לימון", "זית"]],
    ["Мясо и рыба", ["кур", "фарш", "лосось", "рыба", "עוף", "בשר", "דג", "סלמון"]],
    ["Молочное", ["сыр", "творог", "сметана", "молоко", "масло", "גבינה", "חלב", "חמאה", "שמנת"]],
    ["Бакалея", ["мука", "лапша", "тесто", "соус", "панировка", "קמח", "אטריות", "בצק", "רוטב", "אורז", "פסטה"]],
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
  return [...state.dishes]
    .filter((dish) => {
      if (state.activeFilter === FILTER_WISHES) return hasWishes(dish);
      if (state.activeFilter === FILTER_MEMBER_WANTS) return getWantedBy(dish).includes(state.activeMemberId);
      if (state.activeFilter === FILTER_LONG_AGO) return isLongAgo(dish.lastCooked);
      if (state.activeFilter !== FILTER_ALL) return dish.category === state.activeFilter;
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
  return normalize(getDishTextVariants(dish).join(" "));
}

function hasAnyTag(dish, terms) {
  const tags = dish.tags.map(normalize);
  return terms.some((term) => tags.some((tag) => tag.includes(normalize(term))));
}

function findDish(dishId) {
  return state.dishes.find((dish) => dish.id === dishId);
}

function getActiveMember() {
  return state.profiles.find((profile) => profile.id === state.activeMemberId) || state.profiles[0];
}

function getDishMatchText(dish) {
  return normalize(getDishTextVariants(dish).join(" "));
}

function getCategorySearchText(category) {
  const key = categoryLabelKeys[category];
  if (!key) return "";
  return SUPPORTED_LANGUAGES.map((language) => getTranslation(language, key)).join(" ");
}

function getDishTextVariants(dish) {
  const localized = SUPPORTED_LANGUAGES.flatMap((language) => {
    const entry = dish.i18n?.[language];
    if (!entry) return [];
    return [entry.name, entry.tags?.join(" "), entry.ingredients?.join(" "), entry.note];
  });
  return [dish.name, dish.category, getCategorySearchText(dish.category), dish.tags.join(" "), dish.ingredients.join(" "), dish.note, ...localized].filter(Boolean);
}

function getLocalizedDishEntry(dish, language = state.language) {
  return dish.i18n?.[language] || null;
}

function displayDishName(dish) {
  return getLocalizedDishEntry(dish)?.name || dish.name;
}

function displayDishTags(dish) {
  return getLocalizedDishEntry(dish)?.tags?.length ? getLocalizedDishEntry(dish).tags : dish.tags;
}

function displayDishIngredients(dish) {
  return getLocalizedDishEntry(dish)?.ingredients?.length ? getLocalizedDishEntry(dish).ingredients : dish.ingredients;
}

function displayDishNote(dish) {
  return getLocalizedDishEntry(dish)?.note || dish.note;
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
    .map((profileId) => displayProfileName(profileId))
    .filter(Boolean);
  return names.join(", ");
}

function addProfile(name) {
  const trimmed = name.trim();
  if (!trimmed) return;
  const exists = state.profiles.some((profile) => normalize(profile.name) === normalize(trimmed));
  if (exists) {
    showToast(t("toasts.profileExists"));
    return;
  }
  const profile = { id: `member-${Date.now()}`, name: trimmed, likes: [], avoids: [] };
  state.profiles = [...state.profiles, profile];
  state.activeMemberId = profile.id;
  state.activeFilter = FILTER_ALL;
  saveState();
  render();
}

function saveProfilePreferences() {
  const profileId = state.activeMemberId;
  const likes = parseList(els.familyPanel.querySelector("#profileLikes").value);
  const avoids = parseList(els.familyPanel.querySelector("#profileAvoids").value);
  state.profiles = state.profiles.map((profile) => (profile.id === profileId ? { ...profile, likes, avoids } : profile));
  saveState();
  showToast(t("toasts.prefsSaved"));
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
    version: 4,
    state: sanitizeStateForSync(state),
  };
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `home-menu-backup-${toDateKey(new Date())}.json`;
  link.click();
  URL.revokeObjectURL(url);
  showToast(t("toasts.backupExported"));
}

function importBackup(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(String(reader.result || ""));
      const incomingState = parsed.state || parsed;
      const currentSync = state.sync;
      state = normalizeState({
        ...structuredClone(defaultState),
        ...incomingState,
        sync: currentSync,
        plans: incomingState.plans ?? {},
        dishes: incomingState.dishes?.length ? incomingState.dishes : structuredClone(defaultState.dishes),
      });
      saveState();
      render();
      showToast(t("toasts.backupImported"));
    } catch {
      showToast(t("toasts.backupFailed"));
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
  return tags.slice(0, 3).join(", ") || t("tags.none");
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

function normalize(value) {
  return String(value).trim().toLowerCase();
}

function getDirection() {
  return state.language === "he" ? "rtl" : "ltr";
}

function getLocale() {
  return state.language === "he" ? "he-IL" : "ru-RU";
}

function getTranslation(language, key) {
  return key.split(".").reduce((value, part) => value?.[part], translations[language]);
}

function t(key) {
  const language = SUPPORTED_LANGUAGES.includes(state.language) ? state.language : "ru";
  return getTranslation(language, key) ?? getTranslation("ru", key) ?? key;
}

function formatMessage(key, values = {}) {
  return formatMessageForLanguage(state.language, key, values);
}

function formatMessageForLanguage(language, key, values = {}) {
  const template = getTranslation(language, key) ?? getTranslation("ru", key) ?? key;
  return Object.entries(values).reduce((message, [name, value]) => message.replaceAll(`{${name}}`, String(value)), template);
}

function isLocalizedSearch(search, key, values = {}) {
  return SUPPORTED_LANGUAGES.some((language) => search === normalize(formatMessageForLanguage(language, key, values)));
}

function getDayName(dayIndex, width = "long") {
  return t(`days.${width}`)[dayIndex];
}

function formatDate(date) {
  return new Intl.DateTimeFormat(getLocale(), { day: "numeric", month: "short" }).format(date);
}

function displayCategory(category) {
  const key = categoryLabelKeys[category];
  return key ? t(key) : category;
}

function displayIngredientGroup(group) {
  const key = groupLabelKeys[group];
  return key ? t(key) : group;
}

function displayProfileName(profileOrId) {
  const profile = typeof profileOrId === "string" ? state.profiles.find((item) => item.id === profileOrId) : profileOrId;
  if (!profile) return t("profile.fallback");

  const mapping = profileLabelKeys[profile.id];
  if (mapping) {
    const knownNames = SUPPORTED_LANGUAGES.map((language) => getTranslation(language, mapping.key));
    if (!profile.name || profile.name === mapping.defaultName || knownNames.includes(profile.name)) {
      return t(mapping.key);
    }
  }

  return profile.name || t("profile.fallback");
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
      sync: normalizeSyncSettings(saved.sync),
    });
  } catch {
    return normalizeState(structuredClone(defaultState));
  }
}

function normalizeState(nextState) {
  nextState.language = SUPPORTED_LANGUAGES.includes(nextState.language) ? nextState.language : defaultState.language;
  nextState.activeFilter = normalizeFilterValue(nextState.activeFilter);
  nextState.sync = normalizeSyncSettings(nextState.sync);
  const profiles = nextState.profiles?.length ? nextState.profiles : structuredClone(defaultState.profiles);
  const hasFamily = profiles.some((profile) => profile.id === "member-family");
  nextState.profiles = (hasFamily ? profiles : [defaultState.profiles[0], ...profiles]).map(normalizeProfile);
  nextState.activeMemberId = nextState.profiles.some((profile) => profile.id === nextState.activeMemberId)
    ? nextState.activeMemberId
    : "member-family";
  nextState.pantry = Array.isArray(nextState.pantry) ? nextState.pantry : [];
  nextState.importText = nextState.importText || "";
  nextState.dishes = mergeDefaultDishes(nextState.dishes.map(normalizeDish));
  return nextState;
}

function mergeDefaultDishes(dishes) {
  const existingIds = new Set(dishes.map((dish) => dish.id));
  const missingDefaults = defaultState.dishes.filter((dish) => !existingIds.has(dish.id)).map((dish) => normalizeDish(structuredClone(dish)));
  return [...dishes, ...missingDefaults];
}

function normalizeSyncSettings(sync = {}) {
  return {
    supabaseUrl: sync.supabaseUrl || "",
    anonKey: sync.anonKey || "",
    email: sync.email || "",
    lastSyncedAt: sync.lastSyncedAt || "",
  };
}

function normalizeFilterValue(filter) {
  if (!filter) return FILTER_ALL;
  if ([FILTER_ALL, FILTER_WISHES, FILTER_MEMBER_WANTS, FILTER_LONG_AGO].includes(filter)) return filter;
  if (filter === "Все") return FILTER_ALL;
  if (filter === "Желания") return FILTER_WISHES;
  if (filter === "Давно не ели") return FILTER_LONG_AGO;
  if (String(filter).endsWith(" хочет") || String(filter).endsWith(" רוצה")) return FILTER_MEMBER_WANTS;
  return filter;
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
  const fallback = defaultState.dishes.find((item) => item.id === dish.id);
  return {
    id: dish.id,
    name: dish.name || fallback?.name || "",
    category: dish.category || fallback?.category || "Основное",
    tags: Array.isArray(dish.tags) ? dish.tags : fallback?.tags || [],
    ingredients: Array.isArray(dish.ingredients) ? dish.ingredients : fallback?.ingredients || [],
    note: dish.note || fallback?.note || "",
    i18n: mergeDishI18n(fallback?.i18n, dish.i18n),
    lastCooked: dish.lastCooked || "",
    wanted: wantedBy.length > 0,
    wantedBy,
  };
}

function mergeDishI18n(fallback = {}, current = {}) {
  return SUPPORTED_LANGUAGES.reduce((result, language) => {
    const entry = current?.[language] || fallback?.[language];
    if (!entry) return result;
    result[language] = {
      name: entry.name || "",
      tags: Array.isArray(entry.tags) ? entry.tags : [],
      ingredients: Array.isArray(entry.ingredients) ? entry.ingredients : [],
      note: entry.note || "",
    };
    return result;
  }, {});
}

function resetDemo() {
  const language = state.language;
  state = structuredClone({ ...defaultState, language });
  saveState();
  showToast(t("toasts.demoReset"));
  render();
}

function showToast(message) {
  clearTimeout(toastTimer);
  els.toast.textContent = message;
  els.toast.classList.add("is-visible");
  toastTimer = setTimeout(() => els.toast.classList.remove("is-visible"), 2200);
}

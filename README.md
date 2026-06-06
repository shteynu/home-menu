# Домашнее меню

PWA-прототип семейного планировщика домашней еды. Работает без сборки: данные хранятся локально в браузере через `localStorage`.

## Запуск

```bash
python3 -m http.server 4173
```

Открыть:

```text
http://localhost:4173
```

## Публикация

Код сохранен в GitHub: `https://github.com/shteynu/home-menu`.

Рабочая версия опубликована на GitHub Pages:

```text
https://shteynu.github.io/home-menu/
```

Репозиторий публичный, поэтому GitHub Pages работает бесплатно. Каждый push в `main` автоматически публикует новую версию.

## Что уже есть

- Меню недели с началом недели в воскресенье.
- Слоты: завтрак, обед, ужин.
- Банк блюд с категориями, тегами, ингредиентами и заметками.
- Переключение интерфейса между русским и ивритом, включая RTL-направление для иврита.
- Bilingual demo-набор: 16 домашних блюд с русскими и ивритскими названиями, тегами, ингредиентами и заметками.
- Семейные профили и отметка блюд как "хочу" по каждому человеку.
- Автоподбор дня или всей недели.
- История последнего приготовления.
- Автоматический список покупок по меню недели.
- Запасы дома: ингредиенты из запасов не попадают в список "купить".
- Импорт блюд из текста с ручным подтверждением кандидатов.
- OCR-импорт из фото через Tesseract.js в браузере.
- Предпочтения профилей: "любит" и "нельзя / не любит" по тегам, ингредиентам или категориям.
- Резервная копия JSON для переноса данных между телефонами.
- Подготовленная облачная синхронизация через Supabase Auth + RLS.
- PWA manifest и service worker для установки на телефон после публикации на HTTPS.

## Облачная синхронизация

Синхронизация работает через Supabase: один семейный email можно открыть на нескольких телефонах. В приложении нужно ввести `Supabase URL`, `anon/public key` и семейный email, затем отправить magic link и войти по ссылке.

В Supabase SQL Editor нужно создать таблицу:

```sql
create table if not exists public.home_menu_states (
  user_id uuid primary key references auth.users(id) on delete cascade,
  state jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.home_menu_states enable row level security;

create policy "Users can read own home menu state"
on public.home_menu_states
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "Users can insert own home menu state"
on public.home_menu_states
for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "Users can update own home menu state"
on public.home_menu_states
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);
```

В Supabase Auth нужно оставить включенным Email provider и добавить GitHub Pages URL в разрешенные redirect URLs:

```text
https://shteynu.github.io/home-menu/
```

## Следующие этапы

1. Добавить настоящие семейные роли: отдельные аккаунты родителей/детей вместо одного общего email.
2. Добавить автослияние конфликтов, если два телефона меняли меню офлайн.
3. Перенести в Expo/React Native, если понадобится полноценная публикация в App Store и Google Play.
4. Улучшить OCR: поворот фото, обрезка области таблицы, подсказки для рукописного текста.

## OCR

OCR использует Tesseract.js из CDN и загружается только при нажатии "Распознать фото". Фото не отправляется на сервер приложения, но для первой загрузки OCR-движка нужен интернет. Результат OCR нужно проверять вручную перед добавлением блюд.

## Ориентир по стоимости

- Только локальный PWA: бесплатно.
- Публичный PWA с бесплатным хостингом и маленькой базой: обычно бесплатно на старте.
- App Store: Apple Developer Program стоит 99 USD в год.
- Google Play: Play Console стоит 25 USD один раз.

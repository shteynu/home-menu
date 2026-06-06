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
- Банк блюд с категориями, тегами, ингредиентами, заметками, фото, порциями, временем готовки, сезонностью и избранным.
- Переключение интерфейса между русским и ивритом, включая RTL-направление для иврита.
- Bilingual demo-набор: 16 домашних блюд с русскими и ивритскими названиями, тегами, ингредиентами и заметками.
- Семейные профили с ролями и отметка блюд как "хочу" по каждому человеку.
- Автоподбор дня или всей недели.
- История последнего приготовления.
- Автоматический список покупок по меню недели.
- Ручные покупки, скрытие купленного и быстрая очистка отметок.
- Запасы дома: ингредиенты из запасов не попадают в список "купить".
- Импорт блюд из текста с ручным подтверждением кандидатов.
- OCR-импорт из фото через Tesseract.js в браузере.
- Предпочтения профилей: "любит" и "нельзя / не любит" по тегам, ингредиентам или категориям.
- Резервная копия JSON для переноса данных между телефонами.
- Подготовленная семейная облачная синхронизация через Supabase Auth + RLS: отдельные email-аккаунты, семья, код приглашения, push/pull и автослияние офлайн-изменений.
- PWA manifest и service worker для установки на телефон после публикации на HTTPS.

## Облачная синхронизация

Синхронизация работает через Supabase. Каждый взрослый входит своим email через magic link. Один пользователь создает семью, получает код приглашения, остальные входят своим email и присоединяются по коду.

В приложении нужно ввести `Supabase URL`, `anon/public key`, email и имя. Затем:

1. Нажать `Отправить ссылку входа` и открыть magic link из email.
2. На первом устройстве нажать `Создать семью`.
3. На остальных устройствах ввести код семьи и нажать `Присоединиться`.
4. Использовать `Сохранить в облако` и `Загрузить из облака`.

Если два телефона меняли меню офлайн, приложение автоматически объединяет блюда, профили, покупки, запасы и слоты недели. Если один и тот же слот недели изменили на двух телефонах, локальный выбор устройства остается главным при merge.

В Supabase SQL Editor нужно создать таблицы:

```sql
create table if not exists public.home_menu_families (
  id uuid primary key,
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  invite_code text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.home_menu_family_members (
  family_id uuid not null references public.home_menu_families(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'adult',
  display_name text not null default '',
  created_at timestamptz not null default now(),
  primary key (family_id, user_id)
);

create table if not exists public.home_menu_family_states (
  family_id uuid primary key references public.home_menu_families(id) on delete cascade,
  state jsonb not null,
  updated_by uuid references auth.users(id) on delete set null,
  updated_at timestamptz not null default now()
);

alter table public.home_menu_families enable row level security;
alter table public.home_menu_family_members enable row level security;
alter table public.home_menu_family_states enable row level security;

create or replace function public.is_home_menu_family_member(family_id_input uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.home_menu_family_members members
    where members.family_id = family_id_input
      and members.user_id = auth.uid()
  );
$$;

grant execute on function public.is_home_menu_family_member(uuid) to authenticated;

create policy "Family members can read families"
on public.home_menu_families
for select
to authenticated
using (public.is_home_menu_family_member(id));

create policy "Users can create their own family"
on public.home_menu_families
for insert
to authenticated
with check ((select auth.uid()) = owner_id);

create policy "Family members can update family"
on public.home_menu_families
for update
to authenticated
using (public.is_home_menu_family_member(id))
with check (public.is_home_menu_family_member(id));

create policy "Users can read own family memberships"
on public.home_menu_family_members
for select
to authenticated
using (user_id = (select auth.uid()));

create policy "Users can join a family"
on public.home_menu_family_members
for insert
to authenticated
with check (user_id = (select auth.uid()));

create policy "Family members can update own membership"
on public.home_menu_family_members
for update
to authenticated
using (user_id = (select auth.uid()))
with check (user_id = (select auth.uid()));

create policy "Family members can read menu state"
on public.home_menu_family_states
for select
to authenticated
using (public.is_home_menu_family_member(family_id));

create policy "Family members can insert menu state"
on public.home_menu_family_states
for insert
to authenticated
with check (public.is_home_menu_family_member(family_id));

create policy "Family members can update menu state"
on public.home_menu_family_states
for update
to authenticated
using (public.is_home_menu_family_member(family_id))
with check (public.is_home_menu_family_member(family_id));

create or replace function public.join_home_menu_family(
  invite_code_input text,
  display_name_input text default '',
  role_input text default 'adult'
)
returns table (
  family_id uuid,
  family_name text,
  invite_code text
)
language plpgsql
security definer
set search_path = public
as $$
begin
  return query
  with target_family as (
    select families.id, families.name, families.invite_code
    from public.home_menu_families families
    where families.invite_code = upper(trim(invite_code_input))
    limit 1
  ),
  inserted_member as (
    insert into public.home_menu_family_members (family_id, user_id, role, display_name)
    select
      target_family.id,
      auth.uid(),
      coalesce(nullif(role_input, ''), 'adult'),
      coalesce(display_name_input, '')
    from target_family
    on conflict (family_id, user_id) do update
      set role = excluded.role,
          display_name = excluded.display_name
    returning home_menu_family_members.family_id
  )
  select target_family.id, target_family.name, target_family.invite_code
  from target_family
  join inserted_member on inserted_member.family_id = target_family.id;
end;
$$;

grant execute on function public.join_home_menu_family(text, text, text) to authenticated;
```

В Supabase Auth нужно оставить включенным Email provider и добавить GitHub Pages URL в разрешенные redirect URLs:

```text
https://shteynu.github.io/home-menu/
```

## Следующие этапы

1. Проверить Supabase на реальном проекте и двух телефонах.
2. Улучшить OCR: поворот фото, обрезка области таблицы, подсказки для рукописного текста.
3. Добавить экспорт списка покупок в WhatsApp/Telegram через Web Share API.

## OCR

OCR использует Tesseract.js из CDN и загружается только при нажатии "Распознать фото". Фото не отправляется на сервер приложения, но для первой загрузки OCR-движка нужен интернет. Результат OCR нужно проверять вручную перед добавлением блюд.

## Ориентир по стоимости

- Только локальный PWA: бесплатно.
- Публичный PWA с бесплатным хостингом и маленькой базой: обычно бесплатно на старте.
- App Store: Apple Developer Program стоит 99 USD в год.
- Google Play: Play Console стоит 25 USD один раз.

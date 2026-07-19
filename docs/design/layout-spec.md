# Layout Spec

## Контейнер

Максимальная ширина: 1240px. Горизонтальные поля: 24px на desktop, 20px на tablet, 16px на mobile.

## Breakpoints

- mobile: до 639px;
- tablet: 640-1023px;
- laptop: 1024-1279px;
- desktop: 1280px+.

## Header

- desktop: 72px, logo 176px, nav по центру, заявка справа;
- mobile: 60px, logo 150px, burger 44px, request icon 44px;
- меню mobile открывается drawer-слоем.

## Секции

- desktop: 64-88px вертикально;
- tablet: 52-64px;
- mobile: 40-48px.

## Hero

Высота первого экрана: `calc(100svh - header)` с минимальной высотой 620px на desktop и 560px на mobile. Внизу должен быть виден край следующей секции.

## Сетки

- Категории: 3 колонки desktop, 2 tablet, 1 mobile.
- Каталог: 3 колонки desktop, 2 tablet, 1 mobile.
- Карточка каталога: изображение 4:3, тело с фиксированной структурой, CTA-ряд без скачка высоты.
- Детальная страница: 7/5 колонок desktop, одна колонка mobile.
- Заявка: 7/5 колонок desktop, одна колонка mobile.

## Изображения

- Hero: 16:9 desktop, 4:5 mobile с object-position center.
- Product card: 4:3.
- Product gallery: 16:10 desktop, 4:3 mobile.
- Category card: 16:9.

## Управление

- кнопки и поля: 44px minimum;
- icon button: 44x44px;
- checkbox: 20x20px;
- drawer: max 420px, 100% ширины на 360px.

## Mobile Catalog

Фильтры спрятаны в drawer, над сеткой остаются сортировка, счетчик, активные фильтры и кнопка открытия фильтров. Карточки показывают 3-4 ключевых характеристики, остальные доступны на детальной странице.

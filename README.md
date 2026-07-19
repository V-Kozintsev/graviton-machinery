# GRAVITON - строительная техника

B2B-каталог строительной техники на React, TypeScript, Vite и Tailwind CSS. Сайт включает каталог машин, детальные карточки, фильтры, заявку на коммерческое предложение, контакты отдела продаж и адаптивный интерфейс для desktop, tablet и mobile.

## Запуск

```bash
pnpm install
pnpm dev
```

## Проверка и сборка

```bash
pnpm lint
pnpm build
pnpm preview
```

## GitHub Pages

Проект настроен для публикации в репозитории `graviton-machinery` по адресу:

```text
https://V-Kozintsev.github.io/graviton-machinery/
```

Маршруты работают через `BrowserRouter` с fallback-страницей `404.html`, поэтому внутренние URL остаются чистыми и открываются на GitHub Pages напрямую. После создания локального git-репозитория:

```bash
git init
git add .
git commit -m "Initial GRAVITON catalog"
git branch -M main
git remote add origin https://github.com/V-Kozintsev/graviton-machinery.git
git push -u origin main
```

Затем включите GitHub Pages в настройках репозитория или дождитесь workflow `.github/workflows/pages.yml`.

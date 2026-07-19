# GRAVITON - строительная техника

Демонстрационный B2B-каталог строительной техники на React, TypeScript, Vite и Tailwind CSS. Компания GRAVITON является вымышленной.

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

Маршруты работают через `HashRouter`, поэтому прямые переходы по внутренним страницам надежны на GitHub Pages. После создания локального git-репозитория:

```bash
git init
git add .
git commit -m "Initial GRAVITON catalog demo"
git branch -M main
git remote add origin https://github.com/V-Kozintsev/graviton-machinery.git
git push -u origin main
```

Затем включите GitHub Pages в настройках репозитория или дождитесь workflow `.github/workflows/pages.yml`.

# Prof Landing

Современный продающий лендинг для онлайн-курсов по профориентации подростков, студентов и взрослых.

## Запуск

```bash
npm install
npm run dev
```

## Сборка

```bash
npm run build
```

## Интеграции

Скопируйте `.env.example` в `.env.local` и заполните переменные:

- `VITE_TELEGRAM_BOT_TOKEN` — токен Telegram-бота.
- `VITE_TELEGRAM_CHAT_ID` — ID чата для заявок.
- `VITE_GA_ID` — Google Analytics Measurement ID.
- `VITE_YM_ID` — ID счетчика Яндекс.Метрики.

Если Telegram-переменные не заданы, форма работает в демо-режиме и логирует заявку в консоль.

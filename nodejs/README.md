# Login-backend 登入後端服務

## 專案簡介 | Project Introduction

這是一個以 Node.js + Express + Passport.js 實作的多平台第三方登入後端範例，支援 Google 及 LINE 登入，方便快速整合於各類 Web 專案。

This is a sample backend for multi-platform third-party login, built with Node.js, Express, and Passport.js. It supports Google and LINE login, making it easy to integrate into various web projects.

---

## 功能特色 | Features

- Google 第三方登入 (OAuth 2.0)
- LINE 第三方登入 (OAuth 2.0)
- Session 管理與登入狀態查詢
- 登出功能
- (首頁有 Facebook 登入選項，但尚未實作)

- Google third-party login (OAuth 2.0)
- LINE third-party login (OAuth 2.0)
- Session management and login status check
- Logout function
- (Facebook login option shown on homepage, but not implemented yet)

---

## 安裝與啟動 | Installation & Start

1. 進入 nodejs 目錄 | Enter the `nodejs` directory

```bash
cd nodejs
```

2. 安裝依賴 | Install dependencies

```bash
yarn install
# 或 or
npm install
```

3. 設定環境變數 | Set up environment variables

請建立 `.env` 檔案，內容如下：
Create a `.env` file with the following content:

```env
PORT=3422
SESSION_SECRET=your_session_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3422/auth/google/callback

LINE_CHANNEL_ID=your_line_channel_id
LINE_CHANNEL_SECRET=your_line_channel_secret
LINE_CALLBACK_URL=http://localhost:3422/auth/line/callback
```

4. 啟動伺服器 | Start the server

```bash
yarn start
# 或 or
npm run start
```

---

## 主要 API 路由 | Main API Routes

- `/auth/google`：Google 登入 | Google login
- `/auth/google/callback`：Google 登入回調 | Google login callback
- `/auth/line`：LINE 登入 | LINE login
- `/auth/line/callback`：LINE 登入回調 | LINE login callback
- `/auth/logout`：登出 | Logout
- `/auth/status`：查詢登入狀態 (回傳 JSON) | Check login status (returns JSON)
- `/profile`：需登入才能存取的個人資料頁 | Profile page (requires login)

---

## 其他說明 | Other Notes

- 本專案僅為範例，使用記憶體暫存用戶資料，請勿用於生產環境。
- Facebook 登入尚未實作。
- 若需串接資料庫，請自行擴充 `passport.ts` 內的用戶查找/建立邏輯。

- This project is for demonstration only, using in-memory user storage. Do not use in production.
- Facebook login is not implemented yet.
- For database integration, please extend the user lookup/creation logic in `passport.ts`.

---

## 授權條款 | License

MIT License

Copyright (c) 2025 SheldonChangL
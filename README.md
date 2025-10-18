# 🎨 CustomCADs — Frontend

The frontend of CustomCADs, built with **Vanilla React + TypeScript + Vite** (+ heavy **TanStack** influence), provides a dynamic, responsive interface for exploring, purchasing, and commissioning 3D CAD models.  
It’s designed to integrate seamlessly with the [**CustomCADs Backend**](https://github.com/NinjataWRLD/CustomCADs-Backend), offering real-time updates, notifications, and a polished user experience.

---

## 🏗️ Architecture & Design

- **Framework:** React (functional components + hooks)
- **Language:** TypeScript (strict mode enabled)
- **Build Tool:** Vite (fast dev server + HMR)
- **Styling:** Tailwind CSS
- **State Management:** Local state, optional React Query for API caching
- **Linting & Formatting:** ESLint + Prettier
- **Testing:** Vitest for unit tests

---

## 🧰 Core Libraries

| Purpose | Library |
|---------|---------|
| Routing | TanStack Router |
| Translations | i18n + react-i18n |
| Reactive Store | TanStack Store |
| 3D Rendering | THREE.js |
| State Management | TanStack Query |
| HTTP / API | Axios |
| Infinite Scroll | TanStack Virtual |
| Notifications & Real-Time | SignalR |
| Forms | TanStack Form |
| Validation Schema | zod |
| Throttler | TanStack Pacer |
| Payment | stripe-js |

---

## 🔑 Features

- Dynamic product pages and gallery
- Filtering & search capabilities
- Real-time notifications & updates via SignalR
- Full integration with backend API
- Internationalization-ready
- SEO-friendly page titles & meta

---

## 📂 Directory Structure

```plaintext
CustomCADs-Frontend/
├── .github/            # CI/CD
├── .terraform/         # IaC
├── eslint-cofnigs/     # ESLint
├── public/             # FavIcon
├── src/
│   ├── api/            # API calls & request/response DTOs
│   ├── app/            # Pages & Components
│   ├── assets/         # Static assets
│   ├── constants/      # Validation/Global Constants
│   ├── contexts/       # React Contexts
│   ├── hooks/          # Custom React hooks
│   ├── locales/        # i18n configs & translation resources
│   ├── routes/         # TanStack Router routes
│   ├── stores/         # TanStack Stores
│   ├── types/          # Global type definitions
│   ├── utils/          # Utility functions
│   └── index.css       # Global styles
│   ├── main.tsx        # App Entrypoint
│   ├── router.tsx      # TanStack Router
├── tsconfig.json
├── vite.config.ts
├── package.json
└── README.md

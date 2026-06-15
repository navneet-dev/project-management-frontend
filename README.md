# Frontend PM — Project Management App

A modern, lightweight frontend for a Project Management application built with React and Vite. It manages Projects and Tasks (full CRUD) and communicates with a Laravel 12 API backend using Axios.

## Quick Overview

- **Frontend:** React + Vite
- **Backend:** Laravel 12 API (separate repository)
- **HTTP client:** Axios
- **Features:** Create, Read, Update, Delete for Projects and Tasks; authentication-ready structure; client-side routing

## Features

- Projects: create, edit, list, delete
- Tasks: create, edit, assign to projects, delete
- Responsive UI with simple layout and navigation
- Organized code structure: pages, components, context, services

## Tech Stack

- React (JSX)
- Vite (fast dev server & build)
- Axios for API calls
- Tailwind / CSS (project styles folder)

## Prerequisites

- Node.js 18+ and `npm` (or `yarn`)
- Running Laravel 12 API backend (see backend repo for setup)

## Setup & Run (Frontend)

1. Install dependencies

```
npm install
```

2. Configure environment

Create a `.env` (or `.env.local`) and set the API base URL used by the frontend. Example:

```
VITE_API_BASE_URL=http://localhost:8000/api
```

3. Start the dev server

```
npm run dev
```

4. Build for production

```
npm run build
```

## Backend (Laravel API)

This frontend expects a Laravel 12 API that exposes RESTful endpoints for projects and tasks (for example `/api/projects`, `/api/tasks`). Ensure the backend is running and `VITE_API_BASE_URL` points to it.

## Project Structure (important folders)

- `src/pages` — route pages (Dashboard, Projects, Tasks, Auth)
- `src/components` — shared UI components (Navbar, Layouts, ProtectedRoute)
- `src/services` — Axios instance and API helper functions
- `src/context` — React context for global state (auth, app state)
- `src/assets` / `src/styles` — static assets and styles

## Contributing

Contributions are welcome. Open an issue or submit a PR with a clear description and tests or screenshots when applicable.

## License

MIT

---

If you want, I can also add an example `.env.example`, or update `src/services/axios.js` to show how `VITE_API_BASE_URL` is used.

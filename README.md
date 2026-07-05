# Astrea

A scalable **full-stack productivity platform** built with **React, TypeScript, Node.js, Express, and MongoDB**, designed to make task management more engaging through **gamification**.

Astrea combines structured task organization with a **points-based economy** and an **in-app rewards shop**, helping users stay motivated while maintaining a fast, modern developer experience.

![Astrea shop panel](https://i.ibb.co/dJWqbFpT/Astrea-tasks.png)
![Astrea shop panel](https://i.ibb.co/TBnJ3k53/Astrea-shop.png)

---

## Features

### Productivity Core

* Create, edit, organize, and complete tasks
* Task completion tracking with real-time UI updates
* Calendar/date-based task scheduling support
* Drag-and-drop task interactions via `@dnd-kit`
* Responsive task views for desktop and mobile

### Gamification System

* Earn points for completing tasks
* Built-in rewards economy to reinforce habits
* In-app shop where users can spend earned points
* Motivation loops designed to improve consistency and engagement

### Rewards Shop

* Seedable shop inventory (`seed:shop`)
* Structured reward catalog powered by MongoDB
* Shared types between backend and frontend for shop entities

### Authentication & Security

* JWT-based authentication
* Secure password hashing with `bcrypt`
* Cookie-based session support
* CORS and request validation middleware

### Developer Experience

* Monorepo workspace architecture
* Shared package for reusable schemas/types
* Type-safe validation with `zod`
* Fast frontend development with **Vite + React 19**
* Backend runtime powered by **Bun**
* Dockerized MongoDB workflow

---

## Tech Stack

### Frontend (`astrea-frontend`)

* **React 19**
* **TypeScript**
* **Vite**
* **React Router v7**
* **React Query**
* **React Hook Form + Zod**
* **Tailwind CSS v4**
* **Headless UI + Radix UI**
* **Framer Motion / Motion**
* **Dnd Kit**

### Backend (`astrea-backend`)

* **Bun**
* **Node.js-compatible Express 5 API**
* **MongoDB + Mongoose**
* **JWT Authentication**
* **Zod validation**
* **Cookie Parser + CORS**

### Shared Package (`astrea-shared`)

* Reusable **Zod schemas**
* Shared DTOs and validation models
* Cross-package TypeScript types

---

## Monorepo Structure

```bash
astrea/
├── package.json
├── packages/
│   ├── astrea-frontend/
│   ├── astrea-backend/
│   └── astrea-shared/
```

---

## Getting Started

### 1) Clone the repository

```bash
git clone <your-repository-url>
cd astrea
```

### 2) Install dependencies

```bash
npm install
```

### 3) Environment Variables

Create a `.env` file inside `packages/astrea-backend/`.

```bash
MONGO_URI="mongodb://localhost:27017/astrea"
PORT="8080"
JWT_SECRET="your-super-secure-access-secret"
JWT_REFRESH_SECRET="your-super-secure-refresh-secret"
JWT_ACCESS_TOKEN_EXPIRES_IN="120m"
```

Variable Reference
* MONGO_URI → MongoDB connection string
* PORT → backend server port
* JWT_SECRET → secret used for signing access tokens
* JWT_REFRESH_SECRET → secret used for signing refresh tokens
* JWT_ACCESS_TOKEN_EXPIRES_IN → access token lifetime (example: 120m)

### 4) Start development environment

This runs:

* backend
* frontend
* MongoDB via Docker

```bash
npm run dev
```

Root script:

```json
"dev": "concurrently --names \"backend,frontend,mongodb\" \"npm run dev -w=astrea-backend\" \"npm run dev -w=astrea-frontend\" \"docker compose up -d\""
```

---


## Architecture Highlights

### Shared Type Safety

The project uses a dedicated **`astrea-shared` workspace package** to centralize:

* validation schemas
* API contracts
* DTOs
* shop/task data models

This ensures the frontend and backend always stay aligned.

### Scalable Backend Design

The backend is structured around:

* modular Express route handlers
* reusable middleware
* MongoDB document models
* isolated utilities like shop seeding

This makes the API easy to scale as more gamification systems, analytics, or social features are introduced.

### Gamification-Driven UX

Astrea’s core differentiator is its **motivation-first system design**:

* tasks directly influence rewards
* progress is reinforced with points
* rewards create positive feedback loops
* shop purchases provide tangible achievement milestones

---

## Future Improvements

Potential roadmap ideas:

* streak systems
* achievements & badges
* recurring tasks
* daily quests
* leaderboards
* team collaboration
* push/email reminders
* productivity analytics dashboard
* AI-assisted task prioritization


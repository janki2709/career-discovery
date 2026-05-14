# Career Discovery Platform

A full-stack career discovery and learning platform built with Next.js and Supabase.

The platform helps users explore career paths, discover required skills, access curated learning resources, track learning progress, and save careers for future reference.

This project was built as a full-stack technical assessment.

---

# Live Demo

Frontend:
https://career-discovery-orcin.vercel.app/

Backend API:
https://career-discovery-orcin.vercel.app/api/careers

GitHub Repository:
https://github.com/janki2709/career-discovery

---

# Test Credentials

Email:
j.padiya25@gmail.com

Password:
Test@12345

---

# Tech Stack

## Frontend
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- React Hook Form
- Zod
- TanStack Query
- Lucide Icons
- Sonner Toasts

## Backend
- Next.js App Router API Routes
- Supabase
- PostgreSQL
- Supabase Auth
- Supabase SSR

## Deployment
- Vercel
- Supabase Cloud Database

---

# Features

## Public Features

- Browse careers
- View detailed career information
- Explore career categories
- View required skills for each career
- Access curated learning resources
- Filter careers by category

## Career Paths

- Explore structured career paths
- View detailed career path roadmaps
- Understand learning progression
- Navigate through role-based growth paths

### Routes

- `/career-path`
- `/career-path/[slug]`

---

## Industries

- Browse industries
- Explore careers within industries
- Navigate industry-specific opportunities

### Routes

- `/industries`
- `/industries/[slug]`

---

## Courses & Learning Resources

- Explore curated learning resources
- Browse skill-based learning material
- Access external learning content

### Routes

- `/courses`

---

## Search

Global search functionality supports:

- Careers
- Career paths
- Courses
- Industries

### Features

- Debounced search
- Optimized querying
- Fast UI interactions

---

## Authenticated User Features

- Email/password authentication
- Save careers
- Track learning progress
- Persist user progress
- Personalized dashboard

---

## Admin Features

- Create careers
- Update careers
- Delete careers
- Create categories
- Update categories
- Delete categories
- Create skills
- Update skills
- Delete skills

Note:
This assessment intentionally does not implement RBAC (Role-Based Access Control). Any authenticated user can access admin functionality for MVP simplicity.

---

# Authentication Architecture

This project uses Supabase Authentication with email/password authentication.

## Authentication Flow

- Users authenticate using Supabase Auth.
- Supabase manages JWT-based sessions.
- Session cookies are persisted securely.
- Server-side authentication uses Supabase SSR helpers.
- Protected routes validate authenticated users server-side.
- Unauthenticated users receive a 401 Unauthorized response.

Example:

const {
  data: { user },
} = await supabase.auth.getUser()


# API Documentation

## Base URL

`https://career-discovery-orcin.vercel.app/api`

---

# Public Endpoints

## Get all careers

**GET** `/api/careers`

Returns all available careers.

---

## Get career details

**GET** `/api/careers/:id`

Returns detailed information about a specific career.

---

## Get career skills

**GET** `/api/careers/:id/skills`

Returns skills associated with a specific career.

---

## Get learning resources

**GET** `/api/careers/:id/learn`

Returns curated learning resources for a specific career.

---

## Get categories

**GET** `/api/categories`

Returns all categories.

---

## Get careers by category

**GET** `/api/categories/:id`

Returns careers associated with a category.

---

## Get skills

**GET** `/api/skills`

Returns all skills.

---

# Authenticated Endpoints

## User Progress

**GET** `/api/progress`

Returns:

* total resources
* completed resources
* progress percentage

for authenticated users.

Unauthenticated users receive:

```json
{
  "error": "Unauthorized"
}
```

---

## Saved Careers

**GET** `/api/saved-careers`

Returns saved careers for authenticated users.


## Bookmarks

Users can:

- Bookmark careers
- Save learning resources
- Manage saved content

### Routes

- `/bookmarks`

---

## Career Paths

`/api/career-path`

Supports:

* GET

---

## Career Path Details

`/api/career-path/[slug]`

Supports:

* GET

---

## Industries

`/api/industries`

Supports:

* GET

---

## Industry Details

`/api/industries/[slug]`

Supports:

* GET

---

## Courses & Learning Resources

`/api/courses`

Supports:

* GET

---

## Search

`/api/search`

Supports:

* GET

Supports searching across:

* Careers
* Career paths
* Industries
* Courses

---

## Bookmarks

`/api/bookmarks`

Supports:

* GET
* POST

---

## Remove Bookmark

`/api/bookmarks/[resourceId]`

Supports:

* DELETE


---

# Admin Endpoints

## Careers Admin

`/api/admin/careers`

Supports:

* GET
* POST

---

## Career CRUD

`/api/admin/careers/:id`

Supports:

* GET
* PUT
* DELETE

---

## Categories Admin

`/api/admin/categories`

Supports:

* GET
* POST

---

## Category CRUD

`/api/admin/categories/:id`

Supports:

* GET
* PUT
* DELETE

---

## Skills Admin

`/api/admin/skills`

Supports:

* GET
* POST

---

## Skill CRUD

`/api/admin/skills/:id`

Supports:

* GET
* PUT
* DELETE

## Project Structure

```txt
src/
├── app/
│   ├── (app)/
│   ├── (auth)/
│   ├── admin/
│   ├── api/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── ui/
│   └── shared-components/
│
├── lib/
│   ├── supabase/
│   ├── types.ts
│   ├── utils.ts
│   └── validations.ts
│
├── services/
│   └── auth.ts
│
└── middleware.ts
```


# Database Architecture

The project uses PostgreSQL via Supabase.

# Main Tables

## careers

Stores career information.

## categories

Stores career categories.

## skills

Stores skills associated with careers.

## career_skills

Many-to-many relationship between careers and skills.

## learning_resources

Stores external learning resources linked to skills.

## saved_careers

Stores bookmarked careers per user.

## profiles

Stores user profile information.

# Database Schema / Migrations

Database schema is included in:

database/schema.sql


The schema was managed directly through Supabase SQL editor during development.

# Seed / Sample Data

Sample seed data is included in:

database/seed.sql

Includes:

- categories
- careers
- skills
- learning resources
- relationship mappings

---

# Architecture Explanation

## Frontend Architecture

- Next.js App Router
- Server Components + Client Components
- Reusable UI components using shadcn/ui
- Form validation using Zod + React Hook Form

## Backend Architecture

- API routes implemented using Next.js Route Handlers
- Supabase used as:
  - PostgreSQL database
  - authentication provider
  - backend service layer

# Data Flow

```txt
Client UI
   ↓
Next.js API Routes
   ↓
Supabase Client
   ↓
PostgreSQL Database
```


# Local Development

## Install dependencies

```bash
npm install
```

## Run development server

```bash
npm run dev
```

## Build production app

```bash
npm run build
```

---

# Deployment

The application is deployed on:

- Vercel
- Supabase

---

## Performance Optimizations

Significant infrastructure and frontend optimizations were implemented.

### Infrastructure Improvements

#### Database Migration

The Supabase database region was migrated:

* AP Northeast (Tokyo) → Mumbai

#### Deployment Migration

The Vercel deployment region was migrated:

* Washington DC → Mumbai

This reduced average request latency from approximately:

* ~2 seconds → ~600ms

The earlier latency was primarily caused by cross-region network round trips between the frontend deployment and database infrastructure.

---

### Frontend Optimizations

* Debounced global search
* Improved dashboard rendering
* Reduced unnecessary requests
* Optimized component structure
* Better data fetching patterns

---

### Future Performance Improvements

Potential additional optimizations include:

* CDN edge caching
* Redis/server-side caching
* Route segment caching
* Streaming React Server Components
* Query optimization
* Pagination

---

# Future Improvements

Potential future improvements include:

- RBAC admin authorization
- Search and advanced filtering
- Career recommendation engine
- AI-assisted learning roadmap generation
- Resource completion analytics
- Pagination and caching improvements
- Automated migration tooling

---

# Author

Janki Padiya

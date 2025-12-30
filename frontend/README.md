# mypost but github

A mini social media app inspired by GitHub + Pantip.

Live demo: https://mypost-but-github.vercel.app

## Features

- Clerk authentication (sign in / sign up)
- Create posts (rich text editor), optional tags
- Feed with tabs (For You / Following)
- Like + Star posts
- Comments
- Follow / unfollow users
- User profiles (overview + starred)
- Search users and posts (Atlas Search when available; falls back to Prisma contains query)

## Tech stack

- Next.js (App Router) + React
- Clerk (auth + user profiles)
- Prisma + MongoDB
- TanStack Query (client data fetching/caching)
- Tailwind CSS + shadcn/ui + Radix UI
- BlockNote editor

## Getting started

### 1) Install

```bash
npm install
```

### 2) Environment variables

Copy `.env.example` to `.env` and set the values you actually use.

This project uses Clerk (not NextAuth). If your `.env.example` still contains NextAuth variables, you can ignore them.

Required:

```bash
DATABASE_URL="mongodb+srv://USER:PASSWORD@HOST/dbname?retryWrites=true&w=majority"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_..."
CLERK_SECRET_KEY="sk_..."
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/"
```

### 3) Prisma

This repo runs `prisma generate` on install. To sync the schema to your database:

```bash
npx prisma db push
```

### 4) Run locally

```bash
npm run dev
```

Open http://localhost:3000

## Scripts

- `npm run dev` - start dev server
- `npm run build` - production build
- `npm run start` - start production server
- `npm run lint` - run Next.js lint

## MongoDB Atlas Search (optional)

Post search uses a MongoDB Atlas `$search` autocomplete pipeline when available (index name: `default` on the `Post` collection). If Atlas Search is not configured, the app automatically falls back to a Prisma `contains` search.

## Screenshots

![Home](public/screenshot.png)

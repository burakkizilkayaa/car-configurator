# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Purpose

This is a **web design agency system**. The workflow is:
1. Take an existing website as a reference (URL or screenshot)
2. Replicate its layout, structure, and functionality as a full-stack Next.js project
3. Customise the design (colors, typography, spacing, branding) and content for the client

## Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Package Manager**: pnpm

## Workflow for Cloning a Website

1. Inspect the reference site — capture layout, color palette, fonts, component hierarchy
2. Scaffold the Next.js project with `pnpm create next-app --typescript --tailwind --app`
3. Install shadcn: `pnpm dlx shadcn@latest init`
4. Build page by page, component by component — match structure first, then style
5. Replace all copy and assets with client-specific content
6. Customise the color/typography tokens in `tailwind.config.ts` and `globals.css`

## Key Conventions

- Use App Router (`app/` directory) for all routing — no `pages/`
- Co-locate components under `app/` or in `components/` at the root
- Use shadcn/ui primitives as the base for all interactive components; extend, don't reinvent
- Keep client components (`"use client"`) minimal — push interactivity to leaf nodes
- Tailwind utility classes only — no separate CSS modules unless strictly necessary

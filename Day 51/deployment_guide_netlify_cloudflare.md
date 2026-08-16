# Day 51 - Web Application Deployment Guide

## 1. Frontend Deployment on Netlify & Cloudflare Pages
- **Netlify**: Drag-and-drop the `dist` or `build` output folder or connect your GitHub repository for continuous integration.
- **Cloudflare Pages**: Connect GitHub repository, set framework preset to `Create React App` or `Vite`, build command `npm run build`.

## 2. Backend & Database Hosting Options
- **Render / Railway**: Host Node.js & Express REST APIs with environment variable secrets (`PORT`, `DB_HOST`, `JWT_SECRET`).
- **PlanetScale / Aiven / Supabase**: Managed SQL database connection string configuration.

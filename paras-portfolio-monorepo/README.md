
# Paras Portfolio Monorepo

This repo contains:
- `portfolio/` — Dark-themed Next.js portfolio site
- `url-shortener/` — Next.js + Prisma + SQLite short links (with QR)
- `collab-board/` — Realtime sticky-note board (Socket.IO)
- `notifier/` — Express API + BullMQ + Redis (docker-compose) with Swagger docs

## How to use
- Push each folder to its own GitHub repo **or** keep as one monorepo.
- After deploying each project, edit `portfolio/lib/projects.ts` to link to your live demos and repos.

## Suggested push commands (per project)
```bash
cd portfolio
git init
git add .
git commit -m "init: dark portfolio"
git branch -M main
git remote add origin https://github.com/<your-handle>/portfolio.git
git push -u origin main
```

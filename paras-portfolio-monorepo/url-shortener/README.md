
# URL Shortener

## Quickstart
```bash
cp .env.example .env
npm install
npm run migrate
npm run dev
```

- Creates short links and QR codes.
- Uses Prisma with SQLite (dev-only). For production, switch to Postgres.
- Live path is `/{slug}` which redirects and increments click count.

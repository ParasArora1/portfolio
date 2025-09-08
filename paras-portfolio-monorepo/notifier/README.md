
# Notifier (Express + BullMQ + Redis)

## Quickstart (Docker)
```bash
docker compose up --build
# API: http://localhost:3001 , Docs: http://localhost:3001/docs
# Worker logs appear in console
```

## Manual
```bash
npm install
REDIS_URL=redis://127.0.0.1:6379 npm run dev
# in another terminal
REDIS_URL=redis://127.0.0.1:6379 npm run worker
```

### Send a test
```bash
curl -X POST http://localhost:3001/send -H "Content-Type: application/json"       -d '{"channel":"email","to":"demo@example.com","template":"welcome","params":{"name":"Paras"}}'
```

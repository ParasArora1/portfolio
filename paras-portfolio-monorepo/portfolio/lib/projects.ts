
export type Project = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  stack: string[];
  live?: string;
  repo?: string;
  docs?: string;
};

export const projects: Project[] = [
  {
    slug: "url-shortener",
    name: "URL Shortener @ <100ms",
    category: "Backend + Web",
    summary: "Short links with QR codes using Next.js, Prisma, and SQLite (demo-ready).",
    stack: ["Next.js", "TypeScript", "Prisma", "SQLite"],
    live: "#",
    repo: "#"
  },
  {
    slug: "collab-board",
    name: "Realtime Collaboration Board",
    category: "Realtime",
    summary: "Sticky-note board with multi-user presence via Socket.IO.",
    stack: ["React", "Vite", "Express", "Socket.IO"],
    live: "#",
    repo: "#"
  },
  {
    slug: "notifier",
    name: "Notification Service",
    category: "Queues",
    summary: "REST API + worker with retries/DLQ using BullMQ and Redis (docker-compose).",
    stack: ["Express", "BullMQ", "Redis", "Swagger"],
    live: "#",
    repo: "#",
    docs: "#"
  }
];

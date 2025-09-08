
import { Worker } from "bullmq";
import { connection } from "./queue.js";

const worker = new Worker("notifications", async (job) => {
  const { channel, to, template, params } = job.data;
  // Simulate send
  console.log(`[worker] sending ${channel} to ${to} with template '${template}' and params ${JSON.stringify(params)}`);
  // TODO: integrate real providers (e.g., SendGrid/Twilio/Firebase)
  return { ok: true };
}, { connection });

worker.on("completed", (job) => console.log(`[worker] job ${job.id} completed`));
worker.on("failed", (job, err) => console.error(`[worker] job ${job?.id} failed`, err));

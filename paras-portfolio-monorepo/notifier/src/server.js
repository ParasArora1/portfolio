
import express from "express";
import cors from "cors";
import { notificationsQueue } from "./queue.js";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

const app = express();
app.use(cors());
app.use(express.json());

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: { title: "Notifier API", version: "1.0.0" }
  },
  apis: ["./src/server.js"]
});

/**
 * @openapi
 * /send:
 *   post:
 *     summary: Enqueue a notification
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               channel: { type: string, enum: ["email","sms","push"] }
 *               to: { type: string }
 *               template: { type: string }
 *               params: { type: object }
 *     responses:
 *       200: { description: "Enqueued" }
 */
app.post("/send", async (req, res) => {
  const { channel, to, template, params } = req.body || {};
  if (!channel || !to || !template) return res.status(400).json({ error: "Missing fields" });
  const j = await notificationsQueue.add("send", { channel, to, template, params }, { attempts: 3, backoff: { type: "exponential", delay: 1000 } });
  res.json({ enqueued: true, id: j.id });
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (_, res) => res.send("Notifier API OK"));
const port = process.env.PORT || 3001;
app.listen(port, () => console.log("Notifier API on", port));

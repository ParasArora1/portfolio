
import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
app.use(cors());
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

// Simple in-memory board state
const notes = new Map(); // id -> { x, y, text, color }

io.on("connection", (socket) => {
  socket.emit("init", Array.from(notes.entries()));

  socket.on("upsert-note", (note) => {
    notes.set(note.id, note);
    socket.broadcast.emit("upsert-note", note);
  });

  socket.on("delete-note", (id) => {
    notes.delete(id);
    socket.broadcast.emit("delete-note", id);
  });
});

app.get("/", (_, res) => res.send("Collab server OK"));
const port = process.env.PORT || 4000;
httpServer.listen(port, () => console.log("Collab server on", port));


import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_SERVER_URL || "http://localhost:4000");

type Note = { id: string; x: number; y: number; text: string; color: string };

export default function App() {
  const [notes, setNotes] = useState<Map<string, Note>>(new Map());
  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.on("init", (entries: [string, Note][]) => {
      setNotes(new Map(entries));
    });
    socket.on("upsert-note", (note: Note) => {
      setNotes(n => new Map(n.set(note.id, note)));
    });
    socket.on("delete-note", (id: string) => {
      setNotes(n => { n.delete(id); return new Map(n); });
    });
    return () => {
      socket.off("init"); socket.off("upsert-note"); socket.off("delete-note");
    };
  }, []);

  function addNote() {
    const id = crypto.randomUUID();
    const note: Note = { id, x: 40, y: 40, text: "New note", color: "#fde047" };
    socket.emit("upsert-note", note);
    setNotes(n => new Map(n.set(id, note)));
  }

  function onDrag(id: string, e: React.MouseEvent) {
    const startX = e.clientX, startY = e.clientY;
    const note = notes.get(id)!;
    const initX = note.x, initY = note.y;
    function move(ev: MouseEvent) {
      const nx = initX + (ev.clientX - startX);
      const ny = initY + (ev.clientY - startY);
      const updated = { ...note, x: nx, y: ny };
      setNotes(n => new Map(n.set(id, updated)));
    }
    function up() {
      const updated = notes.get(id)!;
      socket.emit("upsert-note", updated);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    }
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  }

  function updateText(id: string, text: string) {
    const note = { ...(notes.get(id)!), text };
    setNotes(n => new Map(n.set(id, note)));
    socket.emit("upsert-note", note);
  }

  function remove(id: string) {
    socket.emit("delete-note", id);
    setNotes(n => { n.delete(id); return new Map(n); });
  }

  return (
    <div style={{ background: "#0a0a0a", color: "#e5e5e5", height: "100vh" }}>
      <div style={{ padding: 12, borderBottom: "1px solid #262626", display: "flex", justifyContent: "space-between" }}>
        <div>Realtime Collab Board</div>
        <button onClick={addNote} style={{ border: "1px solid #3f3f46", padding: "6px 12px", borderRadius: 12 }}>Add Note</button>
      </div>
      <div ref={boardRef} style={{ position: "relative", width: "100%", height: "calc(100vh - 48px)" }}>
        {Array.from(notes.values()).map(n => (
          <div key={n.id}
               onMouseDown={(e) => onDrag(n.id, e)}
               style={{ position: "absolute", left: n.x, top: n.y, width: 200, background: n.color, color: "#111827", borderRadius: 12, padding: 10, cursor: "move", boxShadow:"0 4px 24px rgba(0,0,0,0.3)" }}>
            <textarea value={n.text} onChange={(e) => updateText(n.id, e.target.value)}
                      style={{ width: "100%", background: "transparent", border: "none", outline: "none", resize: "none" }} />
            <div style={{ textAlign: "right" }}>
              <button onClick={() => remove(n.id)} style={{ fontSize: 12, color: "#111827" }}>delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

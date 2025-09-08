
"use client";
import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<{ slug: string; qr: string } | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url })
    });
    const data = await res.json();
    setResult(data);
    setLoading(false);
  }

  return (
    <div className="max-w-xl mx-auto card">
      <h1 className="text-2xl font-semibold">URL Shortener</h1>
      <form onSubmit={onSubmit} className="mt-4 flex gap-2">
        <input className="flex-1 rounded-xl bg-neutral-950 border border-neutral-700 px-3 py-2"
               placeholder="https://example.com/some/long/path"
               value={url} onChange={e => setUrl(e.target.value)} />
        <button className="btn" disabled={loading}>{loading ? "..." : "Shorten"}</button>
      </form>
      {result && (
        <div className="mt-6 space-y-2">
          <div>Short link: <a href={`/${result.slug}`}>{window.location.origin}/{result.slug}</a></div>
          <div className="text-sm text-neutral-400">Scan QR:</div>
          <img src={result.qr} alt="QR code" className="rounded-lg border border-neutral-800" />
        </div>
      )}
    </div>
  );
}


import Link from "next/link";
import { Project } from "../lib/projects";

export default function ProjectCard({ p }: { p: Project }) {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{p.name}</h3>
        <div className="text-xs rounded-full border border-neutral-700 px-2 py-0.5">{p.category}</div>
      </div>
      <p className="mt-2 text-neutral-300">{p.summary}</p>
      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        {p.stack.map(s => <span key={s} className="rounded-lg border border-neutral-700 px-2 py-1">{s}</span>)}
      </div>
      <div className="mt-4 flex gap-3 text-sm">
        <Link className="btn" href={p.live || '#'}>Live</Link>
        <Link className="btn" href={p.repo || '#'}>GitHub</Link>
        {p.docs && <Link className="btn" href={p.docs}>API Docs</Link>}
      </div>
    </div>
  );
}

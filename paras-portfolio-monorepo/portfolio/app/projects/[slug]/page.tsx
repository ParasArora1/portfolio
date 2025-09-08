
import { projects } from "../../../lib/projects";

export default function ProjectDetail({ params }: { params: { slug: string } }) {
  const p = projects.find(x => x.slug === params.slug);
  if (!p) return <div className="text-neutral-400">Project not found.</div>;
  return (
    <article className="prose-invert">
      <h1 className="text-3xl font-bold">{p.name}</h1>
      <p className="mt-2 text-neutral-300">{p.summary}</p>
      <ul className="mt-4 text-sm flex flex-wrap gap-2">
        {p.stack.map(s => <li key={s} className="rounded-lg border border-neutral-700 px-2 py-1">{s}</li>)}
      </ul>
      <div className="mt-6">
        <p>Live: {p.live ? <a href={p.live}>link</a> : "coming soon"}</p>
        <p>GitHub: {p.repo ? <a href={p.repo}>repo</a> : "coming soon"}</p>
        {p.docs && <p>Docs: <a href={p.docs}>API docs</a></p>}
      </div>
    </article>
  );
}

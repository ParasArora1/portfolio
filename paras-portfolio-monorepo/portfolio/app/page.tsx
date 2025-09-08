
import Link from "next/link";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../lib/projects";

export default function Home() {
  return (
    <section className="space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Software Engineer • Freelancer</h1>
        <p className="text-neutral-300 max-w-2xl mx-auto">
          I build reliable, scalable apps — from realtime frontends to high-throughput backends.
          Here are a few demos you can try live.
        </p>
        <div className="flex justify-center gap-3">
          <a className="btn" href="#projects">View Projects</a>
          <a className="btn" href="#contact">Contact</a>
        </div>
      </div>

      <div id="projects" className="grid gap-6 md:grid-cols-2">
        {projects.map(p => <ProjectCard key={p.slug} p={p} />)}
      </div>

      <div id="contact" className="card">
        <h2 className="text-xl font-semibold">Contact</h2>
        <p className="mt-2 text-neutral-300">Email: you@example.com · GitHub: yourhandle · Upwork: upwork.com/fl/yourname</p>
      </div>
    </section>
  );
}

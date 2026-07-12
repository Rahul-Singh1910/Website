import { useEffect, useState } from "react";
import { getProjects } from "../api";

export default function ProjectsList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getProjects()
      .then(setProjects)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading projects...</p>;

  return (
    <section className="projects" id="projects">
      <h2>Projects</h2>
      {error && (
        <p className="section-error">
          Couldn't load projects right now — the server may be waking up. Try refreshing in a moment.
        </p>
      )}
      <div className="projects-grid">
        {projects.map((p) => (
          <div key={p.id} className="project-card">
            {p.image_url && <img src={p.image_url} alt={p.title} />}
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <div className="tech-tags">
              {p.tech_stack.map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
            <div className="project-links">
              {p.github_url && <a href={p.github_url} target="_blank" rel="noreferrer">GitHub</a>}
              {p.live_url && <a href={p.live_url} target="_blank" rel="noreferrer">Live Demo</a>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
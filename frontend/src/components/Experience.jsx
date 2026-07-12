import { useEffect, useState } from "react";
import { getExperience } from "../api";

export default function Experience() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getExperience()
      .then(setItems)
      .finally(() => setLoading(false));
  }, []);

  if (loading || items.length === 0) return null;

  return (
    <section className="experience" id="experience">
      <h2>Experience</h2>
      <div className="timeline">
        {items.map((e) => (
          <div key={e.id} className="timeline-item">
            <div className="timeline-marker" />
            <div className="timeline-content">
              <div className="timeline-header">
                <h3>{e.role}</h3>
                <span className="timeline-duration">{e.duration}</span>
              </div>
              <p className="timeline-company">{e.company}</p>
              <p className="timeline-description">{e.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

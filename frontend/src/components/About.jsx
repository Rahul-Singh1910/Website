const FACTS = [
  { label: "Domain", value: "Computer Science & Engineering – Data Science" },
  { label: "Languages", value: "English, Hindi, Bengali" },
  { label: "Visualization", value: "Tableau, Power BI" },
  { label: "Other Skills", value: "Excel, AWS (Beginner), R" },
  { label: "Interests", value: "Travelling, Cricket, Cooking, Teaching" },
];

const SKILLS = [
  { name: "Python", level: 85 },
  { name: "SQL", level: 80 },
  { name: "Power BI", level: 80 },
  { name: "Machine Learning", level: 80 },
  { name: "Java", level: 70 },
];

export default function About() {
  return (
    <section className="about" id="about">
      <h2>About</h2>
      <p className="about-bio">
        Data analytics enthusiast with experience in Python, automation, and financial
        data analysis. Passionate about building data-driven solutions, extracting
        meaningful insights, and leveraging technology to solve real-world business
        challenges. Skilled in transforming complex datasets into actionable insights
        through analytical thinking, visualization, and problem-solving.
      </p>

      <div className="about-facts">
        {FACTS.map((f) => (
          <div className="about-fact" key={f.label}>
            <span className="about-fact-label">{f.label}</span>
            <span className="about-fact-value">{f.value}</span>
          </div>
        ))}
      </div>

      <div className="skills-bars">
        {SKILLS.map((s) => (
          <div className="skill-bar" key={s.name}>
            <div className="skill-bar-header">
              <span>{s.name}</span>
              <span className="skill-bar-pct">{s.level}%</span>
            </div>
            <div className="skill-bar-track">
              <div className="skill-bar-fill" style={{ width: `${s.level}%` }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
const EDUCATION = [
  {
    degree: "Bachelor of Technology — Computer Science (Data Science)",
    school: "MCKV Institute of Engineering",
    duration: "2021 - 2025",
    detail: "CGPA: 9.44",
  },
  {
    degree: "Higher Secondary School",
    school: "Shree Jain Vidyalaya For Boys",
    duration: "2019 - 2020",
    detail: "Percentage: 84.4%",
  },
  {
    degree: "Secondary School",
    school: "Shree Jain Vidyalaya For Boys",
    duration: "2017 - 2018",
    detail: "Percentage: 79.57%",
  },
];

export default function Education() {
  return (
    <section className="education" id="education">
      <h2>Education</h2>
      <div className="timeline">
        {EDUCATION.map((e) => (
          <div key={e.degree} className="timeline-item">
            <div className="timeline-marker" />
            <div className="timeline-content">
              <div className="timeline-header">
                <h3>{e.degree}</h3>
                <span className="timeline-duration">{e.duration}</span>
              </div>
              <p className="timeline-company">{e.school}</p>
              <p className="timeline-description">{e.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
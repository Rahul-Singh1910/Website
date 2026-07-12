import { logVisit } from "../api";

export default function Resume() {
  const handleDownload = () => {
    logVisit("/resume-download", "general").catch(() => {});
  };

  return (
    <section className="resume" id="resume">
      <h2>Resume</h2>
      <p className="resume-note">
        Full breakdown of experience, projects, and skills.
      </p>
      
      <a href="/resumes/Rahul_Singh_CV.pdf"
          download
          onClick={handleDownload}
          className="resume-btn"
        >
          Download Resume
        </a>
    </section>
  );
}
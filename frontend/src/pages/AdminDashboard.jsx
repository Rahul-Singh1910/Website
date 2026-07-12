import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getProjects,
  createProject,
  deleteProject,
  getExperience,
  createExperience,
  deleteExperience,
  getStats,
  getMessages,
  markMessageRead,
  deleteMessage,
} from "../api";

export default function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [experience, setExperience] = useState([]);
  const [stats, setStats] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newProject, setNewProject] = useState({ title: "", description: "", tech_stack: "" });
  const [newExperience, setNewExperience] = useState({ role: "", company: "", duration: "", description: "" });
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("admin_token")) {
      navigate("/admin");
      return;
    }
    getProjects().then(setProjects);
    getExperience().then(setExperience);
    getStats().then(setStats).catch(() => {});
    getMessages().then(setMessages).catch(() => {});
  }, [navigate]);

  const handleAddProject = async (e) => {
    e.preventDefault();
    const created = await createProject({
      ...newProject,
      tech_stack: newProject.tech_stack.split(",").map((t) => t.trim()),
    });
    setProjects([created, ...projects]);
    setNewProject({ title: "", description: "", tech_stack: "" });
  };

  const handleDeleteProject = async (id) => {
    await deleteProject(id);
    setProjects(projects.filter((p) => p.id !== id));
  };

  const handleAddExperience = async (e) => {
    e.preventDefault();
    const created = await createExperience({
      ...newExperience,
      order: experience.length,
    });
    setExperience([...experience, created]);
    setNewExperience({ role: "", company: "", duration: "", description: "" });
  };

  const handleDeleteExperience = async (id) => {
    await deleteExperience(id);
    setExperience(experience.filter((e) => e.id !== id));
  };

  const handleMarkRead = async (id) => {
    const updated = await markMessageRead(id);
    setMessages(messages.map((m) => (m.id === id ? updated : m)));
  };
  const handleDeleteMessage = async (id) => {
    await deleteMessage(id);
    setMessages(messages.filter((m) => m.id !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate("/admin");
  };

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h2>Admin Dashboard</h2>
        <button onClick={handleLogout}>Log out</button>
      </div>

      {stats && (
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-number">{stats.total_visits}</span>
            <span className="stat-label">Total Visits</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">
              {Object.values(stats.resume_downloads).reduce((a, b) => a + b, 0)}
            </span>
            <span className="stat-label">Resume Downloads</span>
          </div>
        </div>
      )}

      <h3 className="section-subhead">
        Messages {unreadCount > 0 && <span className="unread-badge">{unreadCount} new</span>}
      </h3>
      <div className="messages-panel">
        {messages.length === 0 && <p className="messages-empty">No messages yet.</p>}
        {messages.map((m) => (
          <div key={m.id} className={`message-card${m.read ? "" : " message-unread"}`}>
            <div className="message-header">
              <strong>{m.name}</strong>
              <span className="message-date">{new Date(m.created_at).toLocaleString()}</span>
            </div>
            <a href={`mailto:${m.email}`} className="message-email">{m.email}</a>
            <p className="message-body">{m.message}</p>
            <div className="message-actions">
              {!m.read && (
                <button className="message-mark-read" onClick={() => handleMarkRead(m.id)}>
                  Mark as read
                </button>
              )}
              <button className="message-delete" onClick={() => handleDeleteMessage(m.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div onSubmit={handleAddProject} className="add-project-form">
        <h3>Add Project</h3>
        <input
          placeholder="Title"
          value={newProject.title}
          onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={newProject.description}
          onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
        />
        <input
          placeholder="Tech stack (comma separated)"
          value={newProject.tech_stack}
          onChange={(e) => setNewProject({ ...newProject, tech_stack: e.target.value })}
        />
        <button onClick={handleAddProject}>Add Project</button>
      </div>

      <div className="project-list">
        {projects.map((p) => (
          <div key={p.id} className="project-row">
            <strong>{p.title}</strong>
            <button onClick={() => handleDeleteProject(p.id)}>Delete</button>
          </div>
        ))}
      </div>

      <div onSubmit={handleAddExperience} className="add-project-form">
        <h3>Add Experience</h3>
        <input
          placeholder="Role (e.g. Assistant Research Analyst)"
          value={newExperience.role}
          onChange={(e) => setNewExperience({ ...newExperience, role: e.target.value })}
        />
        <input
          placeholder="Company (e.g. Junomoneta Finsol Pvt. Ltd. | Surat, India)"
          value={newExperience.company}
          onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
        />
        <input
          placeholder="Duration (e.g. 2025 - 2026)"
          value={newExperience.duration}
          onChange={(e) => setNewExperience({ ...newExperience, duration: e.target.value })}
        />
        <textarea
          placeholder="Description (use • for bullet points, one per line)"
          rows={5}
          value={newExperience.description}
          onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
        />
        <button onClick={handleAddExperience}>Add Experience</button>
      </div>

      <div className="project-list">
        {experience.map((e) => (
          <div key={e.id} className="project-row">
            <strong>{e.role} — {e.company}</strong>
            <button onClick={() => handleDeleteExperience(e.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
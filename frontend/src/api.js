import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({ baseURL: API_BASE });

// Attach JWT token (if logged in as admin) to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("admin_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getProjects = () => api.get("/projects").then((r) => r.data);
export const createProject = (data) => api.post("/projects", data).then((r) => r.data);
export const updateProject = (id, data) => api.put(`/projects/${id}`, data).then((r) => r.data);
export const deleteProject = (id) => api.delete(`/projects/${id}`).then((r) => r.data);

export const getBlogPosts = () => api.get("/blog").then((r) => r.data);
export const getBlogPost = (slug) => api.get(`/blog/${slug}`).then((r) => r.data);

export const getExperience = () => api.get("/experience").then((r) => r.data);
export const createExperience = (data) => api.post("/experience", data).then((r) => r.data);
export const deleteExperience = (id) => api.delete(`/experience/${id}`).then((r) => r.data);

export const submitContactForm = (data) => api.post("/contact", data).then((r) => r.data);
export const getMessages = () => api.get("/contact").then((r) => r.data);
export const markMessageRead = (id) => api.patch(`/contact/${id}/read`).then((r) => r.data);
export const deleteMessage = (id) => api.delete(`/contact/${id}`).then((r) => r.data);

export const login = (username, password) =>
  api.post("/auth/login", { username, password }).then((r) => r.data);

export const logVisit = (page, resumeVariant) =>
  api.post("/analytics/visit", { page, resume_variant: resumeVariant }).then((r) => r.data);

export const getStats = () => api.get("/analytics/stats").then((r) => r.data);

export default api;

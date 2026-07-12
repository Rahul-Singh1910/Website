import { useState } from "react";
import { submitContactForm } from "../api";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await submitContactForm(form);
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <section className="contact">
      <h2>Get in touch</h2>
      <div className="contact-card" onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Your email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Message"
          rows={5}
          value={form.message}
          onChange={handleChange}
          required
        />
        <button onClick={handleSubmit} disabled={status === "sending"}>
          {status === "sending" ? "Sending..." : "Send message"}
        </button>
        {status === "sent" && <p className="success">Thanks! I'll get back to you soon.</p>}
        {status === "error" && <p className="error">Something went wrong. Try again.</p>}
      </div>
    </section>
  );
}
const LINKS = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/rahul-singh-91223921a",
    icon: (
      <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.1 1 2.48 1s2.5 1.12 2.5 2.5zM.24 8.25h4.5V23h-4.5V8.25zM8.5 8.25h4.31v2.01h.06c.6-1.13 2.07-2.33 4.26-2.33 4.55 0 5.39 3 5.39 6.9V23h-4.5v-6.98c0-1.67-.03-3.81-2.32-3.81-2.33 0-2.69 1.82-2.69 3.69V23h-4.5V8.25z" />
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/Rahul-Singh1910",
    icon: (
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.04-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.08 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22 0 1.6-.02 2.89-.02 3.29 0 .32.22.7.83.58C20.56 21.8 24 17.31 24 12c0-6.63-5.37-12-12-12z" />
    ),
  },
  {
    label: "Email",
    href: "mailto:rahulsingh19.ind@gmail.com",
    icon: (
      <path d="M2 4h20a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 2v.01L12 13 22 6.01V6H2zm20 3.24-9.06 6.3a1.6 1.6 0 0 1-1.88 0L2 9.24V18h20V9.24z" />
    ),
  },
  {
    label: "Phone",
    href: "tel:+916290516034",
    icon: (
      <path d="M6.6 10.8c1.3 2.6 3.4 4.7 6 6l2-2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.3 21 3 13.7 3 4.9c0-.6.4-1 1-1h3.8c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.4 0 .8-.2 1l-2 2z" />
    ),
  },
];

export default function Social({ compact = false }) {
  return (
    <div className={`social-row${compact ? " social-row-compact" : ""}`}>
      {LINKS.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target={l.href.startsWith("http") ? "_blank" : undefined}
          rel="noreferrer"
          className="social-link"
          aria-label={l.label}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            {l.icon}
          </svg>
          {!compact && <span>{l.label}</span>}
        </a>
      ))}
    </div>
  );
}

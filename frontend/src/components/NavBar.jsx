import { useEffect, useRef, useState } from "react";

const LINKS = [
  { href: "#about", label: "About", id: "about" },
  { href: "#experience", label: "Experience", id: "experience" },
  { href: "#education", label: "Education", id: "education" },
  { href: "#projects", label: "Projects", id: "projects" },
  { href: "#resume", label: "Resume", id: "resume" },
  { href: "#contact", label: "Contact", id: "contact" },
];

const MOBILE_LINKS = [{ href: "#top", label: "Home", id: "top" }, ...LINKS];

export default function NavBar() {
  const [active, setActive] = useState("top");
  const [menuOpen, setMenuOpen] = useState(false);
  const linksContainerRef = useRef(null);
  const linkRefs = useRef({});
  const hasMounted = useRef(false);

  useEffect(() => {
    let ticking = false;
    const THRESHOLD = 160;

    const updateActive = () => {
      const sections = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean);
      let current = "top";
      for (const sec of sections) {
        const rect = sec.getBoundingClientRect();
        if (rect.top <= THRESHOLD) {
          current = sec.id;
        }
      }
      setActive(current);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateActive);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateActive();

    const retryTimer = setInterval(updateActive, 500);
    setTimeout(() => clearInterval(retryTimer), 5000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(retryTimer);
    };
  }, []);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    const link = linkRefs.current[active];
    const container = linksContainerRef.current;
    if (link && container) {
      const target = link.offsetLeft - container.clientWidth / 2 + link.clientWidth / 2;
      container.scrollTo({ left: target, behavior: "smooth" });
    }
  }, [active]);

  return (
    <nav className="site-nav">
      <div className="site-nav-inner">
        
        <a  href="#top"
          className={`site-nav-home${active === "top" ? " active" : ""}`}
        >
          Home
        </a>

        <div className="site-nav-links" ref={linksContainerRef}>
          {LINKS.map((l) => {
            const isActive = active === l.id;
            return (
              
              <a  key={l.href}
                href={l.href}
                ref={(el) => (linkRefs.current[l.id] = el)}
                className={isActive ? "active" : ""}
              >
                {l.label}
              </a>
            );
          })}
        </div>

        <button
          className="site-nav-toggle"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {menuOpen && (
        <div className="site-nav-mobile-panel">
          {MOBILE_LINKS.map((l) => {
            const isActive = active === l.id;
            return (
              <a
                key={l.href}
                href={l.href}
                className={isActive ? "active" : ""}
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </a>
            );
          })}
        </div>
      )}
    </nav>
  );
}
import { useState, useEffect } from "react";

const TITLES = [
  "Data Analyst",
  "Software Professional",
  "Python Developer",
  "Budding Engineer",
];

const TYPE_SPEED = 110;
const DELETE_SPEED = 60;
const PAUSE_TIME = 2200;

export default function RotatingTitle() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reduceMotion) return;

    const current = TITLES[index];
    let timeout;

    if (!deleting && text.length < current.length) {
      timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), TYPE_SPEED);
    } else if (!deleting && text.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), PAUSE_TIME);
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), DELETE_SPEED);
    } else if (deleting && text.length === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % TITLES.length);
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, index, reduceMotion]);

  if (reduceMotion) {
    return <span className="eyebrow">{TITLES[0]}</span>;
  }

  return (
    <span className="eyebrow">
      {text}
      <span className="eyebrow-cursor">|</span>
    </span>
  );
}
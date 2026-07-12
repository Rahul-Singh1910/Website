const SKILLS = [
  { label: "PYTHON", status: "Core" },
  { label: "SQL", status: "Core" },
  { label: "PANDAS / NUMPY", status: "Core" },
  { label: "POWER BI", status: "Learning" },
  { label: "TABLEAU", status: "Core" },
  { label: "NISM-VIII", status: "Certified" },
  { label: "REST APIs", status: "Core" },
  { label: "EXCEL / VBA", status: "Core" },
];

function TickerRow() {
  return (
    <>
      {SKILLS.map((s) => (
        <span className="ticker-item" key={s.label}>
          <span className="ticker-symbol">{s.label}</span>
          <span className="ticker-change">{s.status}</span>
        </span>
      ))}
    </>
  );
}

export default function Ticker() {
  return (
    <div className="ticker">
      <div className="ticker-track">
        <TickerRow />
        <TickerRow />
      </div>
    </div>
  );
}

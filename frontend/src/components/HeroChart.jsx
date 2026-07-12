export default function HeroChart() {
  return (
    <svg
      className="hero-chart"
      viewBox="0 0 1000 260"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="chartFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--gain)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="var(--gain)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        className="hero-chart-fill"
        d="M0,220 L60,205 L120,215 L180,180 L240,190 L300,150 L360,165 L420,120 L480,135 L540,95 L600,110 L660,70 L720,85 L780,50 L840,60 L900,25 L1000,10 L1000,260 L0,260 Z"
        fill="url(#chartFade)"
      />
      <path
        className="hero-chart-line"
        d="M0,220 L60,205 L120,215 L180,180 L240,190 L300,150 L360,165 L420,120 L480,135 L540,95 L600,110 L660,70 L720,85 L780,50 L840,60 L900,25 L1000,10"
        fill="none"
        stroke="var(--gain)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

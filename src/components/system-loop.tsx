const STEPS = [
  { n: "01", title: "Prove", x: 50, y: 18 },
  { n: "02", title: "Recognize", x: 82, y: 50 },
  { n: "03", title: "Read", x: 50, y: 82 },
  { n: "04", title: "Improve", x: 18, y: 50 },
] as const;

export function SystemLoop() {
  return (
    <figure className="mx-auto max-w-md" aria-label="Four-move feedback loop">
      <svg viewBox="0 0 100 100" className="h-auto w-full" role="img">
        <title>Prove, recognize, read, improve — one loop</title>
        <circle
          cx="50"
          cy="50"
          r="28"
          fill="none"
          stroke="#2190DC"
          strokeWidth="0.8"
          strokeDasharray="3 2"
          opacity="0.45"
        />
        <circle cx="50" cy="50" r="14" fill="#e6f4fc" />
        <text
          x="50"
          y="49"
          textAnchor="middle"
          fill="#145684"
          fontSize="4.2"
          fontWeight="700"
          fontFamily="Space Grotesk, sans-serif"
        >
          The
        </text>
        <text
          x="50"
          y="54.5"
          textAnchor="middle"
          fill="#145684"
          fontSize="4.2"
          fontWeight="700"
          fontFamily="Space Grotesk, sans-serif"
        >
          system
        </text>
        {STEPS.map((step) => (
          <g key={step.n}>
            <circle cx={step.x} cy={step.y} r="11" fill="#09090b" />
            <text
              x={step.x}
              y={step.y - 1.6}
              textAnchor="middle"
              fill="#2190DC"
              fontSize="3.2"
              fontWeight="700"
              fontFamily="Space Grotesk, sans-serif"
            >
              {step.n}
            </text>
            <text
              x={step.x}
              y={step.y + 3.4}
              textAnchor="middle"
              fill="#ffffff"
              fontSize="3.4"
              fontWeight="700"
              fontFamily="Space Grotesk, sans-serif"
            >
              {step.title}
            </text>
          </g>
        ))}
      </svg>
      <figcaption className="mt-3 text-center font-accent text-xs font-bold tracking-[0.14em] text-neutral-500 uppercase">
        Budget scales from the loop. Channel count does not.
      </figcaption>
    </figure>
  );
}

import React from 'react';

function formatTime(totalSeconds) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
}

export default function Timer({ secondsLeft, totalSeconds }) {
  const pct = Math.max(0, Math.min(1, secondsLeft / totalSeconds));
  const urgent = pct <= 0.1;
  const warning = pct <= 0.25 && !urgent;

  const ringColor = urgent ? '#f43f5e' : warning ? '#f59e0b' : '#10b981';
  const circumference = 2 * Math.PI * 18;
  const dash = circumference * pct;

  return (
    <div
      className={`flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1.5 ${
        urgent ? 'animate-pulse' : ''
      }`}
      role="timer"
      aria-live="polite"
      aria-label={`Time remaining ${formatTime(secondsLeft)}`}
    >
      <svg width="24" height="24" viewBox="0 0 40 40" className="shrink-0">
        <circle cx="20" cy="20" r="18" fill="none" stroke="#334155" strokeWidth="4" />
        <circle
          cx="20"
          cy="20"
          r="18"
          fill="none"
          stroke={ringColor}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference}`}
          transform="rotate(-90 20 20)"
          style={{ transition: 'stroke-dasharray 1s linear, stroke 0.3s' }}
        />
      </svg>
      <span
        className="font-display font-bold tabular-nums text-sm sm:text-base"
        style={{ color: ringColor }}
      >
        {formatTime(secondsLeft)}
      </span>
    </div>
  );
}

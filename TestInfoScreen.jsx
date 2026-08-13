import React from 'react';
import { QUESTION_POOLS } from '../questions.js';

// Step 3: raw breakdown of the chosen test — total MCQs, time limit, and
// subject-wise weightage — then Start Test. The portal-wide access gate
// already ran before this screen was reachable, so there's no per-test
// lock here.
export default function TestInfoScreen({ institution, category, onStart, onBack }) {
  const poolCounts = category.sections.map((s) => (QUESTION_POOLS[s.pool] || []).length);
  const totalPractice = poolCounts.reduce((a, b) => a + b, 0);

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 px-6 py-16 text-white font-body sm:px-10">
      <div className="mx-auto w-full max-w-xl">
        <button onClick={onBack} className="text-sm text-slate-500 transition hover:text-white">
          &larr; Back
        </button>

        <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          {category.name}
        </h1>
        <p className="mt-1 text-sm text-slate-500">{institution.name}</p>

        <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-slate-800 bg-slate-800">
          <Stat label="Total MCQs" value={category.officialTotal} />
          <Stat label="Time Limit" value={`${category.officialMinutes} min`} />
        </div>

        <h2 className="mt-10 text-sm font-semibold uppercase tracking-wide text-slate-500">
          Subject-wise Weightage
        </h2>
        <div className="mt-4 border-t border-slate-800">
          {category.sections.map((s) => (
            <div
              key={s.key}
              className="flex items-center justify-between border-b border-slate-800 py-3.5"
            >
              <span className="text-base">{s.label}</span>
              <span className="font-display font-bold text-emerald-400">{s.officialCount} MCQs</span>
            </div>
          ))}
        </div>

        <p className="mt-4 text-xs text-slate-500">
          This practice test currently has {totalPractice} question{totalPractice === 1 ? '' : 's'} loaded.
          Add more in src/questions.js to match the full official count.
        </p>

        <div className="mt-10">
          <button
            onClick={onStart}
            className="w-full rounded-lg bg-emerald-500 px-6 py-3.5 text-center font-display text-base font-bold text-slate-950 transition hover:bg-emerald-400"
          >
            Start Test
          </button>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="bg-slate-950 px-5 py-5">
      <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 font-display text-2xl font-extrabold">{value}</p>
    </div>
  );
}

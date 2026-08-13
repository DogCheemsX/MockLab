import React from 'react';
import Chevron from './Chevron.jsx';

// Step 2: shows the streams/categories for whichever institution was picked
// on the landing screen (e.g. NTS NAT -> Pre-Engineering, Pre-Medical, ...).
// The portal-wide access gate (see AccessGate.jsx) already ran before the
// user could reach this screen, so every stream listed here is open.
export default function TestSelector({ institution, onSelectCategory, onBack }) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 px-6 py-16 text-white font-body sm:px-10">
      <div className="mx-auto w-full max-w-xl">
        <button onClick={onBack} className="text-sm text-slate-500 transition hover:text-white">
          &larr; Back
        </button>

        <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          {institution.name}
        </h1>

        <div className="mt-10 border-t border-slate-800">
          {institution.categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat)}
              className="flex w-full items-center justify-between gap-4 border-b border-slate-800 py-5 text-left transition hover:bg-slate-900 hover:px-2"
            >
              <span className="text-lg font-medium">{cat.name}</span>
              <Chevron />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

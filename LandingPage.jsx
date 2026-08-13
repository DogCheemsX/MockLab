import React from 'react';
import { INSTITUTIONS } from '../config.js';
import Chevron from './Chevron.jsx';

export default function LandingPage({ onSelectInstitution }) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 px-6 py-16 text-white font-body sm:px-10">
      <div className="mx-auto w-full max-w-xl">
        <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          Select Test
        </h1>

        <div className="mt-10 border-t border-slate-800">
          {INSTITUTIONS.map((inst) => (
            <button
              key={inst.id}
              onClick={() => onSelectInstitution(inst)}
              className="flex w-full items-center justify-between border-b border-slate-800 py-5 text-left text-lg font-medium transition hover:bg-slate-900 hover:px-2"
            >
              <span>{inst.name}</span>
              <Chevron />
            </button>
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <img
            src="/logo.png"
            alt="MockLab"
            className="w-40 opacity-90 sm:w-48"
          />
        </div>
      </div>
    </div>
  );
}

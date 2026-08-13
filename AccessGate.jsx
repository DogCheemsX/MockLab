import React, { useState } from 'react';
import { PAYMENT_INFO } from '../config.js';

const STEPS = [
  {
    title: `Pay Rs. ${PAYMENT_INFO.price} to ${PAYMENT_INFO.method}`,
    detail: `${PAYMENT_INFO.accountTitle} \u2014 ${PAYMENT_INFO.walletNumber}`,
  },
  {
    title: 'Send the payment receipt on WhatsApp',
    detail: `${PAYMENT_INFO.walletNumber}`,
  },
  {
    title: 'Get your access code back on WhatsApp',
    detail: 'Enter it below to unlock every entrance test.',
  },
];

export default function AccessGate({ onUnlock }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const waMessage = encodeURIComponent(
    `Hi MockLab, I've paid Rs. ${PAYMENT_INFO.price} for portal access. Sharing my payment receipt now.`
  );
  const waLink = `https://wa.me/${PAYMENT_INFO.whatsappNumber}?text=${waMessage}`;

  function handleSubmit(e) {
    e.preventDefault();
    const ok = onUnlock(code);
    if (!ok) setError('That code doesn\u2019t look right. Double-check it and try again.');
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 px-6 py-16 text-white font-body sm:px-10">
      <div className="mx-auto w-full max-w-xl">
        <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          Unlock MockLab
        </h1>

        <ol className="mt-10 space-y-6">
          {STEPS.map((s, i) => (
            <li key={i} className="flex gap-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500 font-display text-sm font-bold text-slate-950">
                {i + 1}
              </span>
              <div>
                <p className="font-semibold">{s.title}</p>
                <p className="mt-0.5 text-sm text-slate-400">{s.detail}</p>
              </div>
            </li>
          ))}
        </ol>

        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 flex w-full items-center justify-center rounded-lg border border-slate-700 px-6 py-3 text-sm font-semibold transition hover:border-emerald-400"
        >
          Open WhatsApp
        </a>

        <form onSubmit={handleSubmit} className="mt-10 border-t border-slate-800 pt-10">
          <label htmlFor="access-code" className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Access Code
          </label>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <input
              id="access-code"
              autoFocus
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter access code"
              className="flex-1 rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-emerald-400"
            />
            <button
              type="submit"
              className="rounded-lg bg-emerald-500 px-6 py-3 font-display font-bold text-slate-950 transition hover:bg-emerald-400"
            >
              Unlock Portal
            </button>
          </div>
          {error && <p className="mt-3 text-sm text-rose-400">{error}</p>}
        </form>
      </div>
    </div>
  );
}

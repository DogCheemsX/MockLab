import React, { useState } from 'react';

export default function ResultsScreen({ result, onRetake, onBackToTests, onBackHome }) {
  const [showReview, setShowReview] = useState(false);
  const percentage = result.totalQuestions
    ? Math.round((result.correctCount / result.totalQuestions) * 100)
    : 0;
  const passed = percentage >= 50;

  const minutes = Math.floor(result.timeTakenSeconds / 60);
  const seconds = result.timeTakenSeconds % 60;

  const sectionKeys = Object.keys(result.sectionBreakdown).filter(
    (k) => result.sectionBreakdown[k].total > 0
  );

  return (
    <div className="min-h-screen bg-slate-950 px-5 py-10 text-white font-body">
      <div className="mx-auto max-w-3xl">
        {result.autoSubmitted && (
          <div className="mb-6 rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-300">
            Time ran out &mdash; your test was submitted automatically.
          </div>
        )}

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            {result.testTitle} &middot; Result
          </p>
          <div className="mt-4 flex items-center justify-center">
            <div
              className={`flex h-32 w-32 flex-col items-center justify-center rounded-full border-4 ${
                passed ? 'border-emerald-500' : 'border-rose-500'
              }`}
            >
              <span className="font-display text-3xl font-extrabold">{percentage}%</span>
              <span className="text-xs text-slate-400">Score</span>
            </div>
          </div>
          <p className={`mt-4 font-display text-lg font-bold ${passed ? 'text-emerald-400' : 'text-rose-400'}`}>
            {passed ? 'Solid attempt \u2014 you\u2019re on track' : 'Keep practicing \u2014 you\u2019ll get there'}
          </p>
          <p className="mt-1 text-sm text-slate-400">
            {result.correctCount} correct out of {result.totalQuestions} &middot; {result.unansweredCount} left blank &middot; time used {minutes}m {seconds}s
          </p>
        </div>

        {/* Section breakdown */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {sectionKeys.map((key) => {
            const b = result.sectionBreakdown[key];
            const pct = b.total ? Math.round((b.correct / b.total) * 100) : 0;
            return (
              <div key={key} className="rounded-xl border border-slate-800 bg-slate-900 p-5">
                <p className="font-display text-sm font-bold text-indigo-400">{b.label}</p>
                <p className="mt-2 font-display text-2xl font-extrabold">
                  {b.correct}/{b.total}
                </p>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                  <div className="h-full bg-emerald-500" style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={() => setShowReview((v) => !v)}
            className="rounded-lg border border-slate-700 px-5 py-2.5 text-sm font-semibold transition hover:border-indigo-400 hover:text-indigo-300"
          >
            {showReview ? 'Hide answer review' : 'Review answers'}
          </button>
          <button
            onClick={onRetake}
            className="rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-emerald-400"
          >
            Retake this test
          </button>
          <button
            onClick={onBackToTests}
            className="rounded-lg border border-slate-700 px-5 py-2.5 text-sm font-semibold transition hover:border-slate-500"
          >
            Choose another stream
          </button>
          <button
            onClick={onBackHome}
            className="rounded-lg border border-slate-700 px-5 py-2.5 text-sm font-semibold transition hover:border-slate-500"
          >
            Back to home
          </button>
        </div>

        {showReview && (
          <div className="mt-8 space-y-4">
            {result.detail.map((q, i) => (
              <div
                key={q.id}
                className={`rounded-xl border p-5 ${
                  q.isCorrect ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-rose-500/30 bg-rose-500/5'
                }`}
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Question {i + 1} &middot; {q.sectionLabel}
                </p>
                <p className="mt-2 font-semibold">{q.question}</p>
                <div className="mt-3 space-y-1.5 text-sm">
                  {q.options.map((opt, oi) => {
                    const isCorrectOpt = oi === q.correctIndex;
                    const isSelected = oi === q.selected;
                    return (
                      <p
                        key={oi}
                        className={`rounded-md px-3 py-1.5 ${
                          isCorrectOpt
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : isSelected
                            ? 'bg-rose-500/20 text-rose-300'
                            : 'text-slate-400'
                        }`}
                      >
                        {String.fromCharCode(65 + oi)}. {opt}
                        {isCorrectOpt && ' \u2713 correct answer'}
                        {isSelected && !isCorrectOpt && ' \u2014 your answer'}
                      </p>
                    );
                  })}
                  {q.selected === undefined && (
                    <p className="text-xs italic text-slate-500">You left this one blank.</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

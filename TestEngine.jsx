import React, { useEffect, useMemo, useRef, useState } from 'react';
import Timer from './Timer.jsx';

// `test` shape expected here:
// {
//   title: string,
//   timeLimitMinutes: number,
//   sections: [ { key, label, questions: [ {id, question, options, correctIndex} ] } ]
// }
export default function TestEngine({ test, onSubmit, onExit }) {
  // Flatten all sections into one ordered list of questions, tagging each
  // with its section key/label, so navigation/index math stays simple.
  const questions = useMemo(() => {
    const list = [];
    test.sections.forEach((section) => {
      section.questions.forEach((q) => {
        list.push({ ...q, sectionKey: section.key, sectionLabel: section.label });
      });
    });
    return list;
  }, [test]);

  const totalSeconds = test.timeLimitMinutes * 60;
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { questionId: optionIndex }
  const [marked, setMarked] = useState({}); // { questionId: true }
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const submittedRef = useRef(false);

  const currentQuestion = questions[currentIndex];

  // Countdown
  useEffect(() => {
    if (submittedRef.current) return;
    if (secondsLeft <= 0) {
      handleSubmit(true);
      return;
    }
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft]);

  function selectOption(optionIndex) {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionIndex }));
  }

  function toggleMark() {
    setMarked((prev) => ({ ...prev, [currentQuestion.id]: !prev[currentQuestion.id] }));
  }

  function goTo(index) {
    if (index >= 0 && index < questions.length) setCurrentIndex(index);
  }

  function jumpToSection(sectionKey) {
    const firstIndex = questions.findIndex((q) => q.sectionKey === sectionKey);
    if (firstIndex !== -1) setCurrentIndex(firstIndex);
  }

  function statusOf(question) {
    const isAnswered = answers[question.id] !== undefined;
    const isMarked = !!marked[question.id];
    if (isMarked) return 'marked';
    if (isAnswered) return 'answered';
    return 'unanswered';
  }

  function handleSubmit(auto = false) {
    if (submittedRef.current) return;
    submittedRef.current = true;

    let correctCount = 0;
    const sectionBreakdown = {};
    test.sections.forEach((s) => {
      sectionBreakdown[s.key] = { label: s.label, correct: 0, total: 0 };
    });

    const detail = questions.map((q) => {
      const selected = answers[q.id];
      const isCorrect = selected === q.correctIndex;
      if (isCorrect) correctCount += 1;
      sectionBreakdown[q.sectionKey].total += 1;
      if (isCorrect) sectionBreakdown[q.sectionKey].correct += 1;
      return {
        id: q.id,
        sectionKey: q.sectionKey,
        sectionLabel: q.sectionLabel,
        question: q.question,
        options: q.options,
        correctIndex: q.correctIndex,
        selected,
        isCorrect,
      };
    });

    onSubmit({
      testTitle: test.title,
      totalQuestions: questions.length,
      correctCount,
      unansweredCount: questions.length - Object.keys(answers).length,
      sectionBreakdown,
      autoSubmitted: auto,
      timeTakenSeconds: totalSeconds - secondsLeft,
      detail,
    });
  }

  if (!currentQuestion) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-center text-white">
        <p>This test has no questions loaded yet. Add some in src/questions.js.</p>
      </div>
    );
  }

  const answeredCount = Object.keys(answers).length;

  return (
    <div className="min-h-screen bg-slate-950 text-white font-body">
      {/* Top bar */}
      <div className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <div className="min-w-0">
            <p className="truncate font-display text-sm font-bold sm:text-base">{test.title}</p>
            <p className="text-xs text-slate-500">
              {answeredCount} of {questions.length} answered
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Timer secondsLeft={secondsLeft} totalSeconds={totalSeconds} />
            <button
              onClick={() => setShowSubmitConfirm(true)}
              className="rounded-lg bg-emerald-500 px-3 py-2 text-xs font-bold text-slate-950 transition hover:bg-emerald-400 sm:px-4 sm:text-sm"
            >
              Submit Test
            </button>
          </div>
        </div>
        {/* Section tabs */}
        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 pb-2">
          {test.sections.filter((s) => s.questions.length > 0).map((s) => (
            <button
              key={s.key}
              onClick={() => jumpToSection(s.key)}
              className={`whitespace-nowrap rounded-t-lg px-4 py-2 text-sm font-semibold transition ${
                currentQuestion.sectionKey === s.key
                  ? 'bg-indigo-500 text-white'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-[1fr_280px]">
        {/* Question area */}
        <div>
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <div className="flex items-start justify-between gap-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-indigo-400">
                Question {currentIndex + 1} of {questions.length} &middot; {currentQuestion.sectionLabel}
              </p>
              <button
                onClick={toggleMark}
                className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold transition ${
                  marked[currentQuestion.id]
                    ? 'border-indigo-400 bg-indigo-500/20 text-indigo-300'
                    : 'border-slate-700 text-slate-400 hover:border-indigo-400 hover:text-indigo-300'
                }`}
              >
                {marked[currentQuestion.id] ? 'Marked for review' : 'Mark for review'}
              </button>
            </div>

            <h2 className="mt-4 font-display text-lg font-semibold leading-relaxed sm:text-xl">
              {currentQuestion.question}
            </h2>

            <div className="mt-6 space-y-3">
              {currentQuestion.options.map((opt, i) => {
                const selected = answers[currentQuestion.id] === i;
                return (
                  <button
                    key={i}
                    onClick={() => selectOption(i)}
                    className={`flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm transition sm:text-base ${
                      selected
                        ? 'border-emerald-400 bg-emerald-500/10 text-white'
                        : 'border-slate-700 bg-slate-950 text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold ${
                        selected
                          ? 'border-emerald-400 bg-emerald-400 text-slate-950'
                          : 'border-slate-600 text-slate-400'
                      }`}
                    >
                      {String.fromCharCode(65 + i)}
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Prev / Next */}
          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={() => goTo(currentIndex - 1)}
              disabled={currentIndex === 0}
              className="rounded-lg border border-slate-700 px-5 py-2.5 text-sm font-semibold transition hover:border-slate-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              &larr; Previous
            </button>
            <button
              onClick={() => goTo(currentIndex + 1)}
              disabled={currentIndex === questions.length - 1}
              className="rounded-lg bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next &rarr;
            </button>
          </div>
        </div>

        {/* Question palette */}
        <aside className="h-fit rounded-xl border border-slate-800 bg-slate-900 p-5 lg:sticky lg:top-32">
          <p className="font-display text-sm font-bold">Question Palette</p>
          <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-400">
            <Legend color="bg-emerald-500" label="Answered" />
            <Legend color="bg-indigo-500" label="Marked" />
            <Legend color="bg-slate-700" label="Unanswered" />
          </div>
          <div className="thin-scroll mt-4 grid max-h-[420px] grid-cols-6 gap-2 overflow-y-auto pr-1 lg:grid-cols-5">
            {questions.map((q, i) => {
              const status = statusOf(q);
              const isCurrent = i === currentIndex;
              const styles = {
                answered: 'bg-emerald-500 text-slate-950',
                marked: 'bg-indigo-500 text-white',
                unanswered: 'bg-slate-800 text-slate-400',
              };
              return (
                <button
                  key={q.id}
                  onClick={() => goTo(i)}
                  className={`flex h-9 w-9 items-center justify-center rounded-md text-xs font-bold transition ${styles[status]} ${
                    isCurrent ? 'ring-2 ring-white' : ''
                  }`}
                  aria-current={isCurrent}
                  aria-label={`Question ${i + 1}, ${status}`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
          <button
            onClick={onExit}
            className="mt-5 w-full rounded-lg border border-slate-700 px-4 py-2 text-xs font-semibold text-slate-400 transition hover:border-rose-500/50 hover:text-rose-400"
          >
            Exit test
          </button>
        </aside>
      </div>

      {showSubmitConfirm && (
        <ConfirmSubmitModal
          answeredCount={answeredCount}
          totalCount={questions.length}
          onCancel={() => setShowSubmitConfirm(false)}
          onConfirm={() => handleSubmit(false)}
        />
      )}
    </div>
  );
}

function Legend({ color, label }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={`h-2.5 w-2.5 rounded-full ${color}`} /> {label}
    </span>
  );
}

function ConfirmSubmitModal({ answeredCount, totalCount, onCancel, onConfirm }) {
  const unanswered = totalCount - answeredCount;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-sm rounded-xl border border-slate-800 bg-slate-900 p-6">
        <h3 className="font-display text-lg font-bold">Submit this test?</h3>
        <p className="mt-2 text-sm text-slate-400">
          You've answered {answeredCount} of {totalCount} questions.
          {unanswered > 0 && ` ${unanswered} question${unanswered === 1 ? '' : 's'} will be left blank.`}
          {' '}This can't be undone.
        </p>
        <div className="mt-6 flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 rounded-lg border border-slate-700 px-4 py-2.5 text-sm font-semibold transition hover:border-slate-500"
          >
            Keep reviewing
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-emerald-400"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

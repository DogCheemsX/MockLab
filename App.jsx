import React, { useState } from 'react';
import AccessGate from './components/AccessGate.jsx';
import LandingPage from './components/LandingPage.jsx';
import TestSelector from './components/TestSelector.jsx';
import TestInfoScreen from './components/TestInfoScreen.jsx';
import TestEngine from './components/TestEngine.jsx';
import ResultsScreen from './components/ResultsScreen.jsx';
import { ACCESS_CODES } from './config.js';
import { QUESTION_POOLS } from './questions.js';

const STORAGE_KEY = 'mocklab_access_granted';

function isUnlocked() {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

// view: gate | landing | categories | testInfo | test | results
export default function App() {
  const [view, setView] = useState(() => (isUnlocked() ? 'landing' : 'gate'));
  const [institution, setInstitution] = useState(null);
  const [category, setCategory] = useState(null);
  const [result, setResult] = useState(null);

  function unlockWithCode(code) {
    const normalized = (code || '').trim().toUpperCase();
    const isValid = ACCESS_CODES.some((c) => c.toUpperCase() === normalized);
    if (isValid) {
      try {
        localStorage.setItem(STORAGE_KEY, 'true');
      } catch {
        // localStorage unavailable (private browsing etc.) — unlock still
        // works for this session via the `view` state below.
      }
      setView('landing');
      return true;
    }
    return false;
  }

  function selectInstitution(inst) {
    setInstitution(inst);
    setView('categories');
  }

  function selectCategory(cat) {
    setCategory(cat);
    setView('testInfo');
  }

  function startTest() {
    setView('test');
  }

  // Build the resolved test object (sections with actual questions pulled
  // from the pools named in config.js) right before the test engine needs it.
  function buildResolvedTest() {
    return {
      title: `${institution.name} \u2014 ${category.name}`,
      timeLimitMinutes: category.officialMinutes,
      sections: category.sections.map((s) => ({
        key: s.key,
        label: s.label,
        questions: QUESTION_POOLS[s.pool] || [],
      })),
    };
  }

  function handleTestSubmit(testResult) {
    setResult(testResult);
    setView('results');
  }

  return (
    <>
      {view === 'gate' && <AccessGate onUnlock={unlockWithCode} />}

      {view === 'landing' && <LandingPage onSelectInstitution={selectInstitution} />}

      {view === 'categories' && institution && (
        <TestSelector
          institution={institution}
          onSelectCategory={selectCategory}
          onBack={() => setView('landing')}
        />
      )}

      {view === 'testInfo' && institution && category && (
        <TestInfoScreen
          institution={institution}
          category={category}
          onStart={startTest}
          onBack={() => setView('categories')}
        />
      )}

      {view === 'test' && institution && category && (
        <TestEngine
          test={buildResolvedTest()}
          onSubmit={handleTestSubmit}
          onExit={() => setView('testInfo')}
        />
      )}

      {view === 'results' && result && (
        <ResultsScreen
          result={result}
          onRetake={() => setView('test')}
          onBackToTests={() => setView('categories')}
          onBackHome={() => setView('landing')}
        />
      )}
    </>
  );
}

# MockLab

A single-page React + Tailwind CSS mock-test portal for Pakistani university entrance
tests, built for a Rs. 0 budget: free hosting on Vercel, free code hosting on GitHub, no
backend, no database.

## The flow

1. **Unlock MockLab** — access gate, shown first to everyone who hasn't unlocked yet: the
   3-step payment instructions (pay → send receipt on WhatsApp → get code) and an access
   code box. Nothing past this screen is reachable without a valid code.
2. **Select Test** — landing screen, the four institutions (NTS NAT, COMSATS, PIEAS, AIR
   University).
3. **Select stream** — pick the category (Pre-Engineering, Pre-Medical, ICS, etc.) for
   whichever institution you picked.
4. **Test info** — raw breakdown: total MCQs, time limit, subject-wise weightage, then
   Start Test.
5. **Test engine** — timer, section tabs, question palette, then results.

Once someone enters a valid code, the whole portal stays unlocked on that browser — they
land straight on the Select Test screen on their next visit, never seeing the gate again.

## What's in this project

```
mocklab/
├── index.html                  Page shell + Google Fonts
├── package.json
├── vite.config.js
├── tailwind.config.js          Color palette (Deep Slate / Emerald / Indigo) & fonts
├── postcss.config.js
└── src/
    ├── main.jsx                 React entry point
    ├── index.css                Tailwind imports + base styles
    ├── App.jsx                  View routing + localStorage unlock state
    ├── config.js                  ← EDIT: catalog (institutions/streams/weightage), pricing, access codes
    ├── questions.js                ← EDIT: all question pools
    └── components/
        ├── AccessGate.jsx         Step 1 — payment instructions + access code entry
        ├── LandingPage.jsx        Step 2 — "Select Test"
        ├── TestSelector.jsx       Step 3 — stream/category picker
        ├── TestInfoScreen.jsx     Step 4 — MCQ/time/weightage breakdown + Start
        ├── TestEngine.jsx         Timer, section tabs, palette, question UI
        ├── Timer.jsx              Countdown ring
        ├── Chevron.jsx            Small arrow icon used in list rows
        └── ResultsScreen.jsx      Score, section breakdown, answer review
```

**The two files you'll touch most often:**

- `src/questions.js` — question pools. Each pool (e.g. `english`, `subjectPreEngg`,
  `pieasMaths`) is reused across every stream that needs it — add a question to a pool
  once and every stream using it gets it.
- `src/config.js` — the test catalog (which institutions, which streams, official MCQ
  count / time limit / weightage per section), plus payment numbers and access codes.

## 1. Run it locally

You'll need [Node.js](https://nodejs.org) installed (free, any version 18+).

```bash
cd mocklab
npm install
npm run dev
```

Open the URL it prints (usually `http://localhost:5173`) in your browser.

## 2. Before you launch — edit these things

1. **Payment details in `src/config.js`** (`PAYMENT_INFO`) — already set to NayaPay,
   account name "Ali Ahsan", number `03465939277`. Change these if any of that changes.
   Set your real `ACCESS_CODES` (currently just `ALI500`).
2. **Question pools in `src/questions.js`** — replace the sample questions with your real
   ones, pool by pool. Keep the same structure (`id`, `question`, `options`,
   `correctIndex`).
3. **Catalog numbers in `src/config.js`** (`INSTITUTIONS`) — every stream's `officialTotal`,
   `officialMinutes`, and each section's `officialCount` were compiled from published prep
   guides, not scraped live from each institution. NTS, PIEAS, and Air University all revise
   their patterns between test cycles:
   - **NTS NAT** (90 MCQs / 90 min, English 20 + Analytical 20 + Quantitative 20 + Subject
     30) — confirm on **nts.org.pk**.
   - **PIEAS** (100 MCQs / 180 min, section split varies by paper) — confirm on
     **pieas.edu.pk**.
   - **Air University** (~100 MCQs / ~120 min — AU doesn't publish one fixed public
     breakdown the way NTS/PIEAS do, so treat the section counts as an approximation) —
     confirm against your admit card or AU's current sample papers on **au.edu.pk**.

   Just edit the numbers directly in the `sections` arrays — no other file needs to change.

**Important honesty note on the access-code system:** this uses a small shared list of
codes (like `MOCKLAB500`), not unique one-time codes per buyer. That's normal for a
zero-budget MVP, but it means anyone who has a valid code can share it. If MockLab grows,
consider generating a unique code per payment instead (would need a small backend or a
free service like Google Sheets + Apps Script to check codes against a list of "already
used" entries).

## 3. Push the code to GitHub

1. Create a free account at [github.com](https://github.com) if you don't have one.
2. Create a new repository (e.g. `mocklab`) — leave it empty (no README/license) since
   you already have files locally.
3. In a terminal, from inside the `mocklab` folder:

```bash
git init
git add .
git commit -m "Initial MockLab commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/mocklab.git
git push -u origin main
```

(Replace `YOUR_USERNAME` with your GitHub username. If `git` asks you to log in, GitHub
will walk you through creating a personal access token — just follow its prompts.)

## 4. Deploy for free on Vercel

1. Go to [vercel.com](https://vercel.com) and sign up using your GitHub account (free).
2. Click **Add New → Project**.
3. Select your `mocklab` repository from the list and click **Import**.
4. Vercel auto-detects this as a Vite project. Leave all settings on default
   (Build Command: `npm run build`, Output Directory: `dist`) and click **Deploy**.
5. In 1–2 minutes you'll get a live URL like `mocklab-yourname.vercel.app`. Share that
   link — that's your live site.

## 5. Making updates later

Whenever you want to add new questions or change pricing:

```bash
# edit src/questions.js or src/config.js, then:
git add .
git commit -m "Add mock test 4"
git push
```

Vercel automatically redeploys every time you push to GitHub — no extra steps.

## Notes on the access-code / paywall flow

- The whole portal is gated: nobody can see the test list, let alone open a test, without
  entering a valid code on the very first screen (`AccessGate.jsx`).
- A correct code sets `mocklab_access_granted = true` in the browser's `localStorage`,
  which skips the gate entirely on that browser from then on (survives refresh/close, but
  is per-device/per-browser — it won't follow the user to a different phone).
- To "issue" a code after someone pays, just message them one of the strings from
  `ACCESS_CODES` in `config.js` over WhatsApp. You can rotate codes occasionally (add a
  new one, tell new buyers the new one) if you're worried about old codes circulating —
  see the honesty note in `config.js` above `ACCESS_CODES` for the tradeoffs of this
  shared-code approach.

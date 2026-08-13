// ============================================================================
// MOCKLAB SETTINGS
// ============================================================================
// This file has two things in it:
//   1. PAYMENT_INFO / ACCESS_CODES  -> pricing + unlock codes
//   2. INSTITUTIONS                  -> the test catalog (which institutions,
//                                        which streams, official MCQ/time/
//                                        weightage for each)
//
// Actual question content lives in src/questions.js, not here. This file is
// about structure and numbers, not the questions themselves.
// ============================================================================

export const BRAND = {
  name: 'MockLab',
};

// ---- Payment / access code system ------------------------------------------
export const PAYMENT_INFO = {
  price: 500,
  currency: 'PKR',
  method: 'NayaPay',
  accountTitle: 'Ali Ahsan',
  walletNumber: '03465939277',
  whatsappNumber: '923465939277', // digits only, country code first, no + or spaces
};

// Valid access codes for unlocking the whole portal. Anyone who enters one
// of these strings (case-insensitive) gets past the access gate, on that
// browser, for good. This is a simple shared-code system: you manually
// WhatsApp one of these strings to anyone who pays. It is not a
// unique-per-customer code. Add/remove strings freely.
export const ACCESS_CODES = ['ALI500'];

// ============================================================================
// TEST CATALOG
// ============================================================================
// Each category (stream) has:
//   id             unique string, don't reuse
//   name           shown on the stream-selection screen
//   officialTotal  total MCQs in the real exam (for the info screen)
//   officialMinutes  real exam time limit in minutes
//   sections       ordered list of { key, label, pool, officialCount }
//                    - key: internal id, must be unique within the category
//                    - label: shown on screen
//                    - pool: which question pool (from src/questions.js) to
//                      pull practice questions from for this section
//                    - officialCount: how many MCQs this section has in the
//                      REAL exam (shown on the info screen). The pool itself
//                      can have fewer practice questions than this — add
//                      more to the pool in questions.js to close the gap.
//
// NOTE ON ACCURACY: official MCQ counts, time limits, and section splits
// below are compiled from published prep-guide sources, not scraped live
// from each institution's admissions office. NTS, PIEAS, and Air University
// all revise their patterns between test cycles — confirm the current
// numbers on nts.org.pk / pieas.edu.pk / au.edu.pk before publishing, and
// just edit the numbers below to match.
// ============================================================================

// NTS NAT (Category One) streams — shared by both the "NTS NAT" and
// "COMSATS Admission Test" entries below, since COMSATS admits via NTS NAT.
const NAT_CATEGORIES = [
  {
    id: 'nat-ie',
    name: 'Pre-Engineering (NAT-IE)',
    officialTotal: 90,
    officialMinutes: 90,
    sections: [
      { key: 'english', label: 'English', pool: 'english', officialCount: 20 },
      { key: 'analytical', label: 'Analytical', pool: 'analytical', officialCount: 20 },
      { key: 'quantitative', label: 'Quantitative', pool: 'quantitative', officialCount: 20 },
      { key: 'subject', label: 'Physics, Chemistry & Math', pool: 'subjectPreEngg', officialCount: 30 },
    ],
  },
  {
    id: 'nat-im',
    name: 'Pre-Medical (NAT-IM)',
    officialTotal: 90,
    officialMinutes: 90,
    sections: [
      { key: 'english', label: 'English', pool: 'english', officialCount: 20 },
      { key: 'analytical', label: 'Analytical', pool: 'analytical', officialCount: 20 },
      { key: 'quantitative', label: 'Quantitative', pool: 'quantitative', officialCount: 20 },
      { key: 'subject', label: 'Biology, Chemistry & Physics', pool: 'subjectPreMed', officialCount: 30 },
    ],
  },
  {
    id: 'nat-ics',
    name: 'Computer Science / ICS (NAT-ICS)',
    officialTotal: 90,
    officialMinutes: 90,
    sections: [
      { key: 'english', label: 'English', pool: 'english', officialCount: 20 },
      { key: 'analytical', label: 'Analytical', pool: 'analytical', officialCount: 20 },
      { key: 'quantitative', label: 'Quantitative', pool: 'quantitative', officialCount: 20 },
      { key: 'subject', label: 'Computer Science, Physics & Math', pool: 'subjectICS', officialCount: 30 },
    ],
  },
  {
    id: 'nat-igs',
    name: 'Arts / General Science / Commerce (NAT-IGS, NAT-IA, NAT-ICOM)',
    officialTotal: 90,
    officialMinutes: 90,
    sections: [
      { key: 'english', label: 'English', pool: 'english', officialCount: 20 },
      { key: 'analytical', label: 'Analytical', pool: 'analytical', officialCount: 20 },
      { key: 'quantitative', label: 'Quantitative', pool: 'quantitative', officialCount: 20 },
      { key: 'subject', label: 'Subject-Specific (Arts / Science / Commerce)', pool: 'subjectGeneral', officialCount: 30 },
    ],
  },
];

// PIEAS Admission Test streams. Section split sourced from the official BS
// information leaflet (English / Maths / Physics / Chemistry-or-CS, 100
// MCQs, 180 minutes, no negative marking) — reconfirm on pieas.edu.pk.
const PIEAS_CATEGORIES = [
  {
    id: 'pieas-pre-engg',
    name: 'Pre-Engineering',
    officialTotal: 100,
    officialMinutes: 180,
    sections: [
      { key: 'english', label: 'English', pool: 'pieasEnglish', officialCount: 10 },
      { key: 'maths', label: 'Maths', pool: 'pieasMaths', officialCount: 30 },
      { key: 'physics', label: 'Physics', pool: 'pieasPhysics', officialCount: 30 },
      { key: 'chemistry', label: 'Chemistry', pool: 'pieasChemistry', officialCount: 30 },
    ],
  },
  {
    id: 'pieas-pre-med',
    name: 'Pre-Medical',
    officialTotal: 100,
    officialMinutes: 180,
    sections: [
      { key: 'english', label: 'English', pool: 'pieasEnglish', officialCount: 10 },
      { key: 'maths', label: 'Maths (SSC level)', pool: 'pieasMaths', officialCount: 30 },
      { key: 'physics', label: 'Physics', pool: 'pieasPhysics', officialCount: 30 },
      { key: 'chemistry', label: 'Chemistry', pool: 'pieasChemistry', officialCount: 30 },
    ],
  },
  {
    id: 'pieas-ics',
    name: 'Computer Science / ICS',
    officialTotal: 100,
    officialMinutes: 180,
    sections: [
      { key: 'english', label: 'English', pool: 'pieasEnglish', officialCount: 10 },
      { key: 'maths', label: 'Maths', pool: 'pieasMaths', officialCount: 30 },
      { key: 'physics', label: 'Physics', pool: 'pieasPhysics', officialCount: 30 },
      { key: 'computerScience', label: 'Computer Science', pool: 'pieasCS', officialCount: 30 },
    ],
  },
  {
    id: 'pieas-general',
    name: 'General Science',
    officialTotal: 100,
    officialMinutes: 180,
    sections: [
      { key: 'english', label: 'English', pool: 'pieasEnglish', officialCount: 10 },
      { key: 'maths', label: 'Maths', pool: 'pieasMaths', officialCount: 60 },
      { key: 'physics', label: 'Physics (SSC level)', pool: 'pieasPhysics', officialCount: 30 },
    ],
  },
];

// Air University (AU-CBT) streams. AU has historically used ~100 MCQs in
// ~120 minutes with English + Analytical + Quantitative common to every
// group, plus a subject trio that depends on the stream — but AU does not
// publish one fixed public breakdown the way NTS/PIEAS do, so treat the
// exact per-section counts below as a reasonable approximation and confirm
// against your admit card / the current AU-CBT sample papers before publishing.
const AIR_CATEGORIES = [
  {
    id: 'air-pre-engg',
    name: 'Pre-Engineering',
    officialTotal: 100,
    officialMinutes: 120,
    sections: [
      { key: 'english', label: 'English', pool: 'english', officialCount: 20 },
      { key: 'analytical', label: 'Analytical', pool: 'analytical', officialCount: 20 },
      { key: 'quantitative', label: 'Quantitative', pool: 'quantitative', officialCount: 20 },
      { key: 'subject', label: 'Physics, Chemistry & Math', pool: 'subjectPreEngg', officialCount: 40 },
    ],
  },
  {
    id: 'air-pre-med',
    name: 'Pre-Medical',
    officialTotal: 100,
    officialMinutes: 120,
    sections: [
      { key: 'english', label: 'English', pool: 'english', officialCount: 20 },
      { key: 'analytical', label: 'Analytical', pool: 'analytical', officialCount: 20 },
      { key: 'quantitative', label: 'Quantitative', pool: 'quantitative', officialCount: 20 },
      { key: 'subject', label: 'Biology, Chemistry & Physics', pool: 'subjectPreMed', officialCount: 40 },
    ],
  },
  {
    id: 'air-ics',
    name: 'Computer Science / ICS',
    officialTotal: 100,
    officialMinutes: 120,
    sections: [
      { key: 'english', label: 'English', pool: 'english', officialCount: 20 },
      { key: 'analytical', label: 'Analytical', pool: 'analytical', officialCount: 20 },
      { key: 'quantitative', label: 'Quantitative', pool: 'quantitative', officialCount: 20 },
      { key: 'subject', label: 'Computer Science, Physics & Math', pool: 'subjectICS', officialCount: 40 },
    ],
  },
  {
    id: 'air-commerce',
    name: 'Commerce',
    officialTotal: 100,
    officialMinutes: 120,
    sections: [
      { key: 'english', label: 'English', pool: 'english', officialCount: 20 },
      { key: 'analytical', label: 'Analytical', pool: 'analytical', officialCount: 20 },
      { key: 'quantitative', label: 'Quantitative', pool: 'quantitative', officialCount: 20 },
      { key: 'subject', label: 'Accounting, Commerce & Economics', pool: 'subjectCommerce', officialCount: 40 },
    ],
  },
  {
    id: 'air-arts',
    name: 'Arts',
    officialTotal: 100,
    officialMinutes: 120,
    sections: [
      { key: 'english', label: 'English', pool: 'english', officialCount: 20 },
      { key: 'analytical', label: 'Analytical', pool: 'analytical', officialCount: 20 },
      { key: 'quantitative', label: 'Quantitative', pool: 'quantitative', officialCount: 20 },
      { key: 'subject', label: 'Arts Subject', pool: 'subjectArts', officialCount: 40 },
    ],
  },
  {
    id: 'air-general',
    name: 'General Science',
    officialTotal: 100,
    officialMinutes: 120,
    sections: [
      { key: 'english', label: 'English', pool: 'english', officialCount: 20 },
      { key: 'analytical', label: 'Analytical', pool: 'analytical', officialCount: 20 },
      { key: 'quantitative', label: 'Quantitative', pool: 'quantitative', officialCount: 20 },
      { key: 'subject', label: 'General Science Subject', pool: 'subjectGeneral', officialCount: 40 },
    ],
  },
];

// This is what the landing screen renders as the top-level "Select Test" list.
export const INSTITUTIONS = [
  { id: 'nts-nat', name: 'NTS NAT', categories: NAT_CATEGORIES },
  { id: 'comsats', name: 'COMSATS Admission Test (NTS NAT)', categories: NAT_CATEGORIES },
  { id: 'pieas', name: 'PIEAS Admission Test', categories: PIEAS_CATEGORIES },
  { id: 'air', name: 'AIR University Admission Test', categories: AIR_CATEGORIES },
];

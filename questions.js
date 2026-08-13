// ============================================================================
// MOCKLAB QUESTION POOLS
// ============================================================================
// This is the file to edit to add or change questions. No coding knowledge
// needed beyond copy-paste.
//
// QUESTION_POOLS is a flat object: { poolName: [ question, question, ... ] }
//
// Every category in src/config.js points its sections at a pool by name
// (see the `pool:` field there). Several categories can share the same pool
// — for example "english" is reused by every NAT and AIR stream — so adding
// a question to a shared pool improves every category that uses it at once.
//
// EACH QUESTION LOOKS LIKE THIS:
//   {
//     id: 'unique-id',                // must be unique within its pool
//     question: 'What is 2 + 2?',
//     options: ['1', '2', '4', '8'],  // exactly 4 options
//     correctIndex: 2,                // index (0,1,2,3) of the correct option
//   }
//
// TO ADD A QUESTION: copy an existing question object inside the right pool
// array, paste it back in, give it a new unique id, edit the text.
//
// TO ADD A NEW POOL: add a new `poolName: [ ... ]` entry below, then
// reference that pool name from a category's `sections` list in config.js.
//
// The official exam only shows the REAL section MCQ count (`officialCount`
// in config.js) on the info screen — the pool can hold fewer or more
// practice questions than that; the test simply uses whatever is in the
// pool. Add more questions to close the gap toward the real count.
// ============================================================================

export const QUESTION_POOLS = {
  // ---- Shared across NTS NAT / COMSATS / AIR streams ----------------------
  english: [
    {
      id: 'eng-1',
      question: 'Choose the correct synonym for "Benevolent":',
      options: ['Cruel', 'Kind', 'Angry', 'Silent'],
      correctIndex: 1,
    },
    {
      id: 'eng-2',
      question: 'Choose the correct antonym for "Abundant":',
      options: ['Plentiful', 'Scarce', 'Huge', 'Wide'],
      correctIndex: 1,
    },
    {
      id: 'eng-3',
      question: 'Fill in the blank: She has been living here ___ 2015.',
      options: ['since', 'for', 'from', 'at'],
      correctIndex: 0,
    },
  ],
  analytical: [
    {
      id: 'ana-1',
      question: 'All engineers are logical thinkers. Ali is an engineer. Which conclusion follows?',
      options: [
        'Ali is not logical',
        'Ali is a logical thinker',
        'All logical thinkers are engineers',
        'No conclusion can be drawn',
      ],
      correctIndex: 1,
    },
    {
      id: 'ana-2',
      question: 'Find the next number in the series: 2, 6, 12, 20, 30, ?',
      options: ['36', '40', '42', '44'],
      correctIndex: 2,
    },
    {
      id: 'ana-3',
      question: 'Book is to Reading as Fork is to:',
      options: ['Kitchen', 'Eating', 'Spoon', 'Plate'],
      correctIndex: 1,
    },
  ],
  quantitative: [
    {
      id: 'qua-1',
      question: 'If x + 5 = 12, what is the value of x?',
      options: ['5', '6', '7', '8'],
      correctIndex: 2,
    },
    {
      id: 'qua-2',
      question: 'What is 15% of 200?',
      options: ['20', '25', '30', '35'],
      correctIndex: 2,
    },
    {
      id: 'qua-3',
      question: 'A train covers 180 km in 3 hours. What is its speed?',
      options: ['50 km/h', '55 km/h', '60 km/h', '65 km/h'],
      correctIndex: 2,
    },
  ],

  // ---- Subject-trio pools, shared between NAT and AIR streams -------------
  subjectPreEngg: [
    {
      id: 'peng-1',
      question: 'What is the SI unit of force?',
      options: ['Joule', 'Newton', 'Watt', 'Pascal'],
      correctIndex: 1,
    },
    {
      id: 'peng-2',
      question: 'Differentiate x\u00b2 with respect to x.',
      options: ['x', '2x', 'x\u00b2', '2'],
      correctIndex: 1,
    },
    {
      id: 'peng-3',
      question: 'Which of these is a noble gas?',
      options: ['Oxygen', 'Nitrogen', 'Argon', 'Hydrogen'],
      correctIndex: 2,
    },
  ],
  subjectPreMed: [
    {
      id: 'pmed-1',
      question: 'The powerhouse of the cell is the:',
      options: ['Nucleus', 'Ribosome', 'Mitochondrion', 'Golgi body'],
      correctIndex: 2,
    },
    {
      id: 'pmed-2',
      question: 'Which blood cells are responsible for clotting?',
      options: ['Red blood cells', 'White blood cells', 'Platelets', 'Plasma cells'],
      correctIndex: 2,
    },
    {
      id: 'pmed-3',
      question: 'What is the pH of pure water?',
      options: ['5', '6', '7', '8'],
      correctIndex: 2,
    },
  ],
  subjectICS: [
    {
      id: 'ics-1',
      question: 'Which data structure uses LIFO order?',
      options: ['Queue', 'Stack', 'Array', 'Linked List'],
      correctIndex: 1,
    },
    {
      id: 'ics-2',
      question: 'What does CPU stand for?',
      options: [
        'Central Process Unit',
        'Central Processing Unit',
        'Computer Personal Unit',
        'Central Processor Utility',
      ],
      correctIndex: 1,
    },
    {
      id: 'ics-3',
      question: 'Which of these is a programming language?',
      options: ['HTML', 'HTTP', 'Python', 'USB'],
      correctIndex: 2,
    },
  ],
  subjectGeneral: [
    {
      id: 'gen-1',
      question: 'Who is regarded as the founder of Pakistan?',
      options: ['Allama Iqbal', 'Liaquat Ali Khan', 'Muhammad Ali Jinnah', 'Sir Syed Ahmed Khan'],
      correctIndex: 2,
    },
    {
      id: 'gen-2',
      question: 'Which is the currency of Pakistan?',
      options: ['Rupee', 'Dinar', 'Taka', 'Riyal'],
      correctIndex: 0,
    },
    {
      id: 'gen-3',
      question: 'Which organ of the human body regulates blood sugar?',
      options: ['Liver', 'Pancreas', 'Kidney', 'Heart'],
      correctIndex: 1,
    },
  ],
  subjectCommerce: [
    {
      id: 'com-1',
      question: 'In accounting, an increase in an asset account is normally recorded as a:',
      options: ['Credit', 'Debit', 'Neither', 'Both'],
      correctIndex: 1,
    },
    {
      id: 'com-2',
      question: 'What does "GDP" stand for?',
      options: [
        'General Domestic Price',
        'Gross Domestic Product',
        'Gross Development Plan',
        'General Development Product',
      ],
      correctIndex: 1,
    },
    {
      id: 'com-3',
      question: 'A balance sheet shows a company\u2019s financial position at:',
      options: ['A point in time', 'Over a full year only', 'Only at year-end', 'Only at start-up'],
      correctIndex: 0,
    },
  ],
  subjectArts: [
    {
      id: 'art-1',
      question: 'Who wrote the play "Hamlet"?',
      options: ['Charles Dickens', 'William Shakespeare', 'Jane Austen', 'Leo Tolstoy'],
      correctIndex: 1,
    },
    {
      id: 'art-2',
      question: 'Which of these is a major branch of philosophy?',
      options: ['Ethics', 'Ecology', 'Economics', 'Ergonomics'],
      correctIndex: 0,
    },
    {
      id: 'art-3',
      question: 'The Renaissance began in which country?',
      options: ['France', 'Italy', 'Germany', 'Spain'],
      correctIndex: 1,
    },
  ],

  // ---- PIEAS-specific pools (different section structure) -----------------
  pieasEnglish: [
    {
      id: 'pe-1',
      question: 'Choose the correctly spelled word:',
      options: ['Recieve', 'Receive', 'Receeve', 'Receve'],
      correctIndex: 1,
    },
    {
      id: 'pe-2',
      question: 'Choose the correct sentence:',
      options: ['He don\u2019t like tea.', 'He doesn\u2019t likes tea.', 'He doesn\u2019t like tea.', 'He not like tea.'],
      correctIndex: 2,
    },
    {
      id: 'pe-3',
      question: 'Choose the correct synonym for "Candid":',
      options: ['Dishonest', 'Frank', 'Shy', 'Angry'],
      correctIndex: 1,
    },
  ],
  pieasMaths: [
    {
      id: 'pm-1',
      question: 'What is the derivative of sin(x)?',
      options: ['cos(x)', '-cos(x)', 'sin(x)', '-sin(x)'],
      correctIndex: 0,
    },
    {
      id: 'pm-2',
      question: 'Solve for x: 2x - 4 = 10',
      options: ['5', '6', '7', '8'],
      correctIndex: 2,
    },
    {
      id: 'pm-3',
      question: 'What is the value of log\u2081\u2080(100)?',
      options: ['1', '2', '10', '100'],
      correctIndex: 1,
    },
  ],
  pieasPhysics: [
    {
      id: 'pp-1',
      question: 'What is the unit of electric current?',
      options: ['Volt', 'Ohm', 'Ampere', 'Watt'],
      correctIndex: 2,
    },
    {
      id: 'pp-2',
      question: 'Which law states F = ma?',
      options: ['Newton\u2019s First Law', 'Newton\u2019s Second Law', 'Newton\u2019s Third Law', 'Law of Gravitation'],
      correctIndex: 1,
    },
    {
      id: 'pp-3',
      question: 'The speed of light in vacuum is approximately:',
      options: ['3 \u00d7 10\u2076 m/s', '3 \u00d7 10\u2078 m/s', '3 \u00d7 10\u00b9\u2070 m/s', '3 \u00d7 10\u2074 m/s'],
      correctIndex: 1,
    },
  ],
  pieasChemistry: [
    {
      id: 'pc-1',
      question: 'What is the atomic number of Carbon?',
      options: ['4', '6', '8', '12'],
      correctIndex: 1,
    },
    {
      id: 'pc-2',
      question: 'Which gas is released during photosynthesis?',
      options: ['Carbon dioxide', 'Nitrogen', 'Oxygen', 'Hydrogen'],
      correctIndex: 2,
    },
    {
      id: 'pc-3',
      question: 'What type of bond involves the sharing of electron pairs?',
      options: ['Ionic bond', 'Covalent bond', 'Metallic bond', 'Hydrogen bond'],
      correctIndex: 1,
    },
  ],
  pieasCS: [
    {
      id: 'pcs-1',
      question: 'Which of the following is an object-oriented programming language?',
      options: ['C', 'Java', 'Assembly', 'HTML'],
      correctIndex: 1,
    },
    {
      id: 'pcs-2',
      question: 'What does "RAM" stand for?',
      options: ['Random Access Memory', 'Read Access Memory', 'Random Available Memory', 'Read Available Memory'],
      correctIndex: 0,
    },
    {
      id: 'pcs-3',
      question: 'Which of these sorting algorithms has the best average time complexity?',
      options: ['Bubble Sort', 'Selection Sort', 'Quick Sort', 'Insertion Sort'],
      correctIndex: 2,
    },
  ],
};

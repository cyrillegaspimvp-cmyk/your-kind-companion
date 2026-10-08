export type Subject = {
  id: string;
  name: string;
  tagalog?: string;
  icon: string;
  color: "primary" | "sunny" | "fresh" | "sky" | "coral";
  topics: Topic[];
};

export type Topic = {
  id: string;
  title: string;
  grade: number;
  difficulty: "Easy" | "Medium" | "Hard";
  completion: number;
};

export const subjects: Subject[] = [
  {
    id: "math",
    name: "Math",
    icon: "calculator",
    color: "primary",
    topics: [
      { id: "fractions", title: "Fractions", grade: 4, difficulty: "Medium", completion: 33 },
      { id: "addition", title: "Addition & Subtraction", grade: 2, difficulty: "Easy", completion: 100 },
      { id: "multiplication", title: "Multiplication Tables", grade: 3, difficulty: "Medium", completion: 60 },
      { id: "shapes", title: "Shapes & Geometry", grade: 1, difficulty: "Easy", completion: 0 },
      { id: "word-problems", title: "Word Problems", grade: 5, difficulty: "Hard", completion: 0 },
    ],
  },
  {
    id: "english",
    name: "English",
    icon: "book-open",
    color: "sky",
    topics: [
      { id: "phonics", title: "Phonics & Reading", grade: 1, difficulty: "Easy", completion: 80 },
      { id: "grammar", title: "Nouns & Verbs", grade: 3, difficulty: "Easy", completion: 40 },
      { id: "spelling", title: "Spelling Bee", grade: 2, difficulty: "Medium", completion: 0 },
      { id: "comprehension", title: "Reading Comprehension", grade: 5, difficulty: "Hard", completion: 0 },
    ],
  },
  {
    id: "science",
    name: "Science",
    icon: "flask-conical",
    color: "fresh",
    topics: [
      { id: "plants", title: "Plants & How They Grow", grade: 2, difficulty: "Easy", completion: 50 },
      { id: "animals", title: "Animals & Habitats", grade: 3, difficulty: "Easy", completion: 25 },
      { id: "solar-system", title: "The Solar System", grade: 4, difficulty: "Medium", completion: 0 },
      { id: "weather", title: "Weather & Seasons", grade: 1, difficulty: "Easy", completion: 100 },
    ],
  },
  {
    id: "filipino",
    name: "Filipino",
    icon: "languages",
    color: "coral",
    topics: [
      { id: "alpabeto", title: "Alpabeto at Tunog", grade: 1, difficulty: "Easy", completion: 70 },
      { id: "salita", title: "Mga Salitang Magkatugma", grade: 2, difficulty: "Easy", completion: 0 },
      { id: "pangungusap", title: "Bumubuo ng Pangungusap", grade: 3, difficulty: "Medium", completion: 0 },
    ],
  },
  {
    id: "ap",
    name: "Araling Panlipunan",
    icon: "globe",
    color: "sunny",
    topics: [
      { id: "pamilya", title: "Aking Pamilya at Komunidad", grade: 1, difficulty: "Easy", completion: 90 },
      { id: "pilipinas", title: "Mapa ng Pilipinas", grade: 4, difficulty: "Medium", completion: 10 },
      { id: "bayani", title: "Mga Bayani ng Bansa", grade: 5, difficulty: "Medium", completion: 0 },
    ],
  },
];

export type LessonCard = {
  heading: string;
  body: string;
  emoji: string;
};

export const fractionLesson: LessonCard[] = [
  {
    heading: "What is a fraction?",
    body: "A fraction shows a part of a whole. If a pizza has 4 equal slices and you eat 1, you ate one-fourth! We write that as 1/4.",
    emoji: "🍕",
  },
  {
    heading: "The top and bottom numbers",
    body: "The bottom number tells us how many equal parts there are in total. The top number tells us how many parts we are talking about.",
    emoji: "🔢",
  },
  {
    heading: "Fractions everywhere!",
    body: "You see fractions when you share a chocolate bar, pour half a glass of juice, or play for a quarter of an hour. Fractions help us share fairly!",
    emoji: "🍫",
  },
];

export type QuizQuestion = {
  question: string;
  emoji: string;
  options: string[];
  answer: number;
  hint: string;
  explanation: string;
};

export const fractionQuiz: QuizQuestion[] = [
  {
    question: "What fraction of the pizza is shaded? (1 of 4 slices)",
    emoji: "🍕",
    options: ["1/2", "1/4", "3/4", "4/4"],
    answer: 1,
    hint: "Count the total slices first — there are 4. Then count the shaded ones.",
    explanation: "1 shaded slice out of 4 equal slices is one-fourth, or 1/4!",
  },
  {
    question: "In the fraction 3/4, what does the number 4 tell us?",
    emoji: "🔢",
    options: [
      "How many parts we have",
      "How many equal parts in total",
      "How big the pizza is",
      "How many friends are sharing",
    ],
    answer: 1,
    hint: "The bottom number is about the WHOLE thing.",
    explanation: "The bottom number (denominator) tells us the total equal parts. 4 means the whole is split into 4!",
  },
  {
    question: "Maria drank half a glass of juice. Which fraction shows half?",
    emoji: "🧃",
    options: ["1/3", "1/4", "1/2", "2/3"],
    answer: 2,
    hint: "Half means 1 part out of 2 equal parts.",
    explanation: "Half is 1 out of 2 equal parts — that's 1/2!",
  },
  {
    question: "Which fraction is the BIGGEST?",
    emoji: "🏆",
    options: ["1/4", "2/4", "3/4", "1/2"],
    answer: 2,
    hint: "When the bottom numbers are the same, the bigger top number wins.",
    explanation: "3/4 is the biggest — 3 slices out of 4 is more than 1, 2, or half!",
  },
  {
    question: "True or False: A fraction always shows a part of a whole.",
    emoji: "🤔",
    options: ["True", "False"],
    answer: 0,
    hint: "Think about the pizza example from the lesson!",
    explanation: "True! A fraction always describes part of a whole thing.",
  },
];

export type ChatReply = { keywords: string[]; reply: string };

export const buddyReplies: ChatReply[] = [
  {
    keywords: ["fraction"],
    reply: "A fraction is a part of a whole! 🍕 Imagine a pizza cut into 4 equal slices. If you eat 1 slice, you ate 1/4 of the pizza. The bottom number is the total parts, the top number is your parts!",
  },
  {
    keywords: ["example"],
    reply: "Here's an example! 🍫 A chocolate bar has 8 squares. You share it with a friend and give them 4 squares. You gave away 4/8, which is the same as 1/2 — half the bar!",
  },
  {
    keywords: ["hint"],
    reply: "Here's a hint! 💡 Always start by counting ALL the equal parts — that becomes your bottom number. Then count the parts you're talking about — that's your top number!",
  },
  {
    keywords: ["simply", "simple", "explain"],
    reply: "Simply put: a fraction is just sharing! 🎂 Cut something into equal pieces, then count how many pieces you have. Bottom = total pieces, top = your pieces. That's it!",
  },
  {
    keywords: ["hello", "hi", "hey"],
    reply: "Hello, superstar! 🌟 I'm Hootie, your study buddy! Ask me anything about your lessons, or tap one of the buttons below and I'll help you out!",
  },
];

export const defaultReply =
  "Great question! 🤔 For now I can help best with our Fractions lesson. Try asking me about fractions, or tap 'Give Me an Example' to see one in action!";

export const suggestedQuestions = [
  "What is a fraction?",
  "Give me an example",
  "Explain it simply",
  "Give me a hint",
];

export const badges = [
  { id: "first-lesson", name: "First Steps", emoji: "👣", earned: true },
  { id: "quiz-star", name: "Quiz Star", emoji: "⭐", earned: true },
  { id: "streak-3", name: "3-Day Streak", emoji: "🔥", earned: true },
  { id: "math-whiz", name: "Math Whiz", emoji: "🧮", earned: false },
  { id: "bookworm", name: "Bookworm", emoji: "📚", earned: false },
  { id: "scientist", name: "Young Scientist", emoji: "🔬", earned: false },
];

export const weeklyActivity = [
  { day: "Mon", minutes: 25 },
  { day: "Tue", minutes: 40 },
  { day: "Wed", minutes: 15 },
  { day: "Thu", minutes: 30 },
  { day: "Fri", minutes: 0 },
  { day: "Sat", minutes: 0 },
  { day: "Sun", minutes: 0 },
];

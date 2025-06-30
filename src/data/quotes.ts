// Inspirational quotes for athletes and health enthusiasts
export const quotes = [
  {
    text: "You do not rise to the level of your goals. You fall to the level of your systems.",
    author: "James Clear"
  },
  {
    text: "The groundwork for all happiness is good health.",
    author: "Leigh Hunt"
  },
  {
    text: "Every expert was once a beginner. Every pro was once an amateur.",
    author: "Robin Sharma"
  },
  {
    text: "Success is the sum of small efforts, repeated day in and day out.",
    author: "Robert Collier"
  },
  {
    text: "The difference between ordinary and extraordinary is that little extra.",
    author: "Jimmy Johnson"
  },
  {
    text: "Your body can stand almost anything. It's your mind you have to convince.",
    author: "Unknown"
  },
  {
    text: "Champions train, losers complain.",
    author: "Unknown"
  },
  {
    text: "What seems impossible today will one day become your warm-up.",
    author: "Unknown"
  },
  {
    text: "The only bad workout is the one that didn't happen.",
    author: "Unknown"
  },
  {
    text: "Fall seven times, stand up eight.",
    author: "Japanese Proverb"
  },
  {
    text: "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle"
  },
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt"
  },
  {
    text: "The best time to plant a tree was 20 years ago. The second best time is now.",
    author: "Chinese Proverb"
  },
  {
    text: "You are what you repeatedly do. Excellence, then, is not an act, but a habit.",
    author: "Aristotle"
  },
  {
    text: "Small changes can make a big difference. You are what you repeatedly do.",
    author: "James Clear"
  },
  {
    text: "Every action is a vote for the type of person you wish to become.",
    author: "James Clear"
  },
  {
    text: "The Mediterranean diet is not just about food. It's about a way of life.",
    author: "Mediterranean Wisdom"
  },
  {
    text: "Consistency is the mother of mastery.",
    author: "Robin Sharma"
  },
  {
    text: "Progress, not perfection.",
    author: "Unknown"
  },
  {
    text: "The pain you feel today will be the strength you feel tomorrow.",
    author: "Unknown"
  }
];

// Get a quote for today (deterministic based on date)
export function getTodaysQuote() {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
  const quoteIndex = dayOfYear % quotes.length;
  return quotes[quoteIndex];
}
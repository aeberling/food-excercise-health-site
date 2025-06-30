// Daily plans for the Mediterranean Power Plan
export interface Meal {
  name: string;
  protein: string;
  recipeId?: string;
}

export interface Exercise {
  name: string;
  duration: string;
  intensity: string;
  description: string;
  workoutId?: string; // For linking to specific workout sections
}

export interface DayPlan {
  day: string;
  week: number;
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
  exercise: Exercise;
  totalProtein: string;
  tips: string[];
}

export const weeklyPlans: DayPlan[] = [
  // Week 1
  {
    day: "Monday",
    week: 1,
    breakfast: {
      name: "Greek Yogurt Power Bowl",
      protein: "30g",
      recipeId: "greek-yogurt-power-bowl"
    },
    lunch: {
      name: "Leftover Air Fryer Chicken with Quinoa",
      protein: "35g",
      recipeId: "air-fryer-chicken"
    },
    dinner: {
      name: "Sheet Pan Salmon with Roasted Vegetables",
      protein: "34g"
    },
    exercise: {
      name: "Lower Body Strength Training",
      duration: "60 minutes",
      intensity: "High",
      description: "Leg press, hamstring curls, quad extensions, calf raises, hip abduction, glute bridges",
      workoutId: "monday-lower-body"
    },
    totalProtein: "99g + snacks",
    tips: [
      "Prep your Greek yogurt bowl the night before for quick breakfast",
      "Focus on proper form over heavy weights in leg day",
      "Hydrate well during strength training sessions"
    ]
  },
  {
    day: "Tuesday",
    week: 1,
    breakfast: {
      name: "Mediterranean Egg Muffins x3",
      protein: "36g",
      recipeId: "mediterranean-egg-muffins"
    },
    lunch: {
      name: "Greek Chicken Grain Bowl",
      protein: "30g"
    },
    dinner: {
      name: "Instant Pot Beef Stew over Quinoa",
      protein: "35g",
      recipeId: "instant-pot-beef-stew"
    },
    exercise: {
      name: "Taekwondo + Interval Running",
      duration: "75 minutes",
      intensity: "Moderate-High",
      description: "45 min taekwondo (kicks, forms, conditioning) + 30 min interval run",
      workoutId: "tuesday-taekwondo-running"
    },
    totalProtein: "101g + snacks",
    tips: [
      "Warm up thoroughly before taekwondo kicks",
      "Keep intervals at conversational pace between hard efforts",
      "Post-workout protein within 2 hours for recovery"
    ]
  },
  {
    day: "Wednesday",
    week: 1,
    breakfast: {
      name: "Shakshuka with Greek Yogurt",
      protein: "25g",
      recipeId: "shakshuka"
    },
    lunch: {
      name: "Mediterranean Tuna Salad Wrap",
      protein: "28g"
    },
    dinner: {
      name: "Slow Cooker Chicken with Orzo",
      protein: "28g"
    },
    exercise: {
      name: "Badminton + Core Work",
      duration: "4+ hours",
      intensity: "Moderate-High",
      description: "Regular badminton session + 20 minutes core strengthening",
      workoutId: "wednesday-badminton-core"
    },
    totalProtein: "81g + snacks",
    tips: [
      "Bring extra water and electrolytes for long badminton session",
      "Focus on core stability during play",
      "Stretch hip flexors after extended court time"
    ]
  },
  {
    day: "Thursday",
    week: 1,
    breakfast: {
      name: "Savory Quinoa Bowl with Eggs",
      protein: "22g"
    },
    lunch: {
      name: "Leftover Beef Stew",
      protein: "35g"
    },
    dinner: {
      name: "Air Fryer Greek Chicken Souvlaki",
      protein: "28g",
      recipeId: "air-fryer-souvlaki"
    },
    exercise: {
      name: "Upper Body Strength + Taekwondo Flexibility",
      duration: "75 minutes",
      intensity: "High",
      description: "45 min upper body weights + 30 min taekwondo flexibility flow",
      workoutId: "thursday-upper-body-taekwondo"
    },
    totalProtein: "85g + snacks",
    tips: [
      "Use controlled movements in upper body exercises",
      "Focus on flexibility and range of motion in taekwondo session",
      "Proper shoulder mobility prevents injury"
    ]
  },
  {
    day: "Friday",
    week: 1,
    breakfast: {
      name: "Greek Scrambled Eggs with Feta",
      protein: "25g"
    },
    lunch: {
      name: "Mediterranean Chickpea Power Bowl",
      protein: "20g"
    },
    dinner: {
      name: "Sheet Pan Mediterranean Fish",
      protein: "30g"
    },
    exercise: {
      name: "Active Recovery",
      duration: "30-45 minutes",
      intensity: "Low",
      description: "Light stretching, yoga, or gentle walk",
      workoutId: "friday-active-recovery"
    },
    totalProtein: "75g + snacks",
    tips: [
      "Recovery day is just as important as training days",
      "Focus on sleep quality tonight",
      "Light movement helps with muscle recovery"
    ]
  },
  {
    day: "Saturday",
    week: 1,
    breakfast: {
      name: "Meal Prep Day - Light Breakfast",
      protein: "20g"
    },
    lunch: {
      name: "Batch Cooking Samples",
      protein: "25g"
    },
    dinner: {
      name: "Fresh Mediterranean Feast",
      protein: "35g"
    },
    exercise: {
      name: "Long Run + Full Body Circuit",
      duration: "90 minutes",
      intensity: "Moderate-High",
      description: "60 min endurance run + 30 min bodyweight circuit",
      workoutId: "saturday-long-run-circuit"
    },
    totalProtein: "80g + snacks",
    tips: [
      "Batch cooking day - prep for the week ahead",
      "Long run should be at conversational pace",
      "Circuit training complements endurance work"
    ]
  },
  {
    day: "Sunday",
    week: 1,
    breakfast: {
      name: "Pre-Badminton Fuel",
      protein: "25g"
    },
    lunch: {
      name: "Post-Game Recovery Meal",
      protein: "30g"
    },
    dinner: {
      name: "Week Planning Dinner",
      protein: "30g"
    },
    exercise: {
      name: "Badminton + Upper Body Weights",
      duration: "4+ hours",
      intensity: "Moderate-High",
      description: "Regular badminton session + 45 min upper body strength",
      workoutId: "sunday-badminton-upper-body"
    },
    totalProtein: "85g + snacks",
    tips: [
      "Fuel well before long badminton session",
      "Upper body strength supports badminton performance",
      "Plan next week's meals and workouts"
    ]
  }
];

// Week 2 starts with Monday again (cycle continues)
export const week2Plans: DayPlan[] = [
  {
    day: "Monday",
    week: 2,
    breakfast: {
      name: "Mediterranean Frittata Slice",
      protein: "20g"
    },
    lunch: {
      name: "Greek Lamb Burger with Side Salad",
      protein: "30g"
    },
    dinner: {
      name: "Instant Pot Lentil Soup with Grilled Chicken",
      protein: "40g",
      recipeId: "instant-pot-lentil-soup"
    },
    exercise: {
      name: "Lower Body Strength Training",
      duration: "60 minutes",
      intensity: "High",
      description: "Progressive overload week - increase weights from Week 1"
    },
    totalProtein: "90g + snacks",
    tips: [
      "Increase weights by 5-10% from last week",
      "Track your progress to stay motivated",
      "Focus on mind-muscle connection"
    ]
  },
  // Continue with other Week 2 days...
];

// Get today's plan based on current date
export function getTodaysPlan(): DayPlan | null {
  const today = new Date();
  const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });
  
  // Calculate which week of the program we're in (cycles every 2 weeks)
  const startDate = new Date('2024-01-01'); // Adjust this to your program start date
  const diffTime = Math.abs(today.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const weekNumber = Math.floor(diffDays / 7) % 2 + 1; // Cycles between 1 and 2
  
  // Find the plan for today
  const allPlans = weekNumber === 1 ? weeklyPlans : [...weeklyPlans, ...week2Plans];
  return allPlans.find(plan => plan.day === dayName && plan.week === weekNumber) || weeklyPlans[0];
}

// Get current week number for display
export function getCurrentWeek(): number {
  const today = new Date();
  const startDate = new Date('2024-01-01');
  const diffTime = Math.abs(today.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.floor(diffDays / 7) % 2 + 1;
}
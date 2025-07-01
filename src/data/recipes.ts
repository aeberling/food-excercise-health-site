// Recipe data structure for Mediterranean Power Plan

export interface Recipe {
  id: string;
  title: string;
  category: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  cookingMethod: 'air-fryer' | 'instant-pot' | 'crock-pot' | 'pan-cook' | 'oven' | 'no-cook';
  protein: string;
  prepTime?: string;
  cookTime?: string;
  serves?: string;
  referenceLink?: string;
  referenceName?: string;
  ingredients: string[];
  instructions: string[];
  tips?: string[];
}

export const recipes: Recipe[] = [
  // ===== BREAKFAST RECIPES =====
  {
    id: "greek-yogurt-power-bowl",
    title: "Greek Yogurt Power Bowl",
    category: "breakfast",
    cookingMethod: "no-cook",
    protein: "30g",
    prepTime: "5 minutes",
    ingredients: [
      "1½ cups plain Greek yogurt (0% or 2% fat)",
      "1 hard-boiled egg, chopped",
      "½ cup cooked chickpeas, drained and rinsed",
      "¼ cup diced cucumber",
      "¼ cup cherry tomatoes, halved",
      "2 tablespoons mixed nuts (almonds, walnuts)",
      "1 tablespoon extra virgin olive oil",
      "1 teaspoon za'atar or dukkah",
      "Salt and pepper to taste",
      "Fresh lemon juice (optional)"
    ],
    instructions: [
      "Add Greek yogurt to a large bowl and spread evenly.",
      "Top with chopped hard-boiled egg and chickpeas.",
      "Add cucumber, tomatoes, and mixed nuts.",
      "Drizzle with olive oil and sprinkle with za'atar.",
      "Season with salt, pepper, and a squeeze of lemon if desired.",
      "Serve immediately or cover and refrigerate overnight for meal prep."
    ],
    tips: [
      "Prepare components ahead of time for quick assembly",
      "Use full-fat Greek yogurt for extra satiety",
      "Add a scoop of protein powder for 45g+ protein total"
    ]
  },
  {
    id: "mediterranean-egg-muffins",
    title: "Mediterranean Egg Muffins",
    category: "breakfast",
    cookingMethod: "oven",
    protein: "12g per muffin",
    prepTime: "15 minutes",
    cookTime: "20-25 minutes",
    serves: "12 muffins",
    referenceLink: "https://www.themediterraneandish.com/mediterranean-breakfast-egg-muffins/",
    referenceName: "The Mediterranean Dish - Egg Muffins",
    ingredients: [
      "12 large eggs",
      "1 cup fresh spinach, chopped",
      "½ cup sun-dried tomatoes, chopped",
      "½ cup red bell pepper, diced",
      "⅓ cup red onion, finely diced",
      "¾ cup feta cheese, crumbled",
      "2 tablespoons fresh parsley, chopped",
      "1 teaspoon dried oregano",
      "½ teaspoon garlic powder",
      "Salt and pepper to taste",
      "Olive oil for greasing"
    ],
    instructions: [
      "Preheat oven to 350°F (175°C). Grease a 12-cup muffin tin with olive oil.",
      "In a large bowl, whisk eggs until well combined.",
      "Add spinach, sun-dried tomatoes, bell pepper, onion, oregano, garlic powder, salt, and pepper. Mix well.",
      "Divide mixture evenly among muffin cups, filling about ¾ full.",
      "Top each with crumbled feta and parsley.",
      "Bake for 20-25 minutes until eggs are set and tops are lightly golden.",
      "Cool for 5 minutes before removing from tin."
    ],
    tips: [
      "Refrigerate up to 5 days in airtight container",
      "Freeze individually wrapped for up to 3 months",
      "Reheat in microwave for 30-60 seconds or oven at 350°F for 5 minutes"
    ]
  },
  {
    id: "shakshuka",
    title: "Power Shakshuka",
    category: "breakfast",
    cookingMethod: "pan-cook",
    protein: "26g",
    prepTime: "10 minutes",
    cookTime: "20 minutes",
    serves: "2",
    ingredients: [
      "1 tablespoon olive oil",
      "1 onion, diced",
      "1 red bell pepper, diced",
      "3 cloves garlic, minced",
      "1 teaspoon smoked paprika",
      "1 teaspoon ground cumin",
      "½ teaspoon red pepper flakes (optional)",
      "1 can (28 oz) crushed tomatoes",
      "6 large eggs",
      "½ cup crumbled feta cheese",
      "½ cup cooked white beans (for extra protein)",
      "2 tablespoons fresh parsley, chopped",
      "Salt and pepper to taste",
      "Whole grain pita for serving"
    ],
    instructions: [
      "Heat olive oil in a large skillet over medium heat.",
      "Sauté onion and bell pepper until softened, about 5 minutes.",
      "Add garlic and spices, cook for 30 seconds until fragrant.",
      "Pour in crushed tomatoes and beans, simmer for 10 minutes until thickened.",
      "Make 6 wells in the sauce and crack an egg into each.",
      "Cover and cook for 6-8 minutes until whites are set but yolks still runny.",
      "Sprinkle with feta and parsley before serving.",
      "Serve with whole grain pita."
    ],
    tips: [
      "Double the recipe and freeze the sauce for quick meals",
      "Add chickpeas instead of white beans for variety",
      "For higher protein, add 2 extra eggs per serving"
    ]
  },
  {
    id: "protein-overnight-oats",
    title: "Mediterranean Protein Overnight Oats",
    category: "breakfast",
    cookingMethod: "no-cook",
    protein: "28g",
    prepTime: "5 minutes",
    serves: "1",
    ingredients: [
      "½ cup rolled oats",
      "1 scoop vanilla protein powder",
      "½ cup Greek yogurt",
      "½ cup unsweetened almond milk",
      "1 tablespoon chia seeds",
      "1 tablespoon almond butter",
      "¼ cup fresh berries",
      "1 tablespoon chopped walnuts",
      "1 teaspoon honey",
      "Pinch of cinnamon"
    ],
    instructions: [
      "In a jar or container, combine oats, protein powder, and chia seeds.",
      "Add Greek yogurt, almond milk, and almond butter.",
      "Stir well until protein powder is fully incorporated.",
      "Top with berries, walnuts, honey, and cinnamon.",
      "Cover and refrigerate overnight (minimum 4 hours).",
      "Enjoy cold or warmed in microwave for 30-60 seconds."
    ],
    tips: [
      "Make 5 jars on Sunday for the whole week",
      "Try different protein powder flavors for variety",
      "Add extra Greek yogurt for 35g+ protein"
    ]
  },

  // ===== LUNCH RECIPES =====
  {
    id: "air-fryer-chicken",
    title: "Mediterranean Air Fryer Chicken Thighs",
    category: "lunch",
    cookingMethod: "air-fryer",
    protein: "35g",
    prepTime: "10 minutes",
    cookTime: "25 minutes",
    serves: "4",
    ingredients: [
      "8 boneless, skinless chicken thighs",
      "3 tablespoons olive oil",
      "2 lemons, juiced",
      "4 cloves garlic, minced",
      "2 teaspoons dried oregano",
      "1 teaspoon smoked paprika",
      "1 teaspoon ground cumin",
      "½ teaspoon red pepper flakes",
      "Salt and pepper to taste",
      "Fresh parsley for garnish"
    ],
    instructions: [
      "Pat chicken thighs dry with paper towels.",
      "In a bowl, whisk together olive oil, lemon juice, garlic, and all spices.",
      "Marinate chicken in mixture for at least 30 minutes (or overnight).",
      "Preheat air fryer to 380°F (193°C).",
      "Place chicken in air fryer basket in single layer.",
      "Cook for 12 minutes, flip, then cook another 10-13 minutes until internal temp reaches 165°F.",
      "Let rest for 5 minutes before serving.",
      "Garnish with fresh parsley and serve with quinoa and roasted vegetables."
    ],
    tips: [
      "Batch cook and store for meal prep",
      "Works great with chicken breasts too (adjust cooking time)",
      "Save marinade recipe for grilling or oven baking"
    ]
  },
  {
    id: "instant-pot-lentil-stew",
    title: "Instant Pot Mediterranean Lentil Stew",
    category: "lunch",
    cookingMethod: "instant-pot",
    protein: "25g",
    prepTime: "10 minutes",
    cookTime: "20 minutes",
    serves: "6",
    ingredients: [
      "2 cups red lentils, rinsed",
      "1 can (15 oz) chickpeas, drained",
      "4 cups vegetable broth",
      "1 onion, diced",
      "3 carrots, diced",
      "3 celery stalks, diced",
      "4 cloves garlic, minced",
      "1 can (14 oz) diced tomatoes",
      "2 tablespoons tomato paste",
      "2 teaspoons ground cumin",
      "1 teaspoon smoked paprika",
      "1 teaspoon dried thyme",
      "2 bay leaves",
      "3 cups fresh spinach",
      "¼ cup fresh lemon juice",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Set Instant Pot to sauté mode. Add olive oil, onion, carrots, and celery.",
      "Cook for 3-4 minutes until softened. Add garlic and cook 30 seconds.",
      "Add lentils, chickpeas, broth, tomatoes, tomato paste, and all spices.",
      "Cancel sauté mode. Secure lid and set to high pressure for 15 minutes.",
      "Natural release for 10 minutes, then quick release.",
      "Remove bay leaves. Stir in spinach and lemon juice.",
      "Season with salt and pepper to taste.",
      "Serve with whole grain bread or over brown rice."
    ],
    tips: [
      "Freezes well for up to 3 months",
      "Add cooked chicken or turkey for extra protein",
      "Top with Greek yogurt for creaminess and more protein"
    ]
  },
  {
    id: "sheet-pan-salmon",
    title: "Sheet Pan Salmon with Roasted Vegetables",
    category: "dinner",
    cookingMethod: "oven",
    protein: "34g",
    prepTime: "10 minutes",
    cookTime: "20 minutes",
    serves: "4",
    ingredients: [
      "4 salmon fillets (6 oz each)",
      "2 zucchini, sliced",
      "1 red bell pepper, chunked",
      "1 yellow bell pepper, chunked",
      "1 red onion, wedged",
      "2 cups cherry tomatoes",
      "¼ cup olive oil",
      "3 cloves garlic, minced",
      "2 teaspoons dried oregano",
      "1 teaspoon dried basil",
      "2 lemons (1 juiced, 1 sliced)",
      "¼ cup capers",
      "Salt and pepper to taste",
      "Fresh dill for garnish"
    ],
    instructions: [
      "Preheat oven to 425°F (220°C). Line a large baking sheet with parchment.",
      "Toss vegetables with 2 tablespoons olive oil, half the garlic, oregano, basil, salt, and pepper.",
      "Spread vegetables on baking sheet and roast for 10 minutes.",
      "Meanwhile, mix remaining olive oil, garlic, and lemon juice.",
      "Push vegetables to the sides and place salmon in center.",
      "Brush salmon with oil mixture, top with lemon slices and capers.",
      "Roast for 12-15 minutes until salmon flakes easily.",
      "Garnish with fresh dill and serve immediately."
    ],
    tips: [
      "Use any firm fish like cod or halibut",
      "Add potatoes for a complete meal",
      "Meal prep by storing components separately"
    ]
  },
  {
    id: "mediterranean-turkey-meatballs",
    title: "Baked Mediterranean Turkey Meatballs",
    category: "dinner",
    cookingMethod: "oven",
    protein: "32g",
    prepTime: "15 minutes",
    cookTime: "25 minutes",
    serves: "4",
    ingredients: [
      "1.5 lbs ground turkey (93% lean)",
      "½ cup whole wheat breadcrumbs",
      "¼ cup milk",
      "1 egg",
      "½ cup crumbled feta cheese",
      "¼ cup fresh parsley, chopped",
      "¼ cup fresh mint, chopped",
      "3 cloves garlic, minced",
      "1 teaspoon dried oregano",
      "½ teaspoon ground cumin",
      "Zest of 1 lemon",
      "Salt and pepper to taste",
      "2 cups marinara sauce for serving"
    ],
    instructions: [
      "Preheat oven to 400°F (200°C). Line baking sheet with parchment.",
      "In a bowl, combine breadcrumbs and milk. Let soak for 5 minutes.",
      "Add turkey, egg, feta, herbs, garlic, spices, and lemon zest.",
      "Mix gently until just combined (don't overmix).",
      "Roll into 24 meatballs (about 1½ inches each).",
      "Bake for 20-25 minutes until golden and cooked through.",
      "Warm marinara sauce and serve meatballs over whole grain pasta or zucchini noodles."
    ],
    tips: [
      "Freeze cooked meatballs for quick meals",
      "Try ground chicken for variety",
      "Serve in pita with tzatziki for lunch"
    ]
  },
  {
    id: "crock-pot-chicken-stew",
    title: "Slow Cooker Mediterranean Chicken Stew",
    category: "dinner",
    cookingMethod: "crock-pot",
    protein: "38g",
    prepTime: "15 minutes",
    cookTime: "6-8 hours",
    serves: "6",
    ingredients: [
      "2 lbs boneless chicken thighs, cut into chunks",
      "1 can (14 oz) diced tomatoes",
      "1 cup chicken broth",
      "1 onion, diced",
      "3 cloves garlic, minced",
      "1 cup kalamata olives, pitted",
      "1 can (14 oz) artichoke hearts, drained",
      "2 tablespoons tomato paste",
      "2 teaspoons dried oregano",
      "1 teaspoon dried basil",
      "½ teaspoon red pepper flakes",
      "2 bay leaves",
      "1 can (15 oz) cannellini beans",
      "¼ cup fresh lemon juice",
      "Fresh basil for garnish"
    ],
    instructions: [
      "Add chicken, tomatoes, broth, onion, garlic, olives, artichokes, tomato paste, and spices to slow cooker.",
      "Stir to combine and add bay leaves.",
      "Cook on LOW for 6-8 hours or HIGH for 3-4 hours.",
      "In the last 30 minutes, add cannellini beans.",
      "Remove bay leaves and stir in lemon juice.",
      "Taste and adjust seasoning.",
      "Garnish with fresh basil and serve over quinoa or with crusty bread."
    ],
    tips: [
      "Prep ingredients the night before",
      "Works great with chicken breasts too",
      "Add spinach or kale in the last 30 minutes"
    ]
  },
  {
    id: "air-fryer-falafel",
    title: "Crispy Air Fryer Falafel",
    category: "lunch",
    cookingMethod: "air-fryer",
    protein: "26g",
    prepTime: "20 minutes + soaking",
    cookTime: "15 minutes",
    serves: "4",
    ingredients: [
      "2 cups dried chickpeas (soaked overnight)",
      "1 small onion, roughly chopped",
      "4 cloves garlic",
      "1 cup fresh parsley",
      "½ cup fresh cilantro",
      "1 teaspoon ground cumin",
      "1 teaspoon ground coriander",
      "¼ teaspoon cayenne pepper",
      "1 teaspoon salt",
      "½ teaspoon black pepper",
      "1 teaspoon baking powder",
      "2 tablespoons flour",
      "Olive oil spray"
    ],
    instructions: [
      "Drain soaked chickpeas thoroughly.",
      "In food processor, pulse chickpeas until coarsely ground.",
      "Add onion, garlic, herbs, and spices. Pulse until combined but not pureed.",
      "Transfer to bowl and add baking powder and flour. Mix well.",
      "Refrigerate mixture for 30 minutes.",
      "Form into 16-20 balls or patties.",
      "Preheat air fryer to 375°F (190°C).",
      "Spray falafel with olive oil and air fry for 15 minutes, flipping halfway.",
      "Serve in pita with tahini sauce, vegetables, and hummus."
    ],
    tips: [
      "Don't use canned chickpeas - they're too wet",
      "Freeze uncooked falafel for later",
      "Serve over salad for a lighter meal"
    ]
  },
  {
    id: "instant-pot-greek-chicken",
    title: "Instant Pot Greek Lemon Chicken",
    category: "dinner",
    cookingMethod: "instant-pot",
    protein: "40g",
    prepTime: "10 minutes",
    cookTime: "15 minutes",
    serves: "4",
    ingredients: [
      "2 lbs chicken breasts",
      "½ cup chicken broth",
      "¼ cup olive oil",
      "¼ cup fresh lemon juice",
      "4 cloves garlic, minced",
      "2 teaspoons dried oregano",
      "1 teaspoon dried thyme",
      "1 cup cherry tomatoes",
      "½ cup kalamata olives",
      "½ red onion, sliced",
      "½ cup crumbled feta",
      "Fresh oregano for garnish",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Season chicken with salt and pepper.",
      "Mix broth, olive oil, lemon juice, garlic, oregano, and thyme.",
      "Place chicken in Instant Pot and pour mixture over.",
      "Add tomatoes, olives, and onion around chicken.",
      "Secure lid and cook on high pressure for 8 minutes.",
      "Natural release for 5 minutes, then quick release.",
      "Shred chicken with two forks if desired.",
      "Top with feta and fresh oregano.",
      "Serve over rice, quinoa, or with pita bread."
    ],
    tips: [
      "Use chicken thighs for more flavor",
      "Add potatoes for a complete meal",
      "Save the cooking liquid as a flavorful broth"
    ]
  },
  {
    id: "tuna-white-bean-salad",
    title: "High-Protein Tuna & White Bean Salad",
    category: "lunch",
    cookingMethod: "no-cook",
    protein: "35g",
    prepTime: "10 minutes",
    serves: "2",
    ingredients: [
      "2 cans (5 oz each) tuna in olive oil, drained",
      "1 can (15 oz) cannellini beans, drained",
      "2 cups arugula",
      "1 cup cherry tomatoes, halved",
      "½ red onion, thinly sliced",
      "½ cucumber, diced",
      "¼ cup kalamata olives, pitted",
      "3 tablespoons olive oil",
      "2 tablespoons red wine vinegar",
      "1 tablespoon Dijon mustard",
      "2 tablespoons fresh dill, chopped",
      "Salt and pepper to taste"
    ],
    instructions: [
      "In a large bowl, combine arugula, tomatoes, onion, cucumber, and olives.",
      "Add drained tuna and white beans.",
      "In a small bowl, whisk olive oil, vinegar, mustard, and dill.",
      "Pour dressing over salad and toss gently.",
      "Season with salt and pepper.",
      "Let sit for 10 minutes for flavors to meld.",
      "Serve immediately or refrigerate for up to 2 days."
    ],
    tips: [
      "Use fresh grilled tuna for special occasions",
      "Add hard-boiled eggs for extra protein",
      "Serve on whole grain toast for a hearty meal"
    ]
  },
  {
    id: "mediterranean-quinoa-bowl",
    title: "Mediterranean Power Quinoa Bowl",
    category: "lunch",
    cookingMethod: "pan-cook",
    protein: "28g",
    prepTime: "15 minutes",
    cookTime: "20 minutes",
    serves: "4",
    ingredients: [
      "1½ cups quinoa",
      "3 cups vegetable broth",
      "1 can (15 oz) chickpeas, drained",
      "1 cup edamame, shelled",
      "2 cups cherry tomatoes, halved",
      "1 cucumber, diced",
      "1 cup roasted red peppers, sliced",
      "½ cup hemp seeds",
      "½ cup crumbled feta",
      "¼ cup tahini",
      "2 tablespoons lemon juice",
      "2 tablespoons water",
      "Fresh mint and parsley"
    ],
    instructions: [
      "Rinse quinoa and cook in vegetable broth according to package directions.",
      "While quinoa cooks, prepare vegetables.",
      "Roast chickpeas at 400°F for 20 minutes until crispy.",
      "Cook edamame according to package directions.",
      "Make tahini dressing by whisking tahini, lemon juice, and water.",
      "Fluff cooked quinoa and divide among bowls.",
      "Top with chickpeas, edamame, vegetables, hemp seeds, and feta.",
      "Drizzle with tahini dressing and garnish with herbs."
    ],
    tips: [
      "Meal prep by storing components separately",
      "Add grilled chicken for 40g+ protein",
      "Use any roasted vegetables you have on hand"
    ]
  },
  {
    id: "pan-seared-white-fish",
    title: "Pan-Seared White Fish with Olive Tapenade",
    category: "dinner",
    cookingMethod: "pan-cook",
    protein: "32g",
    prepTime: "10 minutes",
    cookTime: "10 minutes",
    serves: "4",
    ingredients: [
      "4 white fish fillets (6 oz each - cod, halibut, or sea bass)",
      "2 tablespoons olive oil",
      "Salt and pepper to taste",
      "For tapenade:",
      "1 cup mixed olives, pitted",
      "2 tablespoons capers",
      "2 anchovy fillets (optional)",
      "2 cloves garlic",
      "¼ cup olive oil",
      "2 tablespoons lemon juice",
      "¼ cup fresh parsley"
    ],
    instructions: [
      "Make tapenade: pulse olives, capers, anchovies, garlic in food processor.",
      "Add olive oil, lemon juice, and parsley. Pulse until chunky.",
      "Pat fish dry and season with salt and pepper.",
      "Heat olive oil in large skillet over medium-high heat.",
      "Cook fish 3-4 minutes per side until golden and flakes easily.",
      "Top each fillet with tapenade.",
      "Serve with roasted vegetables or over salad."
    ],
    tips: [
      "Make extra tapenade for other dishes",
      "Works with any firm white fish",
      "Try with salmon for omega-3 boost"
    ]
  },

  // ===== SNACK RECIPES =====
  {
    id: "protein-hummus-plate",
    title: "High-Protein Hummus Plate",
    category: "snack",
    cookingMethod: "no-cook",
    protein: "15g",
    prepTime: "5 minutes",
    serves: "1",
    ingredients: [
      "½ cup hummus",
      "2 hard-boiled eggs, sliced",
      "1 cup vegetable sticks (carrots, cucumbers, bell peppers)",
      "¼ cup mixed nuts",
      "2 tablespoons hemp seeds",
      "Olive oil for drizzling",
      "Paprika and za'atar for sprinkling"
    ],
    instructions: [
      "Spread hummus on a plate.",
      "Arrange sliced eggs and vegetables around hummus.",
      "Sprinkle with nuts and hemp seeds.",
      "Drizzle with olive oil and sprinkle with spices.",
      "Serve immediately."
    ],
    tips: [
      "Make your own hummus with extra tahini for more protein",
      "Add Greek yogurt to hummus for creaminess",
      "Prep vegetables ahead for quick assembly"
    ]
  },
  {
    id: "mediterranean-energy-balls",
    title: "Mediterranean Energy Balls",
    category: "snack",
    cookingMethod: "no-cook",
    protein: "6g per ball",
    prepTime: "15 minutes",
    serves: "12 balls",
    ingredients: [
      "1 cup pitted dates",
      "1 cup raw almonds",
      "¼ cup protein powder",
      "2 tablespoons chia seeds",
      "2 tablespoons tahini",
      "1 tablespoon honey",
      "1 teaspoon vanilla extract",
      "½ teaspoon cinnamon",
      "Pinch of salt",
      "Sesame seeds for rolling"
    ],
    instructions: [
      "Soak dates in warm water for 10 minutes, then drain.",
      "In food processor, pulse almonds until coarsely ground.",
      "Add dates, protein powder, chia seeds, tahini, honey, vanilla, cinnamon, and salt.",
      "Process until mixture sticks together when pressed.",
      "Roll into 12 balls.",
      "Roll in sesame seeds to coat.",
      "Refrigerate for at least 30 minutes before serving."
    ],
    tips: [
      "Store in refrigerator for up to 2 weeks",
      "Try different nuts and seeds for variety",
      "Add cacao powder for chocolate version"
    ]
  },
  {
    id: "greek-yogurt-bark",
    title: "Frozen Greek Yogurt Bark",
    category: "snack",
    cookingMethod: "no-cook",
    protein: "12g",
    prepTime: "10 minutes + freezing",
    serves: "6",
    ingredients: [
      "2 cups Greek yogurt",
      "2 tablespoons honey",
      "1 teaspoon vanilla extract",
      "¼ cup pistachios, chopped",
      "¼ cup almonds, sliced",
      "2 tablespoons chia seeds",
      "¼ cup dried cranberries",
      "¼ cup dark chocolate chips"
    ],
    instructions: [
      "Line a baking sheet with parchment paper.",
      "Mix Greek yogurt with honey and vanilla.",
      "Spread yogurt mixture evenly on baking sheet, about ¼ inch thick.",
      "Sprinkle with nuts, seeds, cranberries, and chocolate chips.",
      "Freeze for at least 3 hours until solid.",
      "Break into pieces and store in freezer."
    ],
    tips: [
      "Use full-fat yogurt for creamier texture",
      "Try different toppings like coconut or granola",
      "Perfect post-workout snack"
    ]
  },

  // ===== MORE BREAKFAST RECIPES =====
  {
    id: "mediterranean-frittata",
    title: "Mediterranean Vegetable Frittata",
    category: "breakfast",
    cookingMethod: "oven",
    protein: "25g",
    prepTime: "10 minutes",
    cookTime: "25 minutes",
    serves: "4",
    ingredients: [
      "8 large eggs",
      "¼ cup milk",
      "1 tablespoon olive oil",
      "1 small zucchini, diced",
      "1 red bell pepper, diced",
      "½ cup cherry tomatoes, halved",
      "½ cup frozen spinach, thawed and drained",
      "⅓ cup crumbled feta cheese",
      "¼ cup fresh basil, chopped",
      "2 cloves garlic, minced",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Preheat oven to 375°F (190°C).",
      "Whisk eggs and milk in a bowl, season with salt and pepper.",
      "Heat olive oil in oven-safe skillet over medium heat.",
      "Sauté zucchini and bell pepper for 5 minutes.",
      "Add garlic and tomatoes, cook 2 more minutes.",
      "Pour egg mixture over vegetables.",
      "Sprinkle with feta and basil.",
      "Transfer to oven and bake 20-25 minutes until set.",
      "Cool slightly before slicing into wedges."
    ],
    tips: [
      "Great for meal prep - stores 5 days in fridge",
      "Add cooked chicken sausage for extra protein",
      "Serve cold or reheat in microwave"
    ]
  },
  {
    id: "turkish-breakfast-spread",
    title: "Turkish-Style Protein Breakfast",
    category: "breakfast",
    cookingMethod: "no-cook",
    protein: "28g",
    prepTime: "10 minutes",
    serves: "2",
    ingredients: [
      "4 hard-boiled eggs",
      "200g halloumi cheese, sliced",
      "1 cup cherry tomatoes",
      "1 cucumber, sliced",
      "½ cup mixed olives",
      "4 tablespoons labneh or Greek yogurt",
      "2 whole wheat pitas",
      "Fresh mint and parsley",
      "Olive oil for drizzling",
      "Za'atar for sprinkling"
    ],
    instructions: [
      "Arrange eggs, halloumi, tomatoes, and cucumber on platter.",
      "Add olives and dollops of labneh.",
      "Warm pitas and cut into triangles.",
      "Garnish with fresh herbs.",
      "Drizzle with olive oil and sprinkle with za'atar.",
      "Serve family-style for sharing."
    ],
    tips: [
      "Grill halloumi for warm option",
      "Add hummus for extra protein",
      "Perfect for weekend brunch"
    ]
  },

  // ===== MORE LUNCH RECIPES =====
  {
    id: "chickpea-power-salad",
    title: "Roasted Chickpea Power Salad",
    category: "lunch",
    cookingMethod: "oven",
    protein: "26g",
    prepTime: "10 minutes",
    cookTime: "30 minutes",
    serves: "2",
    ingredients: [
      "2 cans (15 oz each) chickpeas, drained",
      "2 tablespoons olive oil",
      "1 teaspoon smoked paprika",
      "1 teaspoon cumin",
      "4 cups mixed greens",
      "1 cup quinoa, cooked",
      "1 avocado, sliced",
      "½ cup hemp seeds",
      "¼ cup tahini",
      "2 tablespoons lemon juice",
      "1 tablespoon maple syrup"
    ],
    instructions: [
      "Preheat oven to 425°F (220°C).",
      "Toss chickpeas with olive oil, paprika, and cumin.",
      "Roast for 25-30 minutes until crispy.",
      "Meanwhile, prepare tahini dressing by whisking tahini, lemon juice, and maple syrup.",
      "Assemble salads with greens, quinoa, roasted chickpeas, and avocado.",
      "Sprinkle with hemp seeds and drizzle with dressing."
    ],
    tips: [
      "Make extra chickpeas for snacking",
      "Add grilled chicken for 40g+ protein",
      "Dressing keeps for 1 week in fridge"
    ]
  },
  {
    id: "mediterranean-stuffed-peppers",
    title: "Instant Pot Stuffed Bell Peppers",
    category: "lunch",
    cookingMethod: "instant-pot",
    protein: "30g",
    prepTime: "15 minutes",
    cookTime: "15 minutes",
    serves: "4",
    ingredients: [
      "4 large bell peppers, tops cut and seeded",
      "1 lb ground turkey (93% lean)",
      "1 cup cooked quinoa",
      "1 can (15 oz) black beans, drained",
      "1 cup marinara sauce",
      "½ cup crumbled feta",
      "2 cloves garlic, minced",
      "1 teaspoon oregano",
      "1 cup water (for Instant Pot)",
      "Fresh basil for garnish"
    ],
    instructions: [
      "Brown turkey in Instant Pot on sauté mode.",
      "Mix turkey with quinoa, beans, half the marinara, feta, garlic, and oregano.",
      "Stuff peppers with mixture.",
      "Add water to Instant Pot and place trivet.",
      "Stand peppers upright on trivet.",
      "Cook on high pressure for 10 minutes.",
      "Quick release and top with remaining marinara.",
      "Garnish with fresh basil."
    ],
    tips: [
      "Use different colored peppers for presentation",
      "Freeze stuffed peppers before cooking for meal prep",
      "Works with ground chicken or lentils"
    ]
  },

  // ===== MORE DINNER RECIPES =====
  {
    id: "mediterranean-shrimp-pasta",
    title: "Garlic Shrimp Zucchini Noodles",
    category: "dinner",
    cookingMethod: "pan-cook",
    protein: "35g",
    prepTime: "15 minutes",
    cookTime: "10 minutes",
    serves: "4",
    ingredients: [
      "2 lbs large shrimp, peeled and deveined",
      "4 large zucchini, spiralized",
      "3 tablespoons olive oil",
      "4 cloves garlic, minced",
      "1 cup cherry tomatoes, halved",
      "½ cup white wine or broth",
      "¼ cup fresh lemon juice",
      "½ teaspoon red pepper flakes",
      "½ cup fresh basil, chopped",
      "¼ cup pine nuts, toasted",
      "Parmesan for serving"
    ],
    instructions: [
      "Heat 2 tablespoons olive oil in large skillet.",
      "Cook shrimp 2-3 minutes per side until pink. Remove.",
      "Add remaining oil and garlic, cook 30 seconds.",
      "Add tomatoes, wine, lemon juice, and pepper flakes.",
      "Add zucchini noodles, toss 2-3 minutes until tender.",
      "Return shrimp to pan with basil.",
      "Top with pine nuts and Parmesan."
    ],
    tips: [
      "Don't overcook zucchini noodles",
      "Use whole wheat pasta for more calories",
      "Add white beans for extra protein"
    ]
  },
  {
    id: "lamb-kofta-skewers",
    title: "Air Fryer Lamb Kofta Skewers",
    category: "dinner",
    cookingMethod: "air-fryer",
    protein: "38g",
    prepTime: "20 minutes",
    cookTime: "12 minutes",
    serves: "4",
    ingredients: [
      "2 lbs ground lamb",
      "1 small onion, grated",
      "¼ cup fresh parsley, chopped",
      "¼ cup fresh mint, chopped",
      "3 cloves garlic, minced",
      "2 teaspoons ground cumin",
      "1 teaspoon ground coriander",
      "½ teaspoon cinnamon",
      "1 teaspoon salt",
      "½ teaspoon black pepper",
      "Wooden skewers, soaked"
    ],
    instructions: [
      "Mix all ingredients in a bowl until well combined.",
      "Divide into 8 portions and shape around skewers.",
      "Refrigerate for 30 minutes to firm up.",
      "Preheat air fryer to 370°F (188°C).",
      "Cook kofta for 12 minutes, turning once.",
      "Serve with tzatziki, pita, and salad."
    ],
    tips: [
      "Mix lamb with beef for milder flavor",
      "Shape without skewers for kofta meatballs",
      "Double recipe and freeze extras"
    ]
  },
  {
    id: "mediterranean-fish-stew",
    title: "One-Pot Mediterranean Fish Stew",
    category: "dinner",
    cookingMethod: "pan-cook",
    protein: "36g",
    prepTime: "15 minutes",
    cookTime: "25 minutes",
    serves: "4",
    ingredients: [
      "1.5 lbs mixed white fish, cubed",
      "½ lb shrimp, peeled",
      "2 tablespoons olive oil",
      "1 onion, diced",
      "1 fennel bulb, sliced",
      "3 cloves garlic, minced",
      "1 can (28 oz) crushed tomatoes",
      "2 cups fish or vegetable stock",
      "½ cup white wine",
      "1 teaspoon saffron threads",
      "2 bay leaves",
      "1 teaspoon smoked paprika",
      "Fresh parsley and lemon"
    ],
    instructions: [
      "Heat olive oil in large pot over medium heat.",
      "Sauté onion and fennel until softened, 5 minutes.",
      "Add garlic, cook 1 minute.",
      "Add tomatoes, stock, wine, saffron, bay leaves, and paprika.",
      "Simmer 15 minutes to develop flavors.",
      "Add fish, cook 5 minutes.",
      "Add shrimp, cook 3-4 minutes until pink.",
      "Garnish with parsley and lemon."
    ],
    tips: [
      "Serve with crusty bread for dipping",
      "Use any firm white fish available",
      "Add mussels or clams for variety"
    ]
  },

  // ===== MORE SNACKS =====
  {
    id: "roasted-red-pepper-dip",
    title: "High-Protein Red Pepper & Walnut Dip",
    category: "snack",
    cookingMethod: "no-cook",
    protein: "8g",
    prepTime: "10 minutes",
    serves: "6",
    ingredients: [
      "2 large roasted red peppers (jarred)",
      "1 cup walnuts, toasted",
      "½ cup Greek yogurt",
      "2 cloves garlic",
      "1 tablespoon pomegranate molasses",
      "1 teaspoon smoked paprika",
      "½ teaspoon cumin",
      "2 tablespoons olive oil",
      "Salt to taste"
    ],
    instructions: [
      "Drain roasted peppers well.",
      "In food processor, blend walnuts until finely ground.",
      "Add peppers, yogurt, garlic, pomegranate molasses, and spices.",
      "Process until smooth, drizzling in olive oil.",
      "Season with salt to taste.",
      "Serve with vegetables or whole grain crackers."
    ],
    tips: [
      "Traditional muhammara made healthier with yogurt",
      "Stores for 1 week in refrigerator",
      "Use as sandwich spread too"
    ]
  },
  {
    id: "mediterranean-trail-mix",
    title: "Mediterranean Power Trail Mix",
    category: "snack",
    cookingMethod: "no-cook",
    protein: "10g per serving",
    prepTime: "5 minutes",
    serves: "8",
    ingredients: [
      "1 cup raw almonds",
      "1 cup roasted chickpeas",
      "½ cup pumpkin seeds",
      "½ cup dried apricots, chopped",
      "½ cup dried figs, chopped",
      "¼ cup dark chocolate chips",
      "2 tablespoons chia seeds",
      "1 teaspoon dried rosemary",
      "½ teaspoon sea salt"
    ],
    instructions: [
      "Mix all ingredients in a large bowl.",
      "Store in airtight container.",
      "Portion into ½ cup servings for grab-and-go snacks."
    ],
    tips: [
      "Make your own roasted chickpeas for freshness",
      "Substitute any nuts or dried fruits",
      "Great pre or post-workout snack"
    ]
  }
];

// Helper functions for filtering
export function getRecipesByCategory(category: Recipe['category']): Recipe[] {
  return recipes.filter(recipe => recipe.category === category);
}

export function getRecipesByCookingMethod(method: Recipe['cookingMethod']): Recipe[] {
  return recipes.filter(recipe => recipe.cookingMethod === method);
}

export function getRecipeById(id: string): Recipe | undefined {
  return recipes.find(recipe => recipe.id === id);
}
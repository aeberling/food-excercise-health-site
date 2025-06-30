# Mediterranean Power Plan - Astro Website

A comprehensive Mediterranean diet and exercise website built with Astro and Tailwind CSS, optimized for printing and designed for active adults.

## 🌟 Features

- **2-Week Meal Plan** - Complete calendar with high-protein Mediterranean meals (25-40g protein per serving)
- **Recipe Collection** - Detailed recipes with ingredients, instructions, and pro tips
- **Shopping Lists** - Weekly grocery lists organized by category with checkboxes
- **Exercise Plan** - 7-day workout schedule combining strength training, cardio, and martial arts
- **Print-Optimized** - Every page is designed for clean printing with proper page breaks
- **Responsive Design** - Mobile-friendly layout with Tailwind CSS
- **Interactive Elements** - Collapsible recipe cards, week navigation, and mobile menu

## 🏃‍♂️ Designed For Active Athletes

This plan is specifically tailored for middle-aged men who are active in:
- 🏸 Badminton (4+ hours twice weekly)
- 🥋 Taekwondo training
- 🏃‍♂️ Running and cardio
- 💪 Strength training

## 📱 Pages Included

1. **Home** (`/`) - Overview and navigation
2. **Meal Plan** (`/meal-plan`) - 2-week calendar with clickable meal links
3. **Recipes** (`/recipes`) - Detailed Mediterranean recipes organized by category
4. **Shopping Lists** (`/shopping-lists`) - Weekly grocery lists with checkboxes
5. **Exercise Plan** (`/exercise-plan`) - Complete workout schedule with detailed instructions

## 🖨️ Print Features

Every page includes print-specific optimizations:
- Hidden navigation during printing
- Proper page breaks to avoid splitting content
- Optimized font sizes for readability
- Black text and clean layouts
- Recipe cards that stay together
- Shopping list checkboxes for easy marking

## 🚀 Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd mediterranean-health-site
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:4321`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 🛠️ Tech Stack

- **[Astro](https://astro.build/)** - Static site generator
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **TypeScript** - Type-safe JavaScript
- **Responsive Design** - Mobile-first approach

## 📖 Content Organization

### Recipes
- **Breakfast**: Greek Yogurt Power Bowl, Mediterranean Egg Muffins, Shakshuka
- **Air Fryer**: Crispy Chicken Thighs, Mediterranean Salmon, Greek Souvlaki
- **Instant Pot**: Lentil Soup, Beef Stew, Chicken with Orzo

### Meal Plan
- **Week 1**: Foundation week with core recipes
- **Week 2**: Expansion week with more variety
- **Protein Targets**: 25-40g per meal, 80-100g daily

### Exercise Plan
- **Monday**: Lower Body Strength (60 min)
- **Tuesday**: Taekwondo + Interval Running (75 min)
- **Wednesday**: Badminton + Core Work (4+ hours)
- **Thursday**: Upper Body + Taekwondo Flexibility (75 min)
- **Friday**: Active Recovery (30-45 min)
- **Saturday**: Long Run + Circuit Training (90 min)
- **Sunday**: Badminton + Upper Body Weights (4+ hours)

## 🎯 Nutritional Focus

- **High Protein**: 25-40g per meal to support muscle recovery
- **Anti-Inflammatory**: Olive oil, fatty fish, and Mediterranean staples
- **Sustained Energy**: Complex carbohydrates from whole grains
- **Recovery Optimization**: Nutrient-dense foods for athletic performance

## 📋 Project Structure

```
src/
├── components/
│   ├── Navigation.astro      # Main navigation component
│   └── RecipeCard.astro      # Reusable recipe card component
├── layouts/
│   └── Layout.astro          # Base layout with print styles
├── pages/
│   ├── index.astro           # Home page
│   ├── meal-plan.astro       # 2-week meal calendar
│   ├── recipes.astro         # Recipe collection
│   ├── shopping-lists.astro  # Grocery lists
│   └── exercise-plan.astro   # Workout schedule
└── styles/
    └── global.css            # Global styles and Tailwind imports
```

## 🖨️ Printing Tips

1. Use the print button on any page (bottom right)
2. Set margins to "Minimum" in print settings
3. Enable "Background graphics" for better appearance
4. Consider printing in "Landscape" for wide tables
5. Each section is designed to fit cleanly on standard 8.5x11" paper

## 📈 Performance Benefits

Expected improvements for athletes following this plan:
- **Energy**: 15-40% improvement in sustained energy levels
- **Recovery**: Faster muscle repair and reduced inflammation
- **Sleep**: Better sleep quality from magnesium-rich foods
- **Endurance**: Enhanced cardiovascular performance
- **Mental Clarity**: Improved focus from omega-3 fatty acids

## 🤝 Contributing

This project is designed as a personal health plan but can be adapted for similar use cases. Feel free to fork and modify for your own needs.

## 📄 License

MIT License - Feel free to use and modify for personal use.

---

**Note**: This meal plan and exercise routine are designed for active adults. Consult with healthcare providers before making significant dietary or exercise changes, especially if you have any health conditions.
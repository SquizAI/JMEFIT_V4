export type ContentType = 'all' | 'article' | 'recipe' | 'workout' | 'nutrition';
export type AccessLevel = 'free' | 'premium' | 'members-only';

export interface Content {
  id: number;
  title: string;
  type: ContentType;
  category: string;
  description: string;
  content: string;
  image: string;
  date: string;
  status: 'draft' | 'published';
  accessLevel: AccessLevel;
  previewContent?: string; // Short preview for premium content
}

export interface Recipe extends Content {
  ingredients: string[];
  instructions: string[];
  nutritionInfo: {
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
  };
}

export interface Workout extends Content {
  exercises: {
    name: string;
    sets: number;
    reps: string;
    notes?: string;
  }[];
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface NutritionGuide extends Content {
  macros?: {
    protein: string;
    carbs: string;
    fat: string;
  };
  mealPlan?: {
    meal: string;
    foods: string[];
    timing: string;
  }[];
}
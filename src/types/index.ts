export interface Store {
  id: string;
  name: string;
}

export interface Ingredient {
  id: string;
  name: string;
  category: 'protein' | 'vegetable' | 'fruit' | 'starch' | 'dairy' | 'spice' | 'other';
  availability: IngredientAvailability[];
}

export interface IngredientAvailability {
  storeId: string;
  inStock: boolean;
  quality: 'excellent' | 'good' | 'fair';
}

export interface MealIngredient {
  ingredientId: string;
  quantity: number;
}

export interface Meal {
  id: string;
  name: string;
  description: string;
  category: 'breakfast' | 'lunch' | 'dinner' ;
  prepTime: number;
  servings: number;
  ingredients: MealIngredient[];
  instructions: string[];
}

export interface PlannedMeal {
  id: string;
  mealId: string;
  date: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' ;
  servings: number;
}

export interface ShoppingListItem {
  ingredientId: string;
  quantity: number;
  bestStore: string;
  estimatedCost: number;
}
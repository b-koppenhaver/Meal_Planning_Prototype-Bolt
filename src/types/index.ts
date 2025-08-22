export interface Store {
  id: string;
  name: string;
  location: string;
  type: 'grocery' | 'butcher' | 'farmer' | 'specialty';
}

export interface Ingredient {
  id: string;
  name: string;
  category: 'protein' | 'vegetable' | 'fruit' | 'grain' | 'dairy' | 'spice' | 'other';
  unit: string;
  availability: IngredientAvailability[];
}

export interface IngredientAvailability {
  storeId: string;
  price: number;
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
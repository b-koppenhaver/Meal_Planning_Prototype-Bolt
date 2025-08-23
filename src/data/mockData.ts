import { Store, Ingredient, Meal, PlannedMeal } from '../types';

export const stores: Store[] = [
  {
    id: '1',
    name: 'Costco'
  },
  {
    id: '2',
    name: 'Aldi'
  },
  {
    id: '3',
    name: 'Trader Joes'
  },
  {
    id: '4',
    name: 'Harris Teeter'
  },
  {
    id: '5',
    name: 'Lotte'
  }
];

export const ingredients: Ingredient[] = [
  {
    id: '1',
    name: 'Chicken Thighs',
    category: 'protein',
    availability: [
      { storeId: '1', inStock: true },
      { storeId: '2', inStock: true },
      { storeId: '3', inStock: true },
      { storeId: '4', inStock: true }
    ]
  },
  {
    id: '2',
    name: 'Rice',
    category: 'starch',
    availability: [
      { storeId: '1', inStock: true },
      { storeId: '2', inStock: true },
      { storeId: '3', inStock: true }
    ]
  },
  {
    id: '3',
    name: 'Broccoli',
    category: 'vegetable',
    availability: [
      { storeId: '1', inStock: true },
      { storeId: '2', inStock: true },
      { storeId: '3', inStock: false }
    ]
  },
  {
    id: '4',
    name: 'Ground Beef',
    category: 'protein',
    availability: [
      { storeId: '1', inStock: true },
      { storeId: '3', inStock: true },
      { storeId: '4', inStock: true }
    ]
  },
  {
    id: '5',
    name: 'Bell Peppers',
    category: 'vegetable',
    availability: [
      { storeId: '1', inStock: true },
      { storeId: '2', inStock: true },
      { storeId: '3', inStock: true }
    ]
  },
  {
    id: '6',
    name: 'Onions',
    category: 'vegetable',
    availability: [
      { storeId: '1', inStock: true },
      { storeId: '2', inStock: true },
      { storeId: '3', inStock: true }
    ]
  },
  {
    id: '7',
    name: 'Soy Sauce',
    category: 'condiment',
    availability: [
      { storeId: '1', inStock: true },
      { storeId: '2', inStock: true },
      { storeId: '3', inStock: true }
    ]
  },
  {
    id: '8',
    name: 'Coconut Milk',
    category: 'dairy',
    availability: [
      { storeId: '1', inStock: true },
      { storeId: '2', inStock: true },
      { storeId: '3', inStock: false }
    ]
  },
  {
    id: '9',
    name: 'Curry Powder',
    category: 'spice',
    availability: [
      { storeId: '1', inStock: true },
      { storeId: '2', inStock: true },
      { storeId: '3', inStock: true }
    ]
  },
  {
    id: '10',
    name: 'Potatoes',
    category: 'vegetable',
    availability: [
      { storeId: '1', inStock: true },
      { storeId: '2', inStock: true },
      { storeId: '3', inStock: true }
    ]
  },
  {
    id: '11',
    name: 'Eggs',
    category: 'protein',
    availability: [
      { storeId: '1', inStock: true },
      { storeId: '2', inStock: true },
      { storeId: '3', inStock: true }
    ]
  },
  {
    id: '12',
    name: 'Oats',
    category: 'starch',
    availability: [
      { storeId: '1', inStock: true },
      { storeId: '2', inStock: true },
      { storeId: '3', inStock: true }
    ]
  },
  {
    id: '13',
    name: 'Milk',
    category: 'dairy',
    availability: [
      { storeId: '1', inStock: true },
      { storeId: '2', inStock: true },
      { storeId: '3', inStock: true }
    ]
  },
  {
    id: '14',
    name: 'Berries',
    category: 'fruit',
    availability: [
      { storeId: '1', inStock: true },
      { storeId: '2', inStock: true },
      { storeId: '3', inStock: false }
    ]
  }
];

export const meals: Meal[] = [
  {
    id: '1',
    name: 'Chicken and Rice Bowl',
    category: 'dinner',
    servings: 4,
    prepTime: 30,
    ingredients: [
      { ingredientId: '1', quantity: 1.5 },
      { ingredientId: '2', quantity: 2 },
      { ingredientId: '3', quantity: 1 }
    ]
  },
  {
    id: '2',
    name: 'Beef Stir Fry',
    category: 'dinner',
    servings: 6,
    prepTime: 25,
    ingredients: [
      { ingredientId: '4', quantity: 2 },
      { ingredientId: '5', quantity: 1 },
      { ingredientId: '6', quantity: 0.5 },
      { ingredientId: '7', quantity: 1 }
    ]
  },
  {
    id: '3',
    name: 'Vegetable Curry',
    category: 'dinner',
    servings: 8,
    prepTime: 45,
    ingredients: [
      { ingredientId: '8', quantity: 2 },
      { ingredientId: '9', quantity: 1 },
      { ingredientId: '10', quantity: 2 },
      { ingredientId: '6', quantity: 1 }
    ]
  },
  {
    id: '4',
    name: 'Breakfast Bowl',
    category: 'breakfast',
    servings: 2,
    prepTime: 10,
    ingredients: [
      { ingredientId: '12', quantity: 1 },
      { ingredientId: '13', quantity: 0.5 },
      { ingredientId: '14', quantity: 1 }
    ]
  },
  {
    id: '5',
    name: 'Scrambled Eggs',
    category: 'breakfast',
    servings: 3,
    prepTime: 15,
    ingredients: [
      { ingredientId: '11', quantity: 1 },
      { ingredientId: '13', quantity: 0.25 }
    ]
  }
];

export const plannedMeals: PlannedMeal[] = [
  {
    id: '1',
    mealId: '1',
    date: '2025-01-15',
    mealType: 'dinner'
  },
  {
    id: '2',
    mealId: '2',
    date: '2025-01-16',
    mealType: 'dinner'
  },
  {
    id: '3',
    mealId: '3',
    date: '2025-01-17',
    mealType: 'dinner'
  },
  {
    id: '4',
    mealId: '4',
    date: '2025-01-15',
    mealType: 'breakfast'
  },
  {
    id: '5',
    mealId: '5',
    date: '2025-01-16',
    mealType: 'breakfast'
  }
];
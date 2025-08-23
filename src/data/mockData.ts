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
      { storeId: '1', inStock: true, quality: 'excellent', price: 8.99, preferenceRank: 1 },
      { storeId: '2', inStock: true, quality: 'good', price: 7.49, preferenceRank: 2 },
      { storeId: '3', inStock: true, quality: 'good', price: 8.29, preferenceRank: 3 }
    ]
  },
  {
    id: '2',
    name: 'Rice',
    category: 'starch',
    availability: [
      { storeId: '1', inStock: true },
      { storeId: '2', inStock: true },
      { storeId: '3', inStock: true },
      { storeId: '4', inStock: true },
      { storeId: '4', inStock: true }
    ]
  },
  {
    id: '3',
    name: 'Broccoli',
    category: 'vegetable',
    availability: [
      { storeId: '1', inStock: true },
      { storeId: '2', inStock: true },
      { storeId: '3', inStock: true },
      { storeId: '4', inStock: true },
      { storeId: '4', inStock: true }
    ]
  },
  {
    id: '4',
    name: 'Ground Beef',
    category: 'protein',
    availability: [
      { storeId: '1', inStock: true },
      { storeId: '2', inStock: true },
      { storeId: '3', inStock: true }
    ]
  },
  {
    id: '5',
    name: 'Bell Peppers',
    category: 'vegetable',
    availability: [
      { storeId: '2', inStock: true },
      { storeId: '3', inStock: true },
      { storeId: '4', inStock: true }
    ]
  },
  {
    id: '6',
    name: 'Onions',
    category: 'vegetable',
    availability: [
      { storeId: '1', inStock: true, quality: 'excellent', price: 12.99, preferenceRank: 1 },
      { storeId: '2', inStock: true, quality: 'good', price: 3.99, preferenceRank: 2 },
      { storeId: '3', inStock: true, quality: 'good', price: 4.49, preferenceRank: 2 },
      { storeId: '4', inStock: true, quality: 'fair', price: 5.99, preferenceRank: 3 },
      { storeId: '5', inStock: true, quality: 'excellent', price: 2.99, preferenceRank: 1 }
    ]
  },
  {
    id: '7',
    name: 'Tomatoes',
    category: 'vegetable',
    availability: [
      { storeId: '1', inStock: true, quality: 'good', price: 3.49, preferenceRank: 2 },
      { storeId: '2', inStock: true, quality: 'fair', price: 2.99, preferenceRank: 3 },
      { storeId: '3', inStock: true, quality: 'excellent', price: 4.99, preferenceRank: 1 },
      { storeId: '4', inStock: true, quality: 'excellent', price: 4.99, preferenceRank: 1 },
      { storeId: '5', inStock: false, quality: 'good', price: 3.99, preferenceRank: 2 }
    ]
  },
  {
    id: '8',
    name: 'Milk',
    category: 'dairy',
    availability: [
      { storeId: '2', inStock: true, quality: 'good', price: 1.99, preferenceRank: 1 },
      { storeId: '3', inStock: true, quality: 'good', price: 1.99, preferenceRank: 1 },
      { storeId: '4', inStock: true, quality: 'fair', price: 1.49, preferenceRank: 2 },
      { storeId: '5', inStock: true, quality: 'excellent', price: 2.49, preferenceRank: 3 },
      { storeId: '4', inStock: true }
    ]
  },
  {
    id: '9',
    name: 'Steak Seasoning',
    category: 'spice',
    availability: [
      { storeId: '2', inStock: true, quality: 'good', price: 2.49, preferenceRank: 2 },
      { storeId: '5', inStock: true, quality: 'excellent', price: 3.99, preferenceRank: 1 },
      { storeId: '4', inStock: true }
    ]
  },
  {
    id: '10',
    name: 'Potatoes',
    category: 'vegetable',
    availability: [
      { storeId: '1', inStock: true, quality: 'excellent', price: 4.99, preferenceRank: 1 },
      { storeId: '2', inStock: true, quality: 'good', price: 3.99, preferenceRank: 2 },
      { storeId: '3', inStock: true, quality: 'good', price: 4.29, preferenceRank: 3 },
      { storeId: '4', inStock: true, quality: 'fair', price: 3.49, preferenceRank: 4 },
      { storeId: '4', inStock: true }
    ]
  },
  {
    id: '11',
    name: 'Eggs',
    category: 'protein',
    availability: [
      { storeId: '2', inStock: true, quality: 'good', price: 3.49, preferenceRank: 1 },
      { storeId: '4', inStock: true, quality: 'good', price: 3.49, preferenceRank: 1 },
      { storeId: '2', inStock: true },
      { storeId: '3', inStock: true },
      { storeId: '4', inStock: true }

    ]
  },
  {
    id: '12',
    name: 'Cheese',
    category: 'dairy',
    availability: [
      { storeId: '1', inStock: true, quality: 'excellent', price: 4.99, preferenceRank: 1 },
      { storeId: '2', inStock: true, quality: 'good', price: 3.99, preferenceRank: 2 },
      { storeId: '3', inStock: true, quality: 'good', price: 4.29, preferenceRank: 2 },
      { storeId: '4', inStock: true, quality: 'fair', price: 3.49, preferenceRank: 3 },
      { storeId: '2', inStock: true },
      { storeId: '3', inStock: true }
    ]
  },
  {
    id: '13',
    name: 'Yogurt',
    category: 'dairy',
    availability: [
      { storeId: '1', inStock: true, quality: 'excellent', price: 3.99, preferenceRank: 1 },
      { storeId: '2', inStock: true, quality: 'good', price: 2.99, preferenceRank: 2 },
      { storeId: '3', inStock: true, quality: 'good', price: 3.29, preferenceRank: 3 },
      { storeId: '4', inStock: true, quality: 'fair', price: 2.49, preferenceRank: 4 }
    ]
  },
  {
    id: '14',
    name: 'Berries',
    category: 'fruit',
    availability: [
      { storeId: '2', inStock: true, quality: 'good', price: 2.99, preferenceRank: 1 },
      { storeId: '3', inStock: true, quality: 'excellent', price: 3.49, preferenceRank: 2 },
      { storeId: '3', inStock: false }
    ]
  }
];

export const meals: Meal[] = [
  {
    id: '1',
    name: 'Chicken and Rice',
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
      { ingredientId: '6', quantity: 0.5 }
    ]
  },
  {
    id: '3',
    name: 'Breakfast Bowl',
    category: 'breakfast',
    servings: 2,
    prepTime: 10,
    ingredients: [
      { ingredientId: '11', quantity: 3 },
      { ingredientId: '13', quantity: 0.5 },
      { ingredientId: '14', quantity: 1 }
    ]
  },
  {
    id: '4',
    name: 'Scrambled Eggs',
    category: 'breakfast',
    servings: 1,
    prepTime: 5,
    ingredients: [
      { ingredientId: '11', quantity: 2 },
      { ingredientId: '8', quantity: 0.25 }
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
    date: '2025-01-18',
    mealType: 'breakfast'
  }
];
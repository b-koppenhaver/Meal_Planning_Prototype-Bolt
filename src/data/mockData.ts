import { Store, Ingredient, Meal, PlannedMeal } from '../types';

export const stores: Store[] = [
  {
    id: '1',
    name: 'Fresh Market',
    location: '123 Main St',
    type: 'grocery'
  },
  {
    id: '2',
    name: 'Organic Foods Co',
    location: '456 Oak Ave',
    type: 'organic'
  },
  {
    id: '3',
    name: 'Budget Grocers',
    location: '789 Pine Rd',
    type: 'discount'
  },
  {
    id: '4',
    name: 'Specialty Meats',
    location: '321 Elm St',
    type: 'butcher'
  }
];

export const ingredients: Ingredient[] = [
  {
    id: '1',
    name: 'Chicken Breast',
    category: 'protein',
    unit: 'lb',
    storeAvailability: [
      { storeId: '1', price: 6.99, inStock: true },
      { storeId: '2', price: 8.49, inStock: true },
      { storeId: '3', price: 5.99, inStock: true },
      { storeId: '4', price: 7.99, inStock: true }
    ]
  },
  {
    id: '2',
    name: 'Rice',
    category: 'grain',
    unit: 'lb',
    storeAvailability: [
      { storeId: '1', price: 2.49, inStock: true },
      { storeId: '2', price: 3.99, inStock: true },
      { storeId: '3', price: 1.99, inStock: true }
    ]
  },
  {
    id: '3',
    name: 'Broccoli',
    category: 'vegetable',
    unit: 'lb',
    storeAvailability: [
      { storeId: '1', price: 2.99, inStock: true },
      { storeId: '2', price: 3.49, inStock: true },
      { storeId: '3', price: 2.49, inStock: false }
    ]
  },
  {
    id: '4',
    name: 'Ground Beef',
    category: 'protein',
    unit: 'lb',
    storeAvailability: [
      { storeId: '1', price: 5.99, inStock: true },
      { storeId: '3', price: 4.99, inStock: true },
      { storeId: '4', price: 6.49, inStock: true }
    ]
  },
  {
    id: '5',
    name: 'Bell Peppers',
    category: 'vegetable',
    unit: 'lb',
    storeAvailability: [
      { storeId: '1', price: 3.49, inStock: true },
      { storeId: '2', price: 3.99, inStock: true },
      { storeId: '3', price: 2.99, inStock: true }
    ]
  },
  {
    id: '6',
    name: 'Onions',
    category: 'vegetable',
    unit: 'lb',
    storeAvailability: [
      { storeId: '1', price: 1.49, inStock: true },
      { storeId: '2', price: 1.99, inStock: true },
      { storeId: '3', price: 1.29, inStock: true }
    ]
  },
  {
    id: '7',
    name: 'Soy Sauce',
    category: 'condiment',
    unit: 'bottle',
    storeAvailability: [
      { storeId: '1', price: 2.99, inStock: true },
      { storeId: '2', price: 3.49, inStock: true },
      { storeId: '3', price: 2.49, inStock: true }
    ]
  },
  {
    id: '8',
    name: 'Coconut Milk',
    category: 'dairy',
    unit: 'can',
    storeAvailability: [
      { storeId: '1', price: 1.99, inStock: true },
      { storeId: '2', price: 2.49, inStock: true },
      { storeId: '3', price: 1.79, inStock: false }
    ]
  },
  {
    id: '9',
    name: 'Curry Powder',
    category: 'spice',
    unit: 'jar',
    storeAvailability: [
      { storeId: '1', price: 3.99, inStock: true },
      { storeId: '2', price: 4.49, inStock: true },
      { storeId: '3', price: 3.49, inStock: true }
    ]
  },
  {
    id: '10',
    name: 'Potatoes',
    category: 'vegetable',
    unit: 'lb',
    storeAvailability: [
      { storeId: '1', price: 1.99, inStock: true },
      { storeId: '2', price: 2.49, inStock: true },
      { storeId: '3', price: 1.69, inStock: true }
    ]
  },
  {
    id: '11',
    name: 'Eggs',
    category: 'protein',
    unit: 'dozen',
    storeAvailability: [
      { storeId: '1', price: 3.49, inStock: true },
      { storeId: '2', price: 4.99, inStock: true },
      { storeId: '3', price: 2.99, inStock: true }
    ]
  },
  {
    id: '12',
    name: 'Oats',
    category: 'grain',
    unit: 'lb',
    storeAvailability: [
      { storeId: '1', price: 2.99, inStock: true },
      { storeId: '2', price: 3.99, inStock: true },
      { storeId: '3', price: 2.49, inStock: true }
    ]
  },
  {
    id: '13',
    name: 'Milk',
    category: 'dairy',
    unit: 'gallon',
    storeAvailability: [
      { storeId: '1', price: 3.99, inStock: true },
      { storeId: '2', price: 4.49, inStock: true },
      { storeId: '3', price: 3.49, inStock: true }
    ]
  },
  {
    id: '14',
    name: 'Berries',
    category: 'fruit',
    unit: 'cup',
    storeAvailability: [
      { storeId: '1', price: 4.99, inStock: true },
      { storeId: '2', price: 5.99, inStock: true },
      { storeId: '3', price: 4.49, inStock: false }
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
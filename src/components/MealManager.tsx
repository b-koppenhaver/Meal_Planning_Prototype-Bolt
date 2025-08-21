import React, { useState } from 'react';
import { Plus, Clock, Users, Edit2, Trash2, Utensils } from 'lucide-react';
import { meals, ingredients, stores } from '../data/mockData';
import { Meal } from '../types';

const MealManager: React.FC = () => {
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const categoryColors = {
    breakfast: 'bg-orange-100 text-orange-800',
    lunch: 'bg-blue-100 text-blue-800',
    dinner: 'bg-purple-100 text-purple-800',
    snack: 'bg-green-100 text-green-800'
  };

  const getMealIngredientDetails = (meal: Meal) => {
    return meal.ingredients.map(mi => {
      const ingredient = ingredients.find(i => i.id === mi.ingredientId);
      return {
        name: ingredient?.name || 'Unknown',
        quantity: mi.quantity,
        unit: ingredient?.unit || '',
        availability: ingredient?.availability || []
      };
    });
  };

  const getBestStore = (ingredientId: string) => {
    const ingredient = ingredients.find(i => i.id === ingredientId);
    if (!ingredient || ingredient.availability.length === 0) return null;
    
    const bestAvail = ingredient.availability
      .filter(a => a.inStock)
      .sort((a, b) => a.price - b.price)[0];
    
    if (!bestAvail) return null;
    
    return stores.find(s => s.id === bestAvail.storeId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Meal Management</h2>
          <p className="text-gray-600 mt-1">Create and manage your meal recipes</p>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200"
        >
          <Plus className="mr-2" size={20} />
          Add Meal
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900">Your Meals</h3>
          {meals.map((meal) => (
            <div
              key={meal.id}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-200 cursor-pointer"
              onClick={() => setSelectedMeal(meal)}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{meal.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{meal.description}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[meal.category]}`}>
                  {meal.category}
                </span>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <Clock size={16} className="mr-1" />
                  {meal.prepTime} min
                </div>
                <div className="flex items-center">
                  <Users size={16} className="mr-1" />
                  {meal.servings} servings
                </div>
              </div>
              
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  {meal.ingredients.length} ingredients
                </span>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-150">
                    <Edit2 size={16} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-150">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-100">
          {selectedMeal ? (
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{selectedMeal.name}</h3>
                  <p className="text-gray-600 mt-1">{selectedMeal.description}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[selectedMeal.category]}`}>
                  {selectedMeal.category}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Clock size={16} className="mr-2 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Prep Time</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900 mt-1">{selectedMeal.prepTime} min</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Users size={16} className="mr-2 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Servings</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900 mt-1">{selectedMeal.servings}</p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Ingredients</h4>
                <div className="space-y-3">
                  {getMealIngredientDetails(selectedMeal).map((ingredient, index) => {
                    const bestStore = getBestStore(selectedMeal.ingredients[index].ingredientId);
                    return (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{ingredient.name}</p>
                          <p className="text-sm text-gray-600">
                            {ingredient.quantity} {ingredient.unit}
                          </p>
                        </div>
                        {bestStore && (
                          <div className="text-right">
                            <p className="text-sm font-medium text-emerald-600">{bestStore.name}</p>
                            <p className="text-xs text-gray-500">{bestStore.location}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Instructions</h4>
                <div className="space-y-2">
                  {selectedMeal.instructions.map((instruction, index) => (
                    <div key={index} className="flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                        {index + 1}
                      </span>
                      <p className="text-gray-700">{instruction}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Utensils size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Meal</h3>
              <p className="text-gray-500">Choose a meal from the list to view its details and ingredients</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MealManager;
import React, { useState } from 'react';
import { Plus, Clock, Users, Edit2, Trash2, Utensils } from 'lucide-react';
import { meals, ingredients, stores } from '../data/mockData';
import { Meal, MealIngredient } from '../types';

const MealManager: React.FC = () => {
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newMeal, setNewMeal] = useState<Partial<Meal>>({
    name: '',
    description: '',
    category: 'dinner',
    prepTime: 30,
    servings: 4,
    ingredients: [],
    instructions: ['']
  });
  const [selectedIngredients, setSelectedIngredients] = useState<MealIngredient[]>([]);

  const categoryColors = {
    breakfast: 'bg-orange-100 text-orange-800',
    lunch: 'bg-blue-100 text-blue-800',
    dinner: 'bg-purple-100 text-purple-800'
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

  const addIngredientToMeal = () => {
    setSelectedIngredients([...selectedIngredients, { ingredientId: '', quantity: 1 }]);
  };

  const updateIngredient = (index: number, field: 'ingredientId' | 'quantity', value: string | number) => {
    const updated = [...selectedIngredients];
    updated[index] = { ...updated[index], [field]: value };
    setSelectedIngredients(updated);
  };

  const removeIngredient = (index: number) => {
    setSelectedIngredients(selectedIngredients.filter((_, i) => i !== index));
  };

  const addInstruction = () => {
    setNewMeal({
      ...newMeal,
      instructions: [...(newMeal.instructions || ['']), '']
    });
  };

  const updateInstruction = (index: number, value: string) => {
    const updated = [...(newMeal.instructions || [''])];
    updated[index] = value;
    setNewMeal({ ...newMeal, instructions: updated });
  };

  const removeInstruction = (index: number) => {
    const updated = (newMeal.instructions || ['']).filter((_, i) => i !== index);
    setNewMeal({ ...newMeal, instructions: updated });
  };

  const saveMeal = () => {
    if (!newMeal.name || selectedIngredients.length === 0) {
      alert('Please provide a meal name and at least one ingredient');
      return;
    }

    const mealToSave: Meal = {
      id: Date.now().toString(),
      name: newMeal.name!,
      description: newMeal.description || '',
      category: newMeal.category as 'breakfast' | 'lunch' | 'dinner' | 'snack',
      prepTime: newMeal.prepTime || 30,
      servings: newMeal.servings || 4,
      ingredients: selectedIngredients.filter(ing => ing.ingredientId),
      instructions: (newMeal.instructions || ['']).filter(inst => inst.trim())
    };

    // Add to meals array (in a real app, this would be an API call)
    meals.push(mealToSave);
    
    // Reset form
    setNewMeal({
      name: '',
      description: '',
      category: 'dinner',
      prepTime: 30,
      servings: 4,
      ingredients: [],
      instructions: ['']
    });
    setSelectedIngredients([]);
    setIsCreating(false);
  };

  const cancelCreation = () => {
    setIsCreating(false);
    setNewMeal({
      name: '',
      description: '',
      category: 'dinner',
      prepTime: 30,
      servings: 4,
      ingredients: [],
      instructions: ['']
    });
    setSelectedIngredients([]);
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
          ) : isCreating ? (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Create New Meal</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={cancelCreation}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveMeal}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200"
                  >
                    Save Meal
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Meal Name</label>
                    <input
                      type="text"
                      value={newMeal.name || ''}
                      onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Enter meal name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={newMeal.category || 'dinner'}
                      onChange={(e) => setNewMeal({ ...newMeal, category: e.target.value as any })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="breakfast">Breakfast</option>
                      <option value="lunch">Lunch</option>
                      <option value="dinner">Dinner</option>
                      <option value="snack">Snack</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={newMeal.description || ''}
                    onChange={(e) => setNewMeal({ ...newMeal, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    rows={2}
                    placeholder="Brief description of the meal"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Prep Time (minutes)</label>
                    <input
                      type="number"
                      value={newMeal.prepTime || 30}
                      onChange={(e) => setNewMeal({ ...newMeal, prepTime: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      min="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Servings</label>
                    <input
                      type="number"
                      value={newMeal.servings || 4}
                      onChange={(e) => setNewMeal({ ...newMeal, servings: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      min="1"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-medium text-gray-700">Ingredients</label>
                    <button
                      onClick={addIngredientToMeal}
                      className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                    >
                      + Add Ingredient
                    </button>
                  </div>
                  <div className="space-y-3">
                    {selectedIngredients.map((ingredient, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <select
                          value={ingredient.ingredientId}
                          onChange={(e) => updateIngredient(index, 'ingredientId', e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        >
                          <option value="">Select ingredient</option>
                          {ingredients.map((ing) => (
                            <option key={ing.id} value={ing.id}>
                              {ing.name} ({ing.unit})
                            </option>
                          ))}
                        </select>
                        <input
                          type="number"
                          value={ingredient.quantity}
                          onChange={(e) => updateIngredient(index, 'quantity', parseFloat(e.target.value))}
                          className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          min="0.1"
                          step="0.1"
                          placeholder="Qty"
                        />
                        <button
                          onClick={() => removeIngredient(index)}
                          className="text-red-600 hover:text-red-700 p-2"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    {selectedIngredients.length === 0 && (
                      <p className="text-gray-500 text-sm italic">No ingredients added yet</p>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-medium text-gray-700">Instructions</label>
                    <button
                      onClick={addInstruction}
                      className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                    >
                      + Add Step
                    </button>
                  </div>
                  <div className="space-y-3">
                    {(newMeal.instructions || ['']).map((instruction, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <span className="flex-shrink-0 w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-sm font-medium mt-1">
                          {index + 1}
                        </span>
                        <textarea
                          value={instruction}
                          onChange={(e) => updateInstruction(index, e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          rows={2}
                          placeholder={`Step ${index + 1} instructions`}
                        />
                        {(newMeal.instructions || ['']).length > 1 && (
                          <button
                            onClick={() => removeInstruction(index)}
                            className="text-red-600 hover:text-red-700 p-2 mt-1"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
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
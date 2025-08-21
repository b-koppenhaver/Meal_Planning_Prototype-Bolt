import React from 'react';
import { Calendar, ShoppingCart, Utensils, TrendingUp } from 'lucide-react';
import { meals, plannedMeals, ingredients, stores } from '../data/mockData';

const Dashboard: React.FC = () => {
  const upcomingMeals = plannedMeals.slice(0, 3);
  const totalIngredients = ingredients.length;
  const totalStores = stores.length;
  
  // Calculate meal diversity metrics
  const mealCategories = new Set(plannedMeals.map(pm => {
    const meal = meals.find(m => m.id === pm.mealId);
    return meal?.category;
  })).size;
  
  const leftoverMeals = plannedMeals.filter(pm => {
    const meal = meals.find(m => m.id === pm.mealId);
    return meal && pm.servings >= 6; // Meals with 6+ servings likely to have leftovers
  }).length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h2>
        <p className="text-gray-600">Welcome to your meal planning hub</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Meals</p>
              <p className="text-3xl font-bold text-gray-900">{meals.length}</p>
            </div>
            <div className="p-3 bg-emerald-100 rounded-full">
              <Utensils className="h-8 w-8 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Planned Meals</p>
              <p className="text-3xl font-bold text-gray-900">{plannedMeals.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Ingredients</p>
              <p className="text-3xl font-bold text-gray-900">{totalIngredients}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <ShoppingCart className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Partner Stores</p>
              <p className="text-3xl font-bold text-gray-900">{totalStores}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Meals</h3>
          <div className="space-y-4">
            {upcomingMeals.map((plannedMeal) => {
              const meal = meals.find(m => m.id === plannedMeal.mealId);
              if (!meal) return null;
              
              return (
                <div key={plannedMeal.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-150">
                  <div>
                    <h4 className="font-semibold text-gray-900">{meal.name}</h4>
                    <p className="text-sm text-gray-600">
                      {new Date(plannedMeal.date).toLocaleDateString()} • {plannedMeal.mealType}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-700">{plannedMeal.servings} servings</p>
                    <p className="text-xs text-gray-500">{meal.prepTime} min</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-3 bg-emerald-50 rounded-lg">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Optimized meal diversity</p>
                <p className="text-xs text-gray-600">{mealCategories} different meal categories planned</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Leftover-friendly meals scheduled</p>
                <p className="text-xs text-gray-600">{leftoverMeals} large-portion meals for efficient cooking</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Store visits minimized</p>
                <p className="text-xs text-gray-600">Shopping optimized to reduce store trips</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
import React, { useState } from 'react';
import { Calendar, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { meals, plannedMeals, ingredients } from '../data/mockData';
import { PlannedMeal, Meal } from '../types';

const MealPlanner: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showAddMeal, setShowAddMeal] = useState(false);
  const [newPlannedMeal, setNewPlannedMeal] = useState({
    mealId: '',
    mealType: 'dinner' as 'breakfast' | 'lunch' | 'dinner' | 'snack',
    servings: 4
  });

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const formatDate = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const getPlannedMealsForDate = (dateStr: string) => {
    return plannedMeals.filter(pm => pm.date === dateStr);
  };

  const getMealById = (mealId: string): Meal | undefined => {
    return meals.find(m => m.id === mealId);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const addMealPlan = () => {
    if (!selectedDate || !newPlannedMeal.mealId) {
      alert('Please select a date and meal');
      return;
    }

    const plannedMeal: PlannedMeal = {
      id: Date.now().toString(),
      mealId: newPlannedMeal.mealId,
      date: selectedDate,
      mealType: newPlannedMeal.mealType,
      servings: newPlannedMeal.servings
    };

    // Add to planned meals array (in a real app, this would be an API call)
    plannedMeals.push(plannedMeal);
    
    // Reset form
    setNewPlannedMeal({
      mealId: '',
      mealType: 'dinner',
      servings: 4
    });
    setShowAddMeal(false);
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const days = getDaysInMonth(currentDate);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Meal Planner</h2>
          <p className="text-gray-600 mt-1">Plan your meals for the upcoming weeks</p>
        </div>
        <button
          onClick={() => setShowAddMeal(true)}
          className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200"
        >
          <Plus className="mr-2" size={20} />
          Add Meal Plan
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => navigateMonth('prev')}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-150"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => navigateMonth('next')}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-150"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-7 gap-2 mb-4">
            {weekDays.map(day => (
              <div key={day} className="p-3 text-center">
                <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">{day}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {days.map((day, index) => {
              if (day === null) {
                return <div key={index} className="p-2"></div>;
              }

              const dateStr = formatDate(currentDate.getFullYear(), currentDate.getMonth(), day);
              const plannedMealsForDay = getPlannedMealsForDate(dateStr);
              const isToday = new Date().toDateString() === new Date(dateStr).toDateString();
              const isSelected = selectedDate === dateStr;

              return (
                <div
                  key={day}
                  className={`p-2 min-h-[100px] border rounded-lg cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedDate(isSelected ? null : dateStr)}
                >
                  <div className={`text-sm font-medium mb-2 ${
                    isToday ? 'text-emerald-600' : 'text-gray-900'
                  }`}>
                    {day}
                    {isToday && <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full inline-block ml-1"></div>}
                  </div>

                  <div className="space-y-1">
                    {plannedMealsForDay.map((plannedMeal) => {
                      const meal = getMealById(plannedMeal.mealId);
                      if (!meal) return null;

                      const mealTypeColors = {
                        breakfast: 'bg-orange-100 text-orange-800',
                        lunch: 'bg-blue-100 text-blue-800',
                        dinner: 'bg-purple-100 text-purple-800',
                        snack: 'bg-green-100 text-green-800'
                      };

                      return (
                        <div
                          key={plannedMeal.id}
                          className={`px-2 py-1 rounded text-xs font-medium truncate ${mealTypeColors[plannedMeal.mealType]}`}
                          title={meal.name}
                        >
                          {meal.name}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {selectedDate && (
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            Meals for {new Date(selectedDate).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </h4>
          
          <div className="space-y-3">
            {getPlannedMealsForDate(selectedDate).map((plannedMeal) => {
              const meal = getMealById(plannedMeal.mealId);
              if (!meal) return null;

              return (
                <div key={plannedMeal.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h5 className="font-medium text-gray-900">{meal.name}</h5>
                    <p className="text-sm text-gray-600">{plannedMeal.mealType} • {plannedMeal.servings} servings</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-700">{meal.prepTime} min</p>
                    <p className="text-xs text-gray-500">{meal.category}</p>
                  </div>
                </div>
              );
            })}
            
            {getPlannedMealsForDate(selectedDate).length === 0 && (
              <div className="text-center py-8">
                <Calendar className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                <p className="text-gray-500">No meals planned for this day</p>
                <button 
                  onClick={() => setShowAddMeal(true)}
                  className="mt-2 text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                >
                  Add a meal plan
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {showAddMeal && selectedDate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Add Meal Plan for {new Date(selectedDate).toLocaleDateString()}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Meal</label>
                <select
                  value={newPlannedMeal.mealId}
                  onChange={(e) => setNewPlannedMeal({ ...newPlannedMeal, mealId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="">Choose a meal</option>
                  {meals.map((meal) => (
                    <option key={meal.id} value={meal.id}>
                      {meal.name} ({meal.category})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Meal Type</label>
                <select
                  value={newPlannedMeal.mealType}
                  onChange={(e) => setNewPlannedMeal({ ...newPlannedMeal, mealType: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                  <option value="snack">Snack</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Servings</label>
                <input
                  type="number"
                  value={newPlannedMeal.servings}
                  onChange={(e) => setNewPlannedMeal({ ...newPlannedMeal, servings: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  min="1"
                />
              </div>

              {newPlannedMeal.mealId && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Ingredients that will be added to shopping list:</h4>
                  <div className="text-xs text-gray-600 space-y-1">
                    {(() => {
                      const selectedMeal = meals.find(m => m.id === newPlannedMeal.mealId);
                      if (!selectedMeal) return null;
                      
                      return selectedMeal.ingredients.map((mealIng, index) => {
                        const ingredient = ingredients.find(i => i.id === mealIng.ingredientId);
                        if (!ingredient) return null;
                        
                        const scaledQuantity = (mealIng.quantity * newPlannedMeal.servings) / selectedMeal.servings;
                        return (
                          <div key={index}>
                            • {ingredient.name}: {scaledQuantity.toFixed(1)} {ingredient.unit}
                          </div>
                        );
                      });
                    })()}
                  </div>
                </div>
              )}
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAddMeal(false)}
                className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={addMealPlan}
                className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200"
              >
                Add to Plan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealPlanner;
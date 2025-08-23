import React, { useState } from 'react';
import { ShoppingCart, Check, Store, DollarSign, MapPin } from 'lucide-react';
import { plannedMeals, meals, ingredients, stores } from '../data/mockData';
import { ShoppingListItem } from '../types';

const ShoppingList: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [groupByStore, setGroupByStore] = useState(true);

  const generateShoppingList = (): ShoppingListItem[] => {
    const ingredientQuantities: { [key: string]: number } = {};
    
    // Calculate total quantities needed for all planned meals
    plannedMeals.forEach(plannedMeal => {
      const meal = meals.find(m => m.id === plannedMeal.mealId);
      if (meal) {
        meal.ingredients.forEach(mealIngredient => {
          const scaledQuantity = (mealIngredient.quantity * plannedMeal.servings) / meal.servings;
          ingredientQuantities[mealIngredient.ingredientId] = 
            (ingredientQuantities[mealIngredient.ingredientId] || 0) + scaledQuantity;
        });
      }
    });

    // Generate shopping list items with store optimization
    return Object.entries(ingredientQuantities).map(([ingredientId, quantity]) => {
      const ingredient = ingredients.find(i => i.id === ingredientId);
      if (!ingredient) {
        return {
          ingredientId,
          quantity,
          bestStore: 'Unknown',
          estimatedCost: 0
        };
      }

      // Find the best store considering price and availability
      const inStockAvailability = ingredient.availability.filter(a => a.inStock);
      const bestAvailability = inStockAvailability.length > 0 
        ? inStockAvailability.sort((a, b) => a.price - b.price)[0]
        : ingredient.availability[0];

      const bestStore = stores.find(s => s.id === bestAvailability?.storeId);
      
      return {
        ingredientId,
        quantity,
        bestStore: bestStore?.name || 'Unknown',
        estimatedCost: (bestAvailability?.price || 0) * quantity
      };
    });
  };

  // Optimize store selection to minimize number of stores
  const optimizeStoreSelection = (items: ShoppingListItem[]): ShoppingListItem[] => {
    const storeItemCounts: { [storeName: string]: number } = {};
    const storeItemValues: { [storeName: string]: number } = {};
    
    // Count items and total value per store
    items.forEach(item => {
      const storeName = item.bestStore;
      storeItemCounts[storeName] = (storeItemCounts[storeName] || 0) + 1;
      storeItemValues[storeName] = (storeItemValues[storeName] || 0) + item.estimatedCost;
    });
    
    // Find primary stores (those with most items or highest value)
    const primaryStores = Object.keys(storeItemCounts)
      .sort((a, b) => {
        const aScore = storeItemCounts[a] * 2 + storeItemValues[a] * 0.1;
        const bScore = storeItemCounts[b] * 2 + storeItemValues[b] * 0.1;
        return bScore - aScore;
      })
      .slice(0, 2); // Limit to top 2 stores
    
    // Reassign items to primary stores when possible
    return items.map(item => {
      const ingredient = ingredients.find(i => i.id === item.ingredientId);
      if (!ingredient) return item;
      
      // Check if item is available at a primary store
      for (const primaryStoreName of primaryStores) {
        const primaryStore = stores.find(s => s.name === primaryStoreName);
        if (primaryStore) {
          const availability = ingredient.availability.find(a => 
            a.storeId === primaryStore.id && a.inStock
          );
          if (availability) {
            // Only switch if price difference is reasonable (within 20%)
            const currentPrice = item.estimatedCost / item.quantity;
            const priceDifference = Math.abs(availability.price - currentPrice) / currentPrice;
            if (priceDifference <= 0.2) {
              return {
                ...item,
                bestStore: primaryStoreName,
                estimatedCost: availability.price * item.quantity
              };
            }
          }
        }
      }
      
      return item;
    });
  };
  const rawShoppingList = generateShoppingList();
  const shoppingList = optimizeStoreSelection(rawShoppingList);
  const totalCost = shoppingList.reduce((sum, item) => sum + item.estimatedCost, 0);
  const uniqueStores = new Set(shoppingList.map(item => item.bestStore)).size;

  const toggleCheck = (ingredientId: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(ingredientId)) {
      newChecked.delete(ingredientId);
    } else {
      newChecked.add(ingredientId);
    }
    setCheckedItems(newChecked);
  };

  const groupedByStore = groupByStore ? shoppingList.reduce((groups, item) => {
    const store = item.bestStore;
    if (!groups[store]) {
      groups[store] = [];
    }
    groups[store].push(item);
    return groups;
  }, {} as { [key: string]: ShoppingListItem[] }) : null;

  const getIngredientDetails = (ingredientId: string) => {
    return ingredients.find(i => i.id === ingredientId);
  };

  const getStoreDetails = (storeName: string) => {
    return stores.find(s => s.name === storeName);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Shopping List</h2>
          <p className="text-gray-600 mt-1">Generated from your planned meals</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="groupByStore"
              checked={groupByStore}
              onChange={(e) => setGroupByStore(e.target.checked)}
              className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
            />
            <label htmlFor="groupByStore" className="ml-2 text-sm font-medium text-gray-700">
              Group by store
            </label>
          </div>
          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg text-sm font-medium">
            {uniqueStores} {uniqueStores === 1 ? 'Store' : 'Stores'}
          </div>
          <div className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-lg font-medium">
            Total: ${totalCost.toFixed(2)}
          </div>
        </div>
      </div>

      {shoppingList.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingCart size={32} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Shopping List</h3>
          <p className="text-gray-500">Plan some meals first to generate your shopping list</p>
        </div>
      ) : (
        <div className="space-y-4">
          {groupByStore && groupedByStore ? (
            // Grouped by store view
            Object.entries(groupedByStore).map(([storeName, items]) => {
              const storeDetails = getStoreDetails(storeName);
              const storeCost = items.reduce((sum, item) => sum + item.estimatedCost, 0);
              
              return (
                <div key={storeName} className="bg-white rounded-xl shadow-md border border-gray-100">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="p-2 bg-emerald-100 rounded-lg mr-3">
                          <Store className="h-6 w-6 text-emerald-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{storeName}</h3>
                          {storeDetails && (
                            <div className="flex items-center mt-1 text-sm text-gray-600">
                              <MapPin size={14} className="mr-1" />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">${storeCost.toFixed(2)}</p>
                        <p className="text-sm text-gray-600">{items.length} items</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-3">
                      {items.map((item) => {
                        const ingredient = getIngredientDetails(item.ingredientId);
                        if (!ingredient) return null;

                        return (
                          <div
                            key={item.ingredientId}
                            className={`flex items-center justify-between p-4 rounded-lg transition-all duration-200 ${
                              checkedItems.has(item.ingredientId)
                                ? 'bg-emerald-50 border border-emerald-200'
                                : 'bg-gray-50 hover:bg-gray-100'
                            }`}
                          >
                            <div className="flex items-center">
                              <button
                                onClick={() => toggleCheck(item.ingredientId)}
                                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 transition-colors duration-200 ${
                                  checkedItems.has(item.ingredientId)
                                    ? 'bg-emerald-500 border-emerald-500'
                                    : 'border-gray-300 hover:border-emerald-500'
                                }`}
                              >
                                {checkedItems.has(item.ingredientId) && (
                                  <Check className="h-4 w-4 text-white" />
                                )}
                              </button>
                              <div>
                                <h4 className={`font-medium ${
                                  checkedItems.has(item.ingredientId) 
                                    ? 'text-gray-500 line-through' 
                                    : 'text-gray-900'
                                }`}>
                                  {ingredient.name}
                                </h4>
                                <p className="text-sm text-gray-600">
                                  {item.quantity.toFixed(1)}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className={`font-semibold ${
                                checkedItems.has(item.ingredientId) 
                                  ? 'text-gray-500 line-through' 
                                  : 'text-gray-900'
                              }`}>
                                ${item.estimatedCost.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            // Single list view
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
              <div className="space-y-3">
                {shoppingList.map((item) => {
                  const ingredient = getIngredientDetails(item.ingredientId);
                  if (!ingredient) return null;

                  return (
                    <div
                      key={item.ingredientId}
                      className={`flex items-center justify-between p-4 rounded-lg transition-all duration-200 ${
                        checkedItems.has(item.ingredientId)
                          ? 'bg-emerald-50 border border-emerald-200'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center">
                        <button
                          onClick={() => toggleCheck(item.ingredientId)}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 transition-colors duration-200 ${
                            checkedItems.has(item.ingredientId)
                              ? 'bg-emerald-500 border-emerald-500'
                              : 'border-gray-300 hover:border-emerald-500'
                          }`}
                        >
                          {checkedItems.has(item.ingredientId) && (
                            <Check className="h-4 w-4 text-white" />
                          )}
                        </button>
                        <div>
                          <h4 className={`font-medium ${
                            checkedItems.has(item.ingredientId) 
                              ? 'text-gray-500 line-through' 
                              : 'text-gray-900'
                          }`}>
                            {ingredient.name}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {item.quantity.toFixed(1)} • {item.bestStore}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${
                          checkedItems.has(item.ingredientId) 
                            ? 'text-gray-500 line-through' 
                            : 'text-gray-900'
                        }`}>
                          ${item.estimatedCost.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ShoppingList;
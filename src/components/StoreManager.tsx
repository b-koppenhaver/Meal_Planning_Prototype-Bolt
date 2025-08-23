import React, { useState } from 'react';
import { Store, MapPin, TrendingUp, Package, DollarSign } from 'lucide-react';
import { stores, ingredients } from '../data/mockData';

const StoreManager: React.FC = () => {
  const [selectedStore, setSelectedStore] = useState<string | null>(null);

  const getStoreTypeIcon = (type: string) => {
    switch (type) {
      case 'grocery': return <Store className="h-5 w-5" />;
      case 'butcher': return <Package className="h-5 w-5" />;
      case 'farmer': return <TrendingUp className="h-5 w-5" />;
      case 'specialty': return <MapPin className="h-5 w-5" />;
      default: return <Store className="h-5 w-5" />;
    }
  };

  const getStoreTypeColor = (type: string) => {
    switch (type) {
      case 'grocery': return 'bg-blue-100 text-blue-800';
      case 'butcher': return 'bg-red-100 text-red-800';
      case 'farmer': return 'bg-green-100 text-green-800';
      case 'specialty': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStoreIngredients = (storeId: string) => {
    return ingredients.filter(ingredient => 
      ingredient.availability.some(avail => avail.storeId === storeId)
    );
  };

  const getStoreStats = (storeId: string) => {
    const storeIngredients = getStoreIngredients(storeId);
    const totalIngredients = storeIngredients.length;
    const inStockCount = storeIngredients.filter(ingredient => 
      ingredient.availability.find(avail => avail.storeId === storeId)?.inStock
    ).length;
    
    const averagePrice = storeIngredients.reduce((sum, ingredient) => {
      const availability = ingredient.availability.find(avail => avail.storeId === storeId);
      return sum + (availability?.price || 0);
    }, 0) / totalIngredients;

    return {
      totalIngredients,
      inStockCount,
      averagePrice: isNaN(averagePrice) ? 0 : averagePrice
    };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Store Management</h2>
          <p className="text-gray-600 mt-1">Manage your partner stores and ingredient availability</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200">
          <Store className="mr-2" size={20} />
          Add Store
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Partner Stores</h3>
          <div className="space-y-3">
            {stores.map((store) => {
              const stats = getStoreStats(store.id);
              return (
                <div
                  key={store.id}
                  className={`p-4 border rounded-xl cursor-pointer transition-all duration-200 ${
                    selectedStore === store.id
                      ? 'border-emerald-500 bg-emerald-50 shadow-md'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                  }`}
                  onClick={() => setSelectedStore(store.id)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{store.name}</h4>
                      <div className="flex items-center mt-1 text-sm text-gray-600">
                        <MapPin size={14} className="mr-1" />
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${getStoreTypeColor(store.type)}`}>
                      {getStoreTypeIcon(store.type)}
                      <span className="ml-1 capitalize">{store.type}</span>
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{stats.totalIngredients} items</span>
                    <span className="text-emerald-600 font-medium">
                      {stats.inStockCount} in stock
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-2">
          {selectedStore ? (
            <div className="bg-white rounded-xl shadow-md border border-gray-100">
              {(() => {
                const store = stores.find(s => s.id === selectedStore);
                const stats = getStoreStats(selectedStore);
                const storeIngredients = getStoreIngredients(selectedStore);
                
                if (!store) return null;

                return (
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{store.name}</h3>
                        <div className="flex items-center mt-2 text-gray-600">
                          <MapPin size={16} className="mr-2" />
                          {store.location}
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${getStoreTypeColor(store.type)}`}>
                        {getStoreTypeIcon(store.type)}
                        <span className="ml-2 capitalize">{store.type}</span>
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-center">
                          <Package className="h-8 w-8 text-blue-600 mr-3" />
                          <div>
                            <p className="text-sm font-medium text-gray-600">Total Items</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.totalIngredients}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-green-50 rounded-lg">
                        <div className="flex items-center">
                          <TrendingUp className="h-8 w-8 text-green-600 mr-3" />
                          <div>
                            <p className="text-sm font-medium text-gray-600">In Stock</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.inStockCount}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-orange-50 rounded-lg">
                        <div className="flex items-center">
                          <DollarSign className="h-8 w-8 text-orange-600 mr-3" />
                          <div>
                            <p className="text-sm font-medium text-gray-600">Avg. Price</p>
                            <p className="text-2xl font-bold text-gray-900">${stats.averagePrice.toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Available Ingredients</h4>
                      <div className="space-y-3 max-h-96 overflow-y-auto">
                        {storeIngredients.map((ingredient) => {
                          const availability = ingredient.availability.find(avail => avail.storeId === selectedStore);
                          if (!availability) return null;

                          const qualityColors = {
                            excellent: 'text-green-600 bg-green-50',
                            good: 'text-blue-600 bg-blue-50',
                            fair: 'text-orange-600 bg-orange-50'
                          };

                          return (
                            <div key={ingredient.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-150">
                              <div>
                                <h5 className="font-medium text-gray-900">{ingredient.name}</h5>
                                <div className="flex items-center mt-1 space-x-4">
                                  <span className="text-sm text-gray-600 capitalize">{ingredient.category}</span>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${qualityColors[availability.quality]}`}>
                                    {availability.quality}
                                  </span>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    availability.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                  }`}>
                                    {availability.inStock ? 'In Stock' : 'Out of Stock'}
                                  </span>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-lg font-bold text-gray-900">${availability.price.toFixed(2)}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Store size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Store</h3>
              <p className="text-gray-500">Choose a store from the list to view its inventory and details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoreManager;
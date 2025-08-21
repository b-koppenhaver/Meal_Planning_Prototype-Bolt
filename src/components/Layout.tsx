import React from 'react';
import { Calendar, ShoppingCart, Utensils, Store, Home } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentView: string;
  onViewChange: (view: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, onViewChange }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'meals', label: 'Meals', icon: Utensils },
    { id: 'planner', label: 'Planner', icon: Calendar },
    { id: 'stores', label: 'Stores', icon: Store },
    { id: 'shopping', label: 'Shopping List', icon: ShoppingCart }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <nav className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">
            <Utensils className="mr-2 text-emerald-600" />
            MealPlan Pro
          </h1>
        </div>
        <div className="p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center px-4 py-3 mb-2 rounded-lg text-left transition-all duration-200 ${
                  currentView === item.id
                    ? 'bg-emerald-100 text-emerald-700 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                }`}
              >
                <Icon size={20} className="mr-3" />
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
};

export default Layout
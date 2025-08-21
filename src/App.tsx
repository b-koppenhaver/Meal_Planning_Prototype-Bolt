import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import MealManager from './components/MealManager';
import MealPlanner from './components/MealPlanner';
import StoreManager from './components/StoreManager';
import ShoppingList from './components/ShoppingList';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'meals':
        return <MealManager />;
      case 'planner':
        return <MealPlanner />;
      case 'stores':
        return <StoreManager />;
      case 'shopping':
        return <ShoppingList />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout currentView={currentView} onViewChange={setCurrentView}>
      {renderCurrentView()}
    </Layout>
  );
}

export default App;
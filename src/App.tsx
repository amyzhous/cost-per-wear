import { useState } from 'react';
import { DashboardCards } from './components/DashboardCards';
import { ItemForm } from './components/ItemForm';
import { ItemsList } from './components/ItemsList';
import { Button } from './components/ui/button';
import { ThemeProvider } from './components/ThemeProvider';
import { Plus, Moon, Sun } from 'lucide-react';
import { useTheme } from './components/ThemeProvider';

export interface Item {
  id: string;
  name: string;
  cost: number;
  wears: number;
}

function AppContent() {
  const { theme, toggleTheme } = useTheme();
  const [items, setItems] = useState<Item[]>([
    { id: '1', name: 'Leather Jacket', cost: 300, wears: 25 },
    { id: '2', name: 'Running Shoes', cost: 120, wears: 50 },
    { id: '3', name: 'Denim Jeans', cost: 80, wears: 40 },
  ]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  const handleAddItem = (item: Omit<Item, 'id'>) => {
    const newItem = {
      ...item,
      id: Date.now().toString(),
    };
    setItems([...items, newItem]);
    setIsFormOpen(false);
  };

  const handleUpdateItem = (id: string, updates: Partial<Item>) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const handleEditItem = (item: Item) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const handleSaveEdit = (updatedItem: Omit<Item, 'id'>) => {
    if (editingItem) {
      handleUpdateItem(editingItem.id, updatedItem);
      setEditingItem(null);
      setIsFormOpen(false);
    }
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingItem(null);
  };

  return (
    <div className="min-h-screen relative overflow-hidden transition-colors duration-500">
      {/* Gradient Mesh Background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950 transition-colors duration-700">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-blue-400/40 to-cyan-400/40 dark:from-blue-500/30 dark:to-cyan-500/30 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute top-1/4 right-1/4 w-[450px] h-[450px] bg-gradient-to-br from-cyan-300/30 to-indigo-400/30 dark:from-cyan-400/20 dark:to-indigo-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-[480px] h-[480px] bg-gradient-to-br from-indigo-400/35 to-purple-400/35 dark:from-indigo-500/25 dark:to-purple-500/25 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-0 right-1/3 w-[460px] h-[460px] bg-gradient-to-br from-sky-300/30 to-blue-400/30 dark:from-sky-500/20 dark:to-blue-600/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 relative">
        {/* Header */}
        <div className="flex justify-center items-center mb-12 relative">
          <h1 className="text-slate-900 dark:text-white">Cost Per Wear</h1>
          <div className="flex gap-3 absolute right-0">
            <Button 
              onClick={toggleTheme} 
              variant="outline" 
              size="icon"
              className="glass-card rounded-2xl w-11 h-11 border-white/50 dark:border-white/20"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </Button>
            <Button onClick={() => setIsFormOpen(true)} className="gap-2 glass-card-dark rounded-2xl px-6">
              <Plus className="w-4 h-4" />
              Add Item
            </Button>
          </div>
        </div>

        {/* Dashboard Cards */}
        <DashboardCards items={items} />

        {/* Items List */}
        <ItemsList 
          items={items}
          onUpdateItem={handleUpdateItem}
          onEditItem={handleEditItem}
          onDeleteItem={handleDeleteItem}
        />

        {/* Item Form Dialog */}
        <ItemForm
          open={isFormOpen}
          onClose={handleFormClose}
          onSave={editingItem ? handleSaveEdit : handleAddItem}
          editingItem={editingItem}
        />
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;

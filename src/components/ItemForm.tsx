import { useState, useEffect } from 'react';
import { Item } from '../App';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface ItemFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (item: Omit<Item, 'id'>) => void;
  editingItem: Item | null;
}

export function ItemForm({ open, onClose, onSave, editingItem }: ItemFormProps) {
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  const [wears, setWears] = useState('0');

  useEffect(() => {
    if (editingItem) {
      setName(editingItem.name);
      setCost(editingItem.cost.toString());
      setWears(editingItem.wears.toString());
    } else {
      setName('');
      setCost('');
      setWears('0');
    }
  }, [editingItem, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !cost) return;

    onSave({
      name: name.trim(),
      cost: parseFloat(cost),
      wears: parseInt(wears) || 0,
    });

    setName('');
    setCost('');
    setWears('0');
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-slate-900 dark:text-white">{editingItem ? 'Edit Item' : 'Add New Item'}</DialogTitle>
          <DialogDescription className="text-slate-700 dark:text-slate-300">
            {editingItem 
              ? 'Update the details of your wardrobe item.'
              : 'Add a new item to track its cost per wear.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Item Name</Label>
              <Input
                id="name"
                placeholder="e.g., Blue Denim Jacket"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cost">Cost ($)</Label>
              <Input
                id="cost"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="wears">Number of Wears</Label>
              <Input
                id="wears"
                type="number"
                min="0"
                placeholder="0"
                value={wears}
                onChange={(e) => setWears(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {editingItem ? 'Save Changes' : 'Add Item'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

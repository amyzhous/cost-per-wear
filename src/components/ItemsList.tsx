import { Item } from '../App';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Minus, Plus, Pencil, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

interface ItemsListProps {
  items: Item[];
  onUpdateItem: (id: string, updates: Partial<Item>) => void;
  onEditItem: (item: Item) => void;
  onDeleteItem: (id: string) => void;
}

export function ItemsList({ items, onUpdateItem, onEditItem, onDeleteItem }: ItemsListProps) {
  const handleWearsChange = (id: string, newWears: number) => {
    if (newWears >= 0) {
      onUpdateItem(id, { wears: newWears });
    }
  };

  const incrementWears = (item: Item) => {
    onUpdateItem(item.id, { wears: item.wears + 1 });
  };

  const decrementWears = (item: Item) => {
    if (item.wears > 0) {
      onUpdateItem(item.id, { wears: item.wears - 1 });
    }
  };

  if (items.length === 0) {
    return (
      <div className="space-y-6">
        <h2 className="text-slate-900 dark:text-white">Your Items</h2>
        <Card className="glass-card p-16 text-center rounded-3xl">
          <p className="text-slate-700 dark:text-slate-300 mb-2">No items yet</p>
          <p className="text-slate-600 dark:text-slate-400">Add your first wardrobe item to start tracking cost per wear</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-slate-900 dark:text-white">Your Items</h2>
      
      <div className="glass-card rounded-3xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-white/20 dark:border-white/10 hover:bg-transparent">
              <TableHead className="text-slate-900 dark:text-white px-6 h-14 w-20">Image</TableHead>
              <TableHead className="text-slate-900 dark:text-white px-6 h-14">Item Name</TableHead>
              <TableHead className="text-slate-900 dark:text-white">Category</TableHead>
              <TableHead className="text-slate-900 dark:text-white text-right">Cost Per Wear</TableHead>
              <TableHead className="text-slate-900 dark:text-white text-right">Cost</TableHead>
              <TableHead className="text-slate-900 dark:text-white text-right">Wears</TableHead>
              <TableHead className="text-slate-900 dark:text-white text-right px-6">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => {
              const costPerWear = item.wears > 0 ? item.cost / item.wears : 0;
              
              return (
                <TableRow
                  key={item.id}
                  className="border-b border-white/10 dark:border-white/5 hover:bg-white/30 dark:hover:bg-white/5 transition-colors"
                >
                  <TableCell className="px-6 py-5">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg ring-2 ring-white/50 dark:ring-white/20"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 ring-2 ring-white/50 dark:ring-white/20 flex items-center justify-center">
                        <span className="text-slate-500 dark:text-slate-400 text-xs">No image</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="px-6 py-5">
                    <span className="text-slate-900 dark:text-white">{item.name}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30">
                      {item.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-900 dark:text-white text-right">
                    ${costPerWear.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-slate-700 dark:text-slate-300 text-right">
                    ${item.cost.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center gap-1 backdrop-blur-xl bg-white/50 dark:bg-white/10 rounded-2xl p-1 border border-white/50 dark:border-white/20 shadow-lg w-fit ml-auto">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => decrementWears(item)}
                        disabled={item.wears === 0}
                        className="h-8 w-8 rounded-xl"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </Button>
                      
                      <Input
                        type="number"
                        min="0"
                        value={item.wears}
                        onChange={(e) => handleWearsChange(item.id, parseInt(e.target.value) || 0)}
                        className="w-12 h-8 text-center p-0 border-0 bg-transparent shadow-none text-slate-900 dark:text-white"
                      />
                      
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => incrementWears(item)}
                        className="h-8 w-8 rounded-xl"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="text-right px-6">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => onEditItem(item)}
                        className="h-8 w-8 rounded-xl"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </Button>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8 rounded-xl text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/30"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Item</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{item.name}"? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => onDeleteItem(item.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

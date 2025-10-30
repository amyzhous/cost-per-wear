import { Item } from '../App';
import { Card } from './ui/card';
import { TrendingDown, Package, DollarSign, Calculator } from 'lucide-react';

interface DashboardCardsProps {
  items: Item[];
}

export function DashboardCards({ items }: DashboardCardsProps) {
  const totalItems = items.length;
  const totalSpent = items.reduce((sum, item) => sum + item.cost, 0);
  const totalWears = items.reduce((sum, item) => sum + item.wears, 0);
  const averageCostPerWear = totalWears > 0 ? totalSpent / totalWears : 0;

  const mostWornItem = items.length > 0
    ? items.reduce((most, item) => item.wears > most.wears ? item : most)
    : null;

  const stats = [
    {
      label: 'Most Worn Item',
      value: mostWornItem?.name || 'N/A',
      subValue: mostWornItem ? `${mostWornItem.wears} wears` : '',
      icon: TrendingDown,
      color: 'text-pink-600 dark:text-pink-400',
      bgColor: 'bg-pink-500/20 dark:bg-pink-500/30',
    },
    {
      label: 'Total Items',
      value: totalItems,
      icon: Package,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-500/20 dark:bg-blue-500/30',
    },
    {
      label: 'Total Spent',
      value: `$${totalSpent.toFixed(2)}`,
      icon: DollarSign,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-500/20 dark:bg-green-500/30',
    },
    {
      label: 'Average Cost Per Wear',
      value: `$${averageCostPerWear.toFixed(2)}`,
      icon: Calculator,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-500/20 dark:bg-purple-500/30',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="glass-card p-6 rounded-3xl group hover:scale-[1.02] transition-transform duration-300">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-slate-600 dark:text-slate-400 mb-3 text-sm">{stat.label}</p>
                <p className="text-slate-900 dark:text-white mb-1 truncate">{stat.value}</p>
                {stat.subValue && (
                  <p className="text-slate-600 dark:text-slate-400 text-sm">{stat.subValue}</p>
                )}
              </div>
              <div className={`${stat.bgColor} ${stat.color} p-3 rounded-2xl backdrop-blur-md shadow-lg border border-white/30 dark:border-white/20 shrink-0`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

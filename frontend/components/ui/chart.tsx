'use client';

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie, Legend } from 'recharts';

// Define interfaces for chart data
interface TaskCompletionData {
  date: string;
  completed: number;
  pending: number;
}

interface CategoryData {
  category: string;
  count: number;
  color: string;
}

interface StatusData {
  name: string;
  value: number;
  color: string;
}

// Default mock data for fallback
const defaultTaskCompletionData: TaskCompletionData[] = [
  { date: 'Mon', completed: 4, pending: 3 },
  { date: 'Tue', completed: 7, pending: 2 },
  { date: 'Wed', completed: 5, pending: 4 },
  { date: 'Thu', completed: 9, pending: 1 },
  { date: 'Fri', completed: 6, pending: 5 },
  { date: 'Sat', completed: 8, pending: 2 },
  { date: 'Sun', completed: 3, pending: 6 },
];

const defaultCategoryData: CategoryData[] = [
  { category: 'Work', count: 12, color: '#3B82F6' },
  { category: 'Personal', count: 8, color: '#10B981' },
  { category: 'Urgent', count: 5, color: '#EF4444' },
  { category: 'Shopping', count: 3, color: '#F59E0B' },
];

const defaultStatusData: StatusData[] = [
  { name: 'Completed', value: 45, color: '#10B981' },
  { name: 'In Progress', value: 30, color: '#3B82F6' },
  { name: 'Pending', value: 25, color: '#F59E0B' },
];

interface ChartTimeRangeSelectorProps {
  onTimeChange: (range: '7d' | '30d' | '90d') => void;
  initialRange?: '7d' | '30d' | '90d';
}

const ChartTimeRangeSelectorComponent: React.FC<ChartTimeRangeSelectorProps> = ({
  onTimeChange,
  initialRange = '7d'
}) => {
  const [selectedRange, setSelectedRange] = React.useState<'7d' | '30d' | '90d'>(initialRange);

  const handleRangeChange = React.useCallback((range: '7d' | '30d' | '90d') => {
    setSelectedRange(range);
    onTimeChange(range);
  }, [onTimeChange]);

  return (
    <div className="flex gap-2">
      <button
        className={`px-3 py-1 text-sm rounded-lg ${selectedRange === '7d' ? 'bg-cyan-500 text-white' : 'border'}`}
        onClick={() => handleRangeChange('7d')}
      >
        7d
      </button>
      <button
        className={`px-3 py-1 text-sm rounded-lg ${selectedRange === '30d' ? 'bg-cyan-500 text-white' : 'border'}`}
        onClick={() => handleRangeChange('30d')}
      >
        30d
      </button>
      <button
        className={`px-3 py-1 text-sm rounded-lg ${selectedRange === '90d' ? 'bg-cyan-500 text-white' : 'border'}`}
        onClick={() => handleRangeChange('90d')}
      >
        90d
      </button>
    </div>
  );
};

export const ChartTimeRangeSelector = React.memo(ChartTimeRangeSelectorComponent);

interface TaskCompletionChartProps {
  data?: TaskCompletionData[];
}

export const TaskCompletionChart: React.FC<TaskCompletionChartProps> = ({ data = defaultTaskCompletionData }) => {
  const [timeRange, setTimeRange] = React.useState<'7d' | '30d' | '90d'>('7d');

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Task Completion Trends</h3>
        <ChartTimeRangeSelector onTimeChange={setTimeRange} initialRange={timeRange} />
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#06B6D4" stopOpacity={0.1}/>
            </linearGradient>
            <linearGradient id="colorPending" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis dataKey="date" stroke="#6B7280" style={{ fontSize: '12px' }} />
          <YAxis stroke="#6B7280" style={{ fontSize: '12px' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: 'none',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
          />
          <Area
            type="monotone"
            dataKey="completed"
            stroke="#06B6D4"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorCompleted)"
            animationDuration={0}
          />
          <Area
            type="monotone"
            dataKey="pending"
            stroke="#F59E0B"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorPending)"
            animationDuration={0}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

interface CategoryChartProps {
  data?: CategoryData[];
}

export const CategoryChart: React.FC<CategoryChartProps> = ({ data = defaultCategoryData }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Tasks by Category</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis dataKey="category" stroke="#6B7280" />
          <YAxis stroke="#6B7280" />
          <Tooltip />
          <Bar dataKey="count" radius={[8, 8, 0, 0]} animationDuration={0}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

interface StatusDonutChartProps {
  data?: StatusData[];
}

export const StatusDonutChart: React.FC<StatusDonutChartProps> = ({ data = defaultStatusData }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Task Status</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={5}
            dataKey="value"
            animationDuration={0}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
import React from 'react';

interface FilterOptions {
  status: 'all' | 'active' | 'completed';
  priority?: 'low' | 'medium' | 'high';
  sortBy: 'date' | 'priority' | 'title';
}

interface TaskFilterControlsProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

const TaskFilterControls: React.FC<TaskFilterControlsProps> = ({ 
  filters, 
  onFilterChange 
}) => {
  const handleStatusChange = (status: FilterOptions['status']) => {
    onFilterChange({ ...filters, status });
  };

  const handleSortChange = (sortBy: FilterOptions['sortBy']) => {
    onFilterChange({ ...filters, sortBy });
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div className="flex space-x-2">
        <button
          onClick={() => handleStatusChange('all')}
          className={`px-3 py-1.5 text-sm rounded-md ${
            filters.status === 'all'
              ? 'bg-primary-100 text-primary-800'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          }`}
        >
          All
        </button>
        <button
          onClick={() => handleStatusChange('active')}
          className={`px-3 py-1.5 text-sm rounded-md ${
            filters.status === 'active'
              ? 'bg-primary-100 text-primary-800'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          }`}
        >
          Active
        </button>
        <button
          onClick={() => handleStatusChange('completed')}
          className={`px-3 py-1.5 text-sm rounded-md ${
            filters.status === 'completed'
              ? 'bg-primary-100 text-primary-800'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          }`}
        >
          Completed
        </button>
      </div>

      <div className="flex items-center space-x-2">
        <label htmlFor="sort-select" className="text-sm text-gray-700">
          Sort by:
        </label>
        <select
          id="sort-select"
          value={filters.sortBy}
          onChange={(e) => handleSortChange(e.target.value as FilterOptions['sortBy'])}
          className="block w-full pl-3 pr-10 py-1.5 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
        >
          <option value="date">Date</option>
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select>
      </div>
    </div>
  );
};

export default TaskFilterControls;
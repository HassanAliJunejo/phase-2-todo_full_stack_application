'use client';

import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';

interface FilterState {
  status: string[];
  priority: string[];
  category: string[];
  dateRange: { start: Date | null; end: Date | null } | null;
  searchQuery: string;
}

interface FilterBarProps {
  initialFilters?: Partial<FilterState>;
  onFiltersChange: (filters: FilterState) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ 
  initialFilters = {}, 
  onFiltersChange 
}) => {
  const [filters, setFilters] = useState<FilterState>({
    status: initialFilters.status || [],
    priority: initialFilters.priority || [],
    category: initialFilters.category || [],
    dateRange: initialFilters.dateRange || null,
    searchQuery: initialFilters.searchQuery || '',
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'date' | 'priority' | 'name'>('date');

  const activeFilterCount = 
    filters.status.length + 
    filters.priority.length + 
    filters.category.length + 
    (filters.dateRange ? 1 : 0);

  const toggleFilter = (type: keyof Omit<FilterState, 'dateRange' | 'searchQuery'>, value: string) => {
    setFilters(prev => {
      const newFilters = {
        ...prev,
        [type]: (prev[type] as string[]).includes(value)
          ? (prev[type] as string[]).filter(v => v !== value)
          : [...(prev[type] as string[]), value]
      };
      // Notify parent after state update
      setTimeout(() => onFiltersChange(newFilters), 0);
      return newFilters;
    });
  };

  const clearAllFilters = () => {
    const newFilters = {
      status: [],
      priority: [],
      category: [],
      dateRange: null,
      searchQuery: ''
    };
    setFilters(newFilters);
    // Notify parent after state update
    setTimeout(() => onFiltersChange(newFilters), 0);
  };

  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="flex flex-wrap items-center gap-3">
        {/* Search Box */}
        <div className="flex-1 min-w-[240px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={filters.searchQuery}
              onChange={(e) => {
                const newFilters = { ...filters, searchQuery: e.target.value };
                setFilters(newFilters);
                setTimeout(() => onFiltersChange(newFilters), 0);
              }}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Filter Button */}
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 relative"
        >
          <Filter className="w-5 h-5" />
          Filters
          {activeFilterCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-cyan-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </button>

        {/* Sort Dropdown */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="date">Sort by Date</option>
          <option value="priority">Sort by Priority</option>
          <option value="name">Sort by Name</option>
        </select>
      </div>

      {/* Active Filters */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 mt-3">
          <span className="text-sm text-gray-600">Active filters:</span>
          {filters.status.map(status => (
            <FilterChip
              key={`status-${status}`}
              label={`Status: ${status}`}
              onRemove={() => toggleFilter('status', status)}
            />
          ))}
          {filters.priority.map(priority => (
            <FilterChip
              key={`priority-${priority}`}
              label={`Priority: ${priority}`}
              onRemove={() => toggleFilter('priority', priority)}
            />
          ))}
          {filters.category.map(category => (
            <FilterChip
              key={`category-${category}`}
              label={`Category: ${category}`}
              onRemove={() => toggleFilter('category', category)}
            />
          ))}
          <button
            onClick={clearAllFilters}
            className="text-sm text-cyan-600 hover:text-cyan-700 font-medium"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Filter Panel */}
      {isFilterOpen && (
        <FilterPanel
          filters={filters}
          onToggleFilter={toggleFilter}
          onClose={() => setIsFilterOpen(false)}
        />
      )}
    </div>
  );
};

interface FilterChipProps {
  label: string;
  onRemove: () => void;
}

const FilterChip: React.FC<FilterChipProps> = ({ label, onRemove }) => {
  return (
    <div className="flex items-center gap-1 px-3 py-1 bg-cyan-50 border border-cyan-200 rounded-full text-sm">
      <span className="text-cyan-700">{label}</span>
      <button
        onClick={onRemove}
        className="text-cyan-600 hover:text-cyan-800 font-bold"
        aria-label={`Remove ${label} filter`}
      >
        ×
      </button>
    </div>
  );
};

interface FilterPanelProps {
  filters: FilterState;
  onToggleFilter: (type: keyof Omit<FilterState, 'dateRange' | 'searchQuery'>, value: string) => void;
  onClose: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onToggleFilter, onClose }) => {
  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg p-6 z-50">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Status Filter */}
        <div>
          <h4 className="font-semibold mb-3 text-gray-700">Status</h4>
          <div className="space-y-2">
            {['To Do', 'In Progress', 'Completed', 'Archived'].map(status => (
              <label key={status} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.status.includes(status)}
                  onChange={() => onToggleFilter('status', status)}
                  className="w-4 h-4 text-cyan-500 rounded"
                />
                <span className="text-sm">{status}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Priority Filter */}
        <div>
          <h4 className="font-semibold mb-3 text-gray-700">Priority</h4>
          <div className="space-y-2">
            {['High', 'Medium', 'Low'].map(priority => (
              <label key={priority} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.priority.includes(priority)}
                  onChange={() => onToggleFilter('priority', priority)}
                  className="w-4 h-4 text-cyan-500 rounded"
                />
                <span className={`w-2 h-2 rounded-full ${
                  priority === 'High' ? 'bg-red-500' :
                  priority === 'Medium' ? 'bg-yellow-500' : 'bg-gray-400'
                }`} />
                <span className="text-sm">{priority}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <h4 className="font-semibold mb-3 text-gray-700">Category</h4>
          <div className="space-y-2">
            {['Work', 'Personal', 'Shopping', 'Health'].map(category => (
              <label key={category} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.category.includes(category)}
                  onChange={() => onToggleFilter('category', category)}
                  className="w-4 h-4 text-cyan-500 rounded"
                />
                <span className="text-sm">{category}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
        <button
          onClick={onClose}
          className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
        >
          Cancel
        </button>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};


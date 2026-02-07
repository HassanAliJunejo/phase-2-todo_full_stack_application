import React from 'react';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ 
  icon, 
  title, 
  description, 
  actionLabel, 
  onAction 
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 max-w-md mx-auto animate-fade-in">
      <div className="w-30 h-30 mb-6 opacity-80 text-cyan-500">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 text-center mb-6">{description}</p>
      {actionLabel && onAction && (
        <button 
          onClick={onAction}
          className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg hover:scale-105 transition-transform"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

// Define the fade-in animation in a style component
export const EmptyStateStyles = () => (
  <style jsx global>{`
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .animate-fade-in {
      animation: fadeIn 0.3s ease;
    }
  `}</style>
);

// Specific empty state components
export const NoTasksEmptyState = () => (
  <>
    <EmptyStateStyles />
    <EmptyState 
      icon={
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-30 h-30">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      }
      title="No tasks yet"
      description="Create your first task to get started with your productivity journey"
      actionLabel="Create Task"
      onAction={() => console.log('Create task clicked')}
    />
  </>
);

export const NoSearchResultsEmptyState = () => (
  <>
    <EmptyStateStyles />
    <EmptyState 
      icon={
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-30 h-30">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      }
      title="No results found"
      description="Try adjusting your search terms or filters"
      actionLabel="Clear Filters"
      onAction={() => console.log('Clear filters clicked')}
    />
  </>
);

export const EmptyCalendarEmptyState = () => (
  <>
    <EmptyStateStyles />
    <EmptyState 
      icon={
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-30 h-30">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      }
      title="No events scheduled"
      description="Schedule your first event to stay organized"
      actionLabel="Schedule Event"
      onAction={() => console.log('Schedule event clicked')}
    />
  </>
);

export const EmptyCommentsEmptyState = () => (
  <>
    <EmptyStateStyles />
    <EmptyState 
      icon={
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-30 h-30">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      }
      title="No comments yet"
      description="Be the first to share your thoughts"
      actionLabel="Add Comment"
      onAction={() => console.log('Add comment clicked')}
    />
  </>
);
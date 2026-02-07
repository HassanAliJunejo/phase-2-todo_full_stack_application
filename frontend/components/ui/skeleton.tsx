import React from 'react';

interface SkeletonProps {
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => {
  return (
    <div
      className={`skeleton ${className}`}
      role="progressbar"
      aria-label="Loading content"
    />
  );
};

// Define the shimmer animation styles in the component
const SkeletonStyles = () => (
  <style jsx global>{`
    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }

    .skeleton {
      position: relative;
      overflow: hidden;
      background: #E5E7EB;
      border-radius: 12px;
    }

    .skeleton::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, #F9FAFB, transparent);
      animation: shimmer 1.5s infinite;
    }
  `}</style>
);

export { Skeleton, SkeletonStyles };

// Specific skeleton components
export const StatCardSkeleton = () => (
  <>
    <SkeletonStyles />
    <div className="stat-card-skeleton bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <Skeleton className="w-12 h-12 rounded-full" />
        <div className="flex-1">
          <Skeleton className="w-3/5 h-4 mb-2" />
          <Skeleton className="w-2/5 h-6" />
        </div>
      </div>
    </div>
  </>
);

export const TaskItemSkeleton = () => (
  <>
    <SkeletonStyles />
    <div className="task-skeleton flex items-center gap-3 p-4 bg-white rounded-lg">
      <Skeleton className="w-5 h-5 rounded" />
      <div className="flex-1">
        <Skeleton className="h-4 mb-1" />
        <Skeleton className="w-3/4 h-3" />
      </div>
      <Skeleton className="w-20 h-6" />
    </div>
  </>
);

export const SidebarSkeleton = () => (
  <>
    <SkeletonStyles />
    <div className="sidebar-skeleton space-y-4 p-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center gap-3 p-2">
          <Skeleton className="w-6 h-6 rounded-full" />
          <Skeleton className="w-24 h-4" />
        </div>
      ))}
    </div>
  </>
);
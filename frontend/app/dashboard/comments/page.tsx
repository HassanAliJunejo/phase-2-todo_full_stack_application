'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';

export default function CommentsPage() {
  const { user } = useAuth();
  const [comments] = useState([
    { id: 1, task: 'Complete project proposal', text: 'Great progress on this!', date: '2024-01-15' },
    { id: 2, task: 'Update documentation', text: 'Need to add more examples', date: '2024-01-14' },
  ]);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Comments</h1>
        <p className="mt-1 text-sm text-gray-500">
          View all task comments and discussions
        </p>
      </div>

      <div className="space-y-4">
        {comments.map(comment => (
          <div key={comment.id} className="bg-white rounded-lg shadow p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{comment.task}</h3>
                <p className="mt-1 text-sm text-gray-600">{comment.text}</p>
                <p className="mt-2 text-xs text-gray-400">{comment.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

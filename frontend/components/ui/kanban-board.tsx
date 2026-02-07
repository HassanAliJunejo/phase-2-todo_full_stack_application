'use client';

import React, { useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { 
  arrayMove, 
  SortableContext, 
  sortableKeyboardCoordinates, 
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'inprogress' | 'completed';
  priority: 'high' | 'medium' | 'low';
}

interface Column {
  id: string;
  title: string;
  taskIds: string[];
}

interface KanbanBoardProps {
  initialTasks: Task[];
  onDeleteTask?: (id: string) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ initialTasks, onDeleteTask }) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [columns, setColumns] = useState<Column[]>([
    { id: 'todo', title: 'To Do', taskIds: initialTasks.filter(t => t.status === 'todo').map(t => t.id) },
    { id: 'inprogress', title: 'In Progress', taskIds: initialTasks.filter(t => t.status === 'inprogress').map(t => t.id) },
    { id: 'completed', title: 'Completed', taskIds: initialTasks.filter(t => t.status === 'completed').map(t => t.id) },
  ]);
  const [activeId, setActiveId] = useState<string | null>(null);

  React.useEffect(() => {
    setTasks(initialTasks);
    setColumns([
      { id: 'todo', title: 'To Do', taskIds: initialTasks.filter(t => t.status === 'todo').map(t => t.id) },
      { id: 'inprogress', title: 'In Progress', taskIds: initialTasks.filter(t => t.status === 'inprogress').map(t => t.id) },
      { id: 'completed', title: 'Completed', taskIds: initialTasks.filter(t => t.status === 'completed').map(t => t.id) },
    ]);
  }, [initialTasks]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      // Check if we're moving between columns
      const activeColumn = columns.find(col => col.taskIds.includes(active.id as string));
      const overColumn = columns.find(col => col.taskIds.includes(over.id as string) || col.id === over.id);

      if (activeColumn && overColumn && activeColumn.id !== overColumn.id) {
        // Moving between columns
        setColumns(prev => 
          prev.map(col => 
            col.id === activeColumn.id
              ? { ...col, taskIds: col.taskIds.filter(id => id !== active.id) }
              : col.id === overColumn.id
              ? { ...col, taskIds: [...col.taskIds, active.id as string] }
              : col
          )
        );
        
        // Update task status
        setTasks(prev => 
          prev.map(task => 
            task.id === active.id 
              ? { ...task, status: overColumn.id as 'todo' | 'inprogress' | 'completed' } 
              : task
          )
        );
      } else {
        // Reordering within the same column
        const activeCol = columns.find(col => col.taskIds.includes(active.id as string));
        if (activeCol) {
          const oldIndex = activeCol.taskIds.indexOf(active.id as string);
          const newIndex = activeCol.taskIds.indexOf(over.id as string);
          
          setColumns(prev => 
            prev.map(col => 
              col.id === activeCol.id
                ? { ...col, taskIds: arrayMove(col.taskIds, oldIndex, newIndex) }
                : col
            )
          );
        }
      }
    }

    setActiveId(null);
  };

  const getTaskById = (id: string) => tasks.find(task => task.id === id);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={(e) => setActiveId(e.active.id as string)}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map(column => (
          <KanbanColumn 
            key={column.id} 
            column={column} 
            tasks={column.taskIds.map(id => getTaskById(id)!).filter(Boolean)}
            onDeleteTask={onDeleteTask}
          />
        ))}
      </div>
    </DndContext>
  );
};

interface KanbanColumnProps {
  column: Column;
  tasks: Task[];
  onDeleteTask?: (id: string) => void;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ column, tasks, onDeleteTask }) => {
  return (
    <div className="bg-gray-50 rounded-xl p-4 min-h-[500px]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-700">{column.title}</h3>
        <span className="bg-gray-200 px-2 py-1 rounded-full text-xs">{tasks.length}</span>
      </div>
      
      <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-3">
          {tasks.map(task => (
            <DraggableTask key={task.id} task={task} onDeleteTask={onDeleteTask} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

interface DraggableTaskProps {
  task: Task;
  onDeleteTask?: (id: string) => void;
}

const DraggableTask: React.FC<DraggableTaskProps> = ({ task, onDeleteTask }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
    >
      <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
        <TaskCard task={task} isDragging={isDragging} onDeleteTask={onDeleteTask} />
      </div>
    </div>
  );
};

interface TaskCardProps {
  task: Task;
  isDragging?: boolean;
  onDeleteTask?: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, isDragging = false, onDeleteTask }) => {
  const priorityColors = {
    high: 'bg-red-100 text-red-700',
    medium: 'bg-yellow-100 text-yellow-700',
    low: 'bg-gray-100 text-gray-700',
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDeleteTask) {
      console.log('Deleting task:', task.id);
      onDeleteTask(task.id);
    }
  };

  return (
    <div className={isDragging ? 'rotate-2 scale-105' : ''}>
      <h4 className="font-medium text-gray-900 mb-2">{task.title}</h4>
      <p className="text-sm text-gray-600 mb-3">{task.description}</p>
      <div className="flex items-center justify-between">
        <span className={`inline-block px-2 py-1 rounded text-xs ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
        <button
          onClick={handleDelete}
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          className="text-red-500 hover:text-red-700 text-sm px-2 py-1 bg-red-50 rounded hover:bg-red-100 cursor-pointer"
          type="button"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default KanbanBoard;
export { KanbanBoard };
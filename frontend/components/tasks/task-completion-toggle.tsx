import React from 'react';

interface TaskCompletionToggleProps {
  checked: boolean;
  onToggle: () => void;
  disabled?: boolean;
  'aria-label'?: string;
}

const TaskCompletionToggle: React.FC<TaskCompletionToggleProps> = ({
  checked,
  onToggle,
  disabled = false,
  'aria-label': ariaLabel
}) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={disabled}
      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
        checked ? 'bg-green-500' : 'bg-gray-200'
      }`}
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel || (checked ? 'Mark task as incomplete' : 'Mark task as complete')}
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  );
};

export default TaskCompletionToggle;
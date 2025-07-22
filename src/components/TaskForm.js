import React, { useState, useEffect } from 'react';

const TaskForm = ({ onSave, editingTask, onCancel }) => {
  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setCompleted(!!editingTask.completed);
    } else {
      setTitle('');
      setCompleted(false);
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Always send completed as boolean (default false if undefined)
    const payload = { title, completed: !!completed, _id: editingTask?._id };
    console.log('Submitting:', payload);
    onSave(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h2 className="task-title">{editingTask ? 'Edit Task' : 'Add Task'}</h2>
      <input className="task-input" type="text" placeholder="Task title" value={title} onChange={e => setTitle(e.target.value)} required />
      <label className="task-label">
        <input className="task-checkbox" type="checkbox" checked={!!completed} onChange={e => setCompleted(!!e.target.checked)} />
        Completed
      </label>
      <button className="task-btn" type="submit">{editingTask ? 'Update' : 'Add'}</button>
      {editingTask && <button className="task-btn cancel" type="button" onClick={onCancel}>Cancel</button>}
    </form>
  );
};

export default TaskForm;

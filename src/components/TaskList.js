import React from 'react';


const TaskList = ({ tasks, onEdit, onDelete }) => (
  <div className="task-list-container">
    <h2 className="task-list-title">Tasks</h2>
    <ul className="task-list">
      {tasks.map(task => (
        <li className={`task-list-item${task.completed ? ' completed' : ''}`} key={task._id}>
          <span className="task-list-text">{task.title} - {task.completed === true ? 'Done' : 'Pending'}</span>
          <button className="task-list-btn edit" onClick={() => onEdit(task)}>Edit</button>
          <button className="task-list-btn delete" onClick={() => onDelete(task._id)}>Delete</button>
        </li>
      ))}
    </ul>
  </div>
);

export default TaskList;

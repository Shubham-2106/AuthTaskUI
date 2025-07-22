
import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';


const API_URL = process.env.REACT_APP_API_URL || '';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [showRegister, setShowRegister] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    if (token) fetchTasks();
  }, [token]);

  const fetchTasks = async () => {
    const res = await fetch(`${API_URL}/tasks`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) {
      setTasks(await res.json());
    }
  };

  const handleLogin = (tok) => {
    setToken(tok);
    localStorage.setItem('token', tok);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  const handleSaveTask = async (task) => {
    const method = task._id ? 'PUT' : 'POST';
    const url = task._id ? `${API_URL}/tasks/${task._id}` : `${API_URL}/tasks`;
    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(task)
    });
    if (res.ok) {
      fetchTasks();
      setEditingTask(null);
    }
  };

  const handleDeleteTask = async (id) => {
    const res = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) fetchTasks();
  };

  if (!token) {
    return (
      <div className="main-bg">
        <div className="auth-card">
          {showRegister ? (
            <>
              <Register onRegister={() => setShowRegister(false)} />
              <button className="switch-btn" onClick={() => setShowRegister(false)}>Back to Login</button>
            </>
          ) : (
            <>
              <Login onLogin={handleLogin} />
              <button className="switch-btn" onClick={() => setShowRegister(true)}>Register</button>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="main-bg">
      <div className="app-card">
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
        <TaskForm onSave={handleSaveTask} editingTask={editingTask} onCancel={() => setEditingTask(null)} />
        <TaskList tasks={tasks} onEdit={setEditingTask} onDelete={handleDeleteTask} />
      </div>
    </div>
  );
}

export default App;

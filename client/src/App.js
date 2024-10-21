import React, { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  // Fetch tasks from the backend
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await fetch('/api/todos');
    const data = await response.json();
    setTasks(data);
  };

  const addTask = async () => {
    if (task.trim()) {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task }),
      });
      const newTask = await response.json();
      setTasks([...tasks, newTask]);
      setTask('');
    }
  };

  const toggleComplete = async (id, completed) => {
    const response = await fetch(`/api/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed: !completed }),
    });
    const updatedTask = await response.json();
    setTasks(tasks.map(task => task._id === id ? updatedTask : task));
  };

  const deleteTask = async (id) => {
    await fetch(`/api/todos/${id}`, { method: 'DELETE' });
    setTasks(tasks.filter(task => task._id !== id));
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>

      <div>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <span
              style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
              onClick={() => toggleComplete(task._id, task.completed)}
            >
              {task.task}
            </span>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

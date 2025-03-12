import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import './quests.css';

const Quest = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [progress, setProgress] = useState(0);

  const completeAudio = new Audio('/sounds/complete.mp3');
  const deleteAudio = new Audio('/sounds/delete.mp3');
  const addAudio = new Audio('/sounds/add.mp3');

  // Fetch tasks on load
  useEffect(() => {
    fetchTasks();
  }, []);

  // Progress calculation
  useEffect(() => {
    const completedTasks = tasks.filter(task => task.completed).length;
    const newProgress = tasks.length ? (completedTasks / tasks.length) * 100 : 0;
    setProgress(newProgress);

    if (newProgress >= 75) {
      triggerConfetti();
    }
  }, [tasks]);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/tasks', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async () => {
    if (!newTask.trim()) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title: newTask })
      });

      if (response.ok) {
        const task = await response.json();
        setTasks(prev => [...prev, task]);
        setNewTask('');
        addAudio.play();
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const toggleTask = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/tasks/${id}/toggle`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const updatedTask = await response.json();
        setTasks(prev =>
          prev.map(task => (task._id === id ? updatedTask : task))
        );
        completeAudio.play();
      }
    } catch (error) {
      console.error('Error toggling task:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setTasks(prev => prev.filter(task => task._id !== id));
        deleteAudio.play();
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <motion.div
      className="quest-container"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="quest-title">Quest Log</h1>

      {/* Progress Circle */}
      <motion.div
        className="progress-circle"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        <svg className="progress-ring" width="120" height="120">
          <circle
            className="progress-ring-bg"
            cx="60"
            cy="60"
            r="54"
            strokeWidth="12"
          />
          <circle
            className="progress-ring-progress"
            cx="60"
            cy="60"
            r="54"
            strokeWidth="12"
            strokeDasharray={`${2 * Math.PI * 54}`}
            strokeDashoffset={`${2 * Math.PI * 54 * (1 - progress / 100)}`}
          />
        </svg>
        <span className="progress-text">{Math.round(progress)}%</span>
        <p className="progress-info">
          {tasks.filter(task => task.completed).length}/{tasks.length} Quests Completed
        </p>
      </motion.div>

      {/* Add New Quest */}
      <div className="quest-input">
        <input
          type="text"
          value={newTask}
          placeholder="Enter a new quest..."
          onChange={(e) => setNewTask(e.target.value)}
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={addTask}
          className="add-btn"
        >
          Add Quest
        </motion.button>
      </div>

      {/* Quest List */}
      <ul className="quest-list">
        <AnimatePresence>
          {tasks.map(task => (
            <motion.li
              key={task._id}
              className={`quest-item ${task.completed ? 'completed' : ''}`}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
            >
              <label className="quest-label">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task._id)}
                />
                <span className="quest-text">{task.name}</span>
              </label>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => deleteTask(task._id)}
                className="delete-btn"
              >
                Delete
              </motion.button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </motion.div>
  );
};

export default Quest;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css'; // Import the CSS file

export default function Dashboard() {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowContent(true);
    }, 100); // Delay for animation trigger
  }, []);

  return (
    <div className="dashboard-container">
      {/* Nebula background */}
      <div className="dashboard-background">
        <img src="../wall.jpg" alt="" />
        <div className="dashboard-overlay"></div>
      </div>

      {/* Main Content */}
      <div className={`dashboard-content ${showContent ? 'show' : ''}`}>
        <h1 className="dashboard-title">Welcome, Hunter.</h1>
        <p className="dashboard-subtitle">Your stats are ready. Choose your next quest.</p>

        <div className={`dashboard-grid ${showContent ? 'show' : ''}`}>
          <div className="dashboard-card"onClick={() => navigate('/quests')}>
            <h2>Daily Quests</h2>
            
            <p>Track and complete your daily tasks.</p>
          </div>

          <div className="dashboard-card">
            <h2>Expense Tracker</h2>
            <p>Even a hunter needs money</p>
          </div>

          <div className="dashboard-card"  onClick={() => navigate('/notes')}>
            <h2>Notes</h2>
           
            <p>Sharpen your Knowledge for the next raid.</p>
          </div>

          <div className="dashboard-card">
            <h2>Fitness Tracker</h2>
            <p>Monitor Your workouts .</p>
          </div>
        </div>

        <div className="dashboard-buttons">
          <button
            className="dashboard-button enter-dungeon-btn"
            
          >
            Enter Dungeon
          </button>

          <button
            className="dashboard-button logout-btn"
            onClick={() => navigate('/')}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

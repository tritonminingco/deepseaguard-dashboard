import { useState } from 'react';
import '../styles/Header.css';

// Header component receives timeFrame, onTimeFrameChange, and alerts as props
function Header({ timeFrame, onTimeFrameChange, alerts }) {
  // Local state to control visibility of the alerts panel
  const [showAlerts, setShowAlerts] = useState(false);
  
  // Count the number of alerts by severity
  const alertCounts = {
    high: alerts.filter(alert => alert.severity === 'high').length,
    medium: alerts.filter(alert => alert.severity === 'medium').length,
    low: alerts.filter(alert => alert.severity === 'low').length
  };
  
  // Total number of alerts
  const totalAlerts = alertCounts.high + alertCounts.medium + alertCounts.low;
  
  // Handler for when the time frame is changed via the dropdown
  const handleTimeFrameSelect = (event) => {
    onTimeFrameChange(event.target.value);
  };
  
  // Handler to toggle the visibility of the alerts panel
  const toggleAlerts = () => {
    setShowAlerts(!showAlerts);
  };

  return (
    <header className="main-header">
      {/* Logo and subtitle */}
      <div className="logo-container">
        <h1>DeepSeaGuard</h1>
        <span className="subtitle">Compliance Dashboard</span>
      </div>
      
      {/* Controls section: time frame, alerts, user */}
      <div className="header-controls">
        {/* Time frame selection dropdown */}
        <div className="time-control">
          <label htmlFor="time-select">Time Frame:</label>
          <select 
            id="time-select" 
            value={timeFrame} 
            onChange={handleTimeFrameSelect}
          >
            <option value="live">Live Data</option>
            <option value="1h">Past Hour</option>
            <option value="6h">Past 6 Hours</option>
            <option value="24h">Past 24 Hours</option>
            <option value="7d">Past Week</option>
            <option value="30d">Past Month</option>
          </select>
        </div>
        
        {/* Alerts bell and panel */}
        <div className="alerts-control">
          {/* Alerts button shows bell icon and count, highlights if critical */}
          <button 
            className={`alerts-button ${alertCounts.high > 0 ? 'has-critical' : ''}`}
            onClick={toggleAlerts}
          >
            <span className="alerts-icon">🔔</span>
            <span className="alerts-count">{totalAlerts}</span>
          </button>
          
          {/* Alerts panel, shown when showAlerts is true */}
          {showAlerts && (
            <div className="alerts-panel">
              <div className="alerts-header">
                <h3>System Alerts</h3>
                {/* Close button for alerts panel */}
                <button className="close-button" onClick={toggleAlerts}>×</button>
              </div>
              
              {/* If there are alerts, show them by severity; otherwise, show no alerts message */}
              {totalAlerts > 0 ? (
                <div className="alerts-list">
                  {/* High severity alert example */}
                  {alertCounts.high > 0 && (
                    <div className="alert alert-high">
                      <div className="alert-content">
                        <div className="alert-title">Proximity Warning</div>
                        <div className="alert-message">Benthic Octopod detected within 120m of AUV-003</div>
                        <div className="alert-time">2 minutes ago</div>
                      </div>
                      <button className="alert-action">View</button>
                    </div>
                  )}
                  
                  {/* Medium severity alert example */}
                  {alertCounts.medium > 0 && (
                    <div className="alert alert-medium">
                      <div className="alert-content">
                        <div className="alert-title">Battery Warning</div>
                        <div className="alert-message">AUV-003 battery level at 32%</div>
                        <div className="alert-time">15 minutes ago</div>
                      </div>
                      <button className="alert-action">View</button>
                    </div>
                  )}
                  
                  {/* Low severity alert example */}
                  {alertCounts.low > 0 && (
                    <div className="alert alert-low">
                      <div className="alert-content">
                        <div className="alert-title">Dissolved Oxygen</div>
                        <div className="alert-message">Levels below optimal range at collection site</div>
                        <div className="alert-time">28 minutes ago</div>
                      </div>
                      <button className="alert-action">View</button>
                    </div>
                  )}
                </div>
              ) : (
                // Message if there are no active alerts
                <div className="no-alerts">
                  <p>No active alerts</p>
                </div>
              )}
              
              {/* Footer with a button to view all alerts */}
              <div className="alerts-footer">
                <button className="view-all-button">View All Alerts</button>
              </div>
            </div>
          )}
        </div>
        
        {/* User control section (placeholder for user info/actions) */}
        <div className="user-control">
          <button className="user-button">
            <span className="user-icon">👤</span>
            <span className="user-name">Admin</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;

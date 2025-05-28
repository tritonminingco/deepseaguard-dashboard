import { useState, useEffect } from 'react';
import '../styles/AlertSystem.css';

function AlertSystem({ alerts = [] }) {
  const [showAlerts, setShowAlerts] = useState(false);
  const [alertCount, setAlertCount] = useState(0);
  const [hasHighPriority, setHasHighPriority] = useState(false);
  
  // Update alert status when alerts change
  useEffect(() => {
    setAlertCount(alerts.length);
    setHasHighPriority(alerts.some(alert => alert.severity === 'high'));
  }, [alerts]);
  
  // Toggle alerts panel
  const toggleAlerts = () => {
    setShowAlerts(!showAlerts);
  };
  
  // Mock alerts for development
  const mockAlerts = [
    {
      id: 'alert-001',
      title: 'Proximity Warning',
      message: 'Benthic Octopod detected within 120m of AUV-003',
      timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
      severity: 'high',
      type: 'environmental'
    },
    {
      id: 'alert-002',
      title: 'Battery Warning',
      message: 'AUV-003 battery level at 32%',
      timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      severity: 'medium',
      type: 'operational'
    },
    {
      id: 'alert-003',
      title: 'Dissolved Oxygen',
      message: 'Levels below optimal range at collection site',
      timestamp: new Date(Date.now() - 28 * 60 * 1000).toISOString(),
      severity: 'low',
      type: 'environmental'
    }
  ];
  
  // Format relative time
  const formatRelativeTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    
    if (diffMin < 1) return 'Just now';
    if (diffMin < 60) return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
    if (diffHour < 24) return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="alert-system">
      <button 
        className={`alerts-button ${hasHighPriority ? 'has-critical' : ''}`}
        onClick={toggleAlerts}
      >
        <span className="alerts-icon">🔔</span>
        <span className="alerts-count">{alertCount}</span>
      </button>
      
      {showAlerts && (
        <div className="alerts-panel">
          <div className="alerts-header">
            <h3>System Alerts</h3>
            <button className="close-button" onClick={toggleAlerts}>×</button>
          </div>
          
          {mockAlerts.length > 0 ? (
            <div className="alerts-list">
              {mockAlerts.map(alert => (
                <div key={alert.id} className={`alert alert-${alert.severity}`}>
                  <div className="alert-content">
                    <div className="alert-title">{alert.title}</div>
                    <div className="alert-message">{alert.message}</div>
                    <div className="alert-time">{formatRelativeTime(alert.timestamp)}</div>
                  </div>
                  <button className="alert-action">View</button>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-alerts">
              <p>No active alerts</p>
            </div>
          )}
          
          <div className="alerts-footer">
            <button className="view-all-button">View All Alerts</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AlertSystem;

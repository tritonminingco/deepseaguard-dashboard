// Import React and React hooks for state and lifecycle management
import React, { useState, useEffect } from 'react';
// Import custom components for the dashboard UI
import Header from './components/Header';
import MapView from './components/MapView';
import DataPanel from './components/DataPanel';
import TimeControls from './components/TimeControls';
import AlertSystem from './components/AlertSystem';
// Import main stylesheet for the app
import './styles/App.css';

function App() {
  // State for dark/light mode toggle
  const [darkMode, setDarkMode] = useState(true);
  // State for the selected time frame (e.g., 'live', 'historical')
  const [timeFrame, setTimeFrame] = useState('live');
  // State for the currently selected AUV (Autonomous Underwater Vehicle)
  const [selectedAUV, setSelectedAUV] = useState(null);
  // State for playback speed of time controls
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  // State for the list of active alerts
  const [alerts, setAlerts] = useState([]);
  // State to control visibility of the alert system overlay
  const [showAlerts, setShowAlerts] = useState(false);

  // useEffect to initialize mock alerts data for demonstration purposes
  useEffect(() => {
    setAlerts([
      {
        id: 'alert-1', // Unique identifier for the alert
        severity: 'high', // Severity level: high
        title: 'Proximity Warning', // Alert title
        message: 'Benthic Octopod detected within 120m of AUV-003', // Alert message
        time: '2 minutes ago', // Human-readable time (not used in logic)
        timestamp: new Date(Date.now() - 2 * 60 * 1000) // Timestamp for sorting/filtering
      },
      {
        id: 'alert-2',
        severity: 'medium',
        title: 'Battery Warning',
        message: 'AUV-003 battery level at 32%',
        time: '15 minutes ago',
        timestamp: new Date(Date.now() - 15 * 60 * 1000)
      },
      {
        id: 'alert-3',
        severity: 'low',
        title: 'Dissolved Oxygen',
        message: 'Levels below optimal range at collection site',
        time: '28 minutes ago',
        timestamp: new Date(Date.now() - 28 * 60 * 1000)
      }
    ]);
  }, []);

  // Handler for changing the time frame (e.g., switching between live and historical data)
  const handleTimeFrameChange = (newTimeFrame) => {
    setTimeFrame(newTimeFrame);
  };

  // Handler for selecting an AUV (Autonomous Underwater Vehicle)
  const handleAUVSelect = (auvId) => {
    setSelectedAUV(auvId);
  };

  // Handler for changing the playback speed in time controls
  const handlePlaybackSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
  };

  // Handler for toggling between dark and light mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Handler for showing or hiding the alert system overlay
  const handleAlertClick = () => {
    setShowAlerts(!showAlerts);
  };

  // Handler for dismissing a single alert by its ID
  const handleAlertDismiss = (alertId) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId));
  };

  return (
    // Main app container with dynamic class for dark/light mode
    <div className={`app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* Header component with navigation, time frame controls, alert icon, and dark mode toggle */}
      <Header 
        timeFrame={timeFrame}
        onTimeFrameChange={handleTimeFrameChange}
        alerts={alerts}
        onAlertClick={handleAlertClick}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      {/* Main dashboard layout: left (map) and right (data) sections */}
      <div className="dashboard-container">
        {/* Left section: 3D Map View and time controls overlay */}
        <div className="map-section">
          <MapView 
            timeFrame={timeFrame}
            selectedAUV={selectedAUV}
            onAUVSelect={handleAUVSelect}
            playbackSpeed={playbackSpeed}
          />
          
          {/* Overlay for time controls (playback, time frame, etc.) */}
          <TimeControls
            timeFrame={timeFrame}
            onTimeFrameChange={handleTimeFrameChange}
            playbackSpeed={playbackSpeed}
            onPlaybackSpeedChange={handlePlaybackSpeedChange}
          />
        </div>

        {/* Right section: Data panels for selected AUV and alerts */}
        <div className="data-section">
          <DataPanel 
            selectedAUV={selectedAUV}
            timeFrame={timeFrame}
            alerts={alerts}
          />
        </div>
      </div>

      {/* Conditional rendering of the Alert System overlay if showAlerts is true */}
      {showAlerts && (
        <AlertSystem
          alerts={alerts}
          onClose={() => setShowAlerts(false)}
          onDismiss={handleAlertDismiss}
        />
      )}
    </div>
  );
}

// Export the App component as the default export
export default App;


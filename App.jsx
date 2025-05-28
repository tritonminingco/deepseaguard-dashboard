import { useState, useEffect } from 'react';
import TimeControls from './components/TimeControls';
import AlertSystem from './components/AlertSystem';
import './styles/App.css';

// Mock AUVs for dropdown selection
const mockAUVs = [
  { id: 'AUV-001', name: 'Explorer-1' },
  { id: 'AUV-002', name: 'Surveyor-1' },
  { id: 'AUV-003', name: 'Collector-1' }
];

// Mock alerts for demonstration
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

function App() {
  // State for the currently selected AUV (by id)
  const [selectedAUV, setSelectedAUV] = useState('');
  // State for the selected time frame (e.g., 'live', '1h', etc.)
  const [timeFrame, setTimeFrame] = useState('live');
  // State for the list of current alerts
  const [alerts, setAlerts] = useState(mockAlerts);
  // State for dark/light mode toggle
  const [darkMode, setDarkMode] = useState(true);

  // Handler for selecting an AUV (from dropdown or map)
  const handleAUVSelect = (auvId) => {
    setSelectedAUV(auvId);
  };

  // Handler for changing the time frame (passed to TimeControls)
  const handleTimeFrameChange = (newTimeFrame) => {
    setTimeFrame(newTimeFrame);
  };

  // Handler for toggling dark/light mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    // Main app container with dark/light mode class
    <div className={`app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* Header section with logo, subtitle, alerts, and user info */}
      <header className="main-header">
        <div className="logo-container">
          <h1>DeepSeaGuard</h1>
          <span className="subtitle">Compliance Dashboard</span>
        </div>
        
        <div className="header-controls">
          {/* Alert system component displays current alerts */}
          <AlertSystem alerts={alerts} />
          
          {/* User control section (placeholder for user info/actions) */}
          <div className="user-control">
            <button className="user-button">
              <span className="user-icon">👤</span>
              <span className="user-name">Admin</span>
            </button>
          </div>
        </div>
      </header>
      
      {/* Time controls bar for selecting time frame and playback */}
      <div className="time-control-bar">
        <TimeControls 
          timeFrame={timeFrame} 
          onTimeFrameChange={handleTimeFrameChange}
        />
      </div>
      
      {/* Main dashboard layout: map and data panels */}
      <main className="dashboard">
        {/* Map container (placeholder for interactive map) */}
        <div className="map-container">
          <div className="map-placeholder">
            <h2>3D Map View</h2>
            <p>Interactive map with AUV positions and environmental data</p>
            {/* Dropdown for selecting an AUV */}
            <label htmlFor="auv-select" style={{ color: '#fff' }}>Select AUV: </label>
            <select
              id="auv-select"
              className="auv-select"
              value={selectedAUV}
              onChange={e => setSelectedAUV(e.target.value)}
            >
              <option value="">Overview Mode</option>
              {mockAUVs.map(auv => (
                <option key={auv.id} value={auv.id}>
                  {auv.name} ({auv.id})
                </option>
              ))}
            </select>
            {/* Display currently selected AUV or overview */}
            <div style={{ color: '#fff', marginTop: 20 }}>
              Selected: {selectedAUV || 'Overview Mode'}
            </div>
          </div>
        </div>
        
        {/* Data panel container for metrics and controls */}
        <div className="data-container">
          <div className="data-panel">
            {/* Data panel header with dashboard title and selected AUV */}
            <div className="data-panel-header">
              <h2>DeepSeaGuard Dashboard</h2>
              {selectedAUV ? (
                <div className="selected-auv">
                  <span className="auv-label">Selected AUV:</span>
                  <span className="auv-id">{selectedAUV}</span>
                </div>
              ) : (
                <div className="selected-auv">
                  <span className="auv-label">Overview Mode</span>
                </div>
              )}
            </div>
            
            {/* Tabs for switching between data types (not functional here) */}
            <div className="data-panel-tabs">
              <button className="tab-button active">Environmental</button>
              <button className="tab-button">Operational</button>
              <button className="tab-button">Compliance</button>
            </div>
            
            {/* Main content area for metrics (mocked data) */}
            <div className="data-panel-content">
              <div className="panel-placeholder">
                <h3>Environmental Metrics</h3>
                <p>Real-time environmental data and compliance monitoring</p>
                <div className="metrics-preview">
                  <div className="metric-item">
                    <div className="metric-label">Sediment Disturbance</div>
                    <div className="metric-value">12.3 mg/L</div>
                    <div className="metric-status compliant">Compliant</div>
                  </div>
                  
                  <div className="metric-item">
                    <div className="metric-label">Water Turbidity</div>
                    <div className="metric-value">8.7 NTU</div>
                    <div className="metric-status compliant">Normal</div>
                  </div>
                  
                  <div className="metric-item warning">
                    <div className="metric-label">Species Proximity</div>
                    <div className="metric-value">120m</div>
                    <div className="metric-status warning">Warning</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Footer with time indicator and export button */}
            <div className="data-panel-footer">
              <div className="time-indicator">
                {timeFrame === 'live' ? (
                  <span className="live-indicator">● LIVE</span>
                ) : (
                  <span>Historical Data: {timeFrame}</span>
                )}
              </div>
              
              <button className="export-button">
                Export Data
              </button>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer with version and compliance info, and theme toggle */}
      <footer className="main-footer">
        <div className="footer-info">
          <span>DeepSeaGuard v1.0</span>
          <span>ISA Compliance: ISBA/21/LTC/15</span>
        </div>
        <div className="footer-actions">
          <button className="theme-toggle" onClick={toggleDarkMode}>
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;

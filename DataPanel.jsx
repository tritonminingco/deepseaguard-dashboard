import { useState, useEffect } from 'react';
import EnvironmentalMetrics from './panels/EnvironmentalMetrics';
import OperationalData from './panels/OperationalData';
import ComplianceStatus from './panels/ComplianceStatus';
import '../styles/DataPanel.css';

// Main DataPanel component receives selectedAUV and timeFrame as props
function DataPanel({ selectedAUV, timeFrame }) {
  // State to track which tab is active: 'environmental', 'operational', or 'compliance'
  const [activeTab, setActiveTab] = useState('environmental');
  // State to indicate if data is loading
  const [loading, setLoading] = useState(false);
  // State to hold the fetched or mocked data
  const [data, setData] = useState(null);

  // Effect runs whenever selectedAUV or timeFrame changes
  useEffect(() => {
    // In a real app, this would fetch data from an API based on selectedAUV and timeFrame
    setLoading(true); // Set loading to true while fetching

    // Simulate an API call with setTimeout
    setTimeout(() => {
      // Mock data for development and UI demonstration
      const mockData = {
        environmental: {
          sedimentDisturbance: {
            current: 12.3,
            threshold: 25,
            unit: 'mg/L',
            history: [10.2, 11.5, 12.3, 11.8, 12.3]
          },
          waterQuality: {
            turbidity: { value: 8.7, unit: 'NTU', status: 'normal' },
            pH: { value: 7.2, unit: 'pH', status: 'normal' },
            temperature: { value: 4.3, unit: '°C', status: 'normal' },
            dissolvedOxygen: { value: 6.8, unit: 'mg/L', status: 'warning' }
          },
          speciesProximity: {
            alerts: [
              { species: 'Benthic Octopod', distance: 120, timestamp: '2025-05-25T07:42:18Z', status: 'warning' }
            ]
          }
        },
        operational: {
          position: {
            lat: -14.657,
            lng: -125.425,
            depth: 3210,
            heading: 278,
            speed: 1.2
          },
          mission: {
            id: 'MSN-2025-05-25-003',
            status: 'in-progress',
            startTime: '2025-05-25T05:30:00Z',
            duration: '2h 40m',
            completionRate: 68
          },
          efficiency: {
            nodulesCollected: 42,
            rate: 15.8,
            unit: 'nodules/hour'
          },
          battery: {
            // Show warning battery for AUV-003, normal for others
            level: selectedAUV === 'AUV-003' ? 32 : 78,
            estimatedRemaining: selectedAUV === 'AUV-003' ? '1h 15m' : '4h 20m',
            status: selectedAUV === 'AUV-003' ? 'warning' : 'normal'
          }
        },
        compliance: {
          isaStandards: [
            { id: 'ISA-ENV-1', description: 'Sediment discharge limit', status: 'compliant', value: '12.3 mg/L', threshold: '25 mg/L' },
            { id: 'ISA-ENV-2', description: 'Protected species distance', status: 'warning', value: '120m', threshold: '150m' },
            { id: 'ISA-OPS-1', description: 'Collection rate reporting', status: 'compliant', value: 'Reported', threshold: 'Required' }
          ],
          timeInZones: {
            sensitive: { value: '0h 15m', limit: '1h 00m', status: 'compliant' },
            restricted: { value: '0h 00m', limit: '0h 00m', status: 'compliant' }
          },
          reportingStatus: {
            lastReport: '2025-05-25T07:00:00Z',
            nextScheduled: '2025-05-25T08:00:00Z',
            upToDate: true
          }
        }
      };

      setData(mockData); // Set the mock data
      setLoading(false); // Data loading complete
    }, 500); // Simulate 500ms network delay
  }, [selectedAUV, timeFrame]); // Dependencies: refetch when these change

  return (
    <div className="data-panel">
      {/* Header with dashboard title and selected AUV info */}
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
      
      {/* Tab buttons for switching between data types */}
      <div className="data-panel-tabs">
        <button 
          className={`tab-button ${activeTab === 'environmental' ? 'active' : ''}`}
          onClick={() => setActiveTab('environmental')}
        >
          Environmental
        </button>
        <button 
          className={`tab-button ${activeTab === 'operational' ? 'active' : ''}`}
          onClick={() => setActiveTab('operational')}
        >
          Operational
        </button>
        <button 
          className={`tab-button ${activeTab === 'compliance' ? 'active' : ''}`}
          onClick={() => setActiveTab('compliance')}
        >
          Compliance
        </button>
      </div>
      
      {/* Main content area: shows loading, data, or a no-data message */}
      <div className="data-panel-content">
        {loading ? (
          // Show loading spinner while data is being fetched
          <div className="loading-indicator">
            <div className="spinner"></div>
            <p>Loading data...</p>
          </div>
        ) : data ? (
          // Show the appropriate panel based on the active tab
          <>
            {activeTab === 'environmental' && (
              <EnvironmentalMetrics data={data.environmental} />
            )}
            
            {activeTab === 'operational' && (
              <OperationalData data={data.operational} />
            )}
            
            {activeTab === 'compliance' && (
              <ComplianceStatus data={data.compliance} />
            )}
          </>
        ) : (
          // If no data is available, prompt user to select an AUV
          <div className="no-data-message">
            <p>Select an AUV from the map to view detailed data</p>
          </div>
        )}
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
  );
}

export default DataPanel;

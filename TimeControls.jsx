import { useState, useEffect } from 'react';
import '../styles/TimeControls.css';

// List of selectable time zones, including CCZ (Clipperton Clarion Zone)
const TIME_ZONES = [
  { label: 'UTC', value: 'UTC' },
  { label: 'Local', value: Intl.DateTimeFormat().resolvedOptions().timeZone },
  { label: 'CCZ (Clipperton Clarion Zone, UTC-8)', value: 'Etc/GMT+8' },
  { label: 'US Eastern', value: 'America/New_York' },
  { label: 'US Pacific', value: 'America/Los_Angeles' },
  // Add more as needed
];

// TimeControls component manages playback, time frame, and time zone selection
function TimeControls({ timeFrame, onTimeFrameChange }) {
  // State for playback (playing/paused)
  const [isPlaying, setIsPlaying] = useState(false);
  // State for playback speed (1x, 2x, etc.)
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  // State for the current time (updates during playback)
  const [currentTime, setCurrentTime] = useState(new Date());
  // State for the selected time zone
  const [timeZone, setTimeZone] = useState('UTC');

  // Toggle play/pause state
  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  // Change playback speed
  const handleSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
  };

  // Effect: update current time during playback (if not live)
  useEffect(() => {
    let interval;

    if (isPlaying && timeFrame !== 'live') {
      // Advance the current time by playbackSpeed seconds every second
      interval = setInterval(() => {
        setCurrentTime(prevTime => {
          const newTime = new Date(prevTime);
          newTime.setSeconds(newTime.getSeconds() + playbackSpeed);
          return newTime;
        });
      }, 1000);
    }

    // Cleanup interval on unmount or when dependencies change
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, playbackSpeed, timeFrame]);

  // Format the current time for display in the selected time zone
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone,
      hour12: false,
    });
  };

  return (
    <div className="time-controls">
      {/* Display the current time and time frame */}
      <div className="time-display">
        <div className="current-time">{formatTime(currentTime)}</div>
        <div className="time-frame-label">
          {timeFrame === 'live' ? 'Live Data' : `Historical Data (${timeFrame})`}
        </div>
      </div>

      {/* Playback controls: play/pause and speed */}
      <div className="playback-controls">
        <button
          className={`playback-button ${isPlaying ? 'pause' : 'play'}`}
          onClick={togglePlayback}
          disabled={timeFrame === 'live'} // Disable in live mode
        >
          {isPlaying ? '❚❚' : '▶'}
        </button>

        <div className="speed-controls">
          <button
            className={`speed-button ${playbackSpeed === 0.5 ? 'active' : ''}`}
            onClick={() => handleSpeedChange(0.5)}
            disabled={timeFrame === 'live'}
          >
            0.5x
          </button>
          <button
            className={`speed-button ${playbackSpeed === 1 ? 'active' : ''}`}
            onClick={() => handleSpeedChange(1)}
            disabled={timeFrame === 'live'}
          >
            1x
          </button>
          <button
            className={`speed-button ${playbackSpeed === 2 ? 'active' : ''}`}
            onClick={() => handleSpeedChange(2)}
            disabled={timeFrame === 'live'}
          >
            2x
          </button>
          <button
            className={`speed-button ${playbackSpeed === 5 ? 'active' : ''}`}
            onClick={() => handleSpeedChange(5)}
            disabled={timeFrame === 'live'}
          >
            5x
          </button>
        </div>
      </div>

      {/* Time frame selector dropdown */}
      <div className="time-selector">
        <select
          value={timeFrame}
          onChange={(e) => onTimeFrameChange(e.target.value)}
        >
          <option value="live">Live Data</option>
          <option value="1h">Past Hour</option>
          <option value="6h">Past 6 Hours</option>
          <option value="24h">Past 24 Hours</option>
          <option value="7d">Past Week</option>
          <option value="30d">Past Month</option>
        </select>
      </div>

      {/* Time zone selector dropdown */}
      <div className="timezone-selector" style={{ marginTop: 8 }}>
        <label htmlFor="timezone-select" style={{ marginRight: 4 }}>Time Zone:</label>
        <select
          id="timezone-select"
          value={timeZone}
          onChange={e => setTimeZone(e.target.value)}
        >
          {TIME_ZONES.map(tz => (
            <option key={tz.value} value={tz.value}>{tz.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default TimeControls;

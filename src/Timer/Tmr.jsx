import React, { useEffect, useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faRedo } from '@fortawesome/free-solid-svg-icons';
import './tmr.css';

export default function Timer({ time, pl, br }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [remainingTime, setRemainingTime] = useState(time * 60); // fallback in case background fails
  const [totalBreaks, setTotalBreaks] = useState(br?.() || 0);

  // Poll background every second to get remaining time
  useEffect(() => {
    const interval = setInterval(() => {
      chrome.runtime.sendMessage({ type: 'GET_TIME' }, (res) => {
        if (res?.remaining !== undefined) {
          setRemainingTime(res.remaining);
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Reset the timer from background and return to setup
  const handleReset = () => {
    chrome.runtime.sendMessage({ type: 'STOP_TIMER' }, () => {
      setIsPlaying(false);
      pl(true); // show FocusCard again
    });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className='timerBoxMain'>
      <div className='timer-box'>
        <div>Focus Time</div>
        <div>Total breaks: {totalBreaks}</div>

        <CountdownCircleTimer
          key={0}
          isPlaying={isPlaying}
          duration={time * 60}
          initialRemainingTime={remainingTime}
          colors={['#004777', '#F7B801', '#A30000']}
          colorsTime={[remainingTime, remainingTime / 2, 10]}
          size={150}
          className='tmr'
        >
          {() => formatTime(remainingTime)}
        </CountdownCircleTimer>

        <div>
          <button className='play-pause' onClick={() => setIsPlaying(!isPlaying)}>
            <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
          </button>

          <button className='Redo' onClick={handleReset}>
            <FontAwesomeIcon icon={faRedo} />
          </button>
        </div>
      </div>
    </div>
  );
}

import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faRedo } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import './tmr.css';

export default function Timer(p) {
  const [isBreak, setIsBreak] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [key, setKey] = useState(0);
  const [br, setBr] = useState(p.br || 0);

  const focusDuration = p.time * 60; // in seconds
  const breakDuration = 5 * 60;      // 5 min break

  const duration = isBreak ? breakDuration : focusDuration;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleReset = () => {
    setIsPlaying(false);
    setIsBreak(false);
    p.pl(true); // Go back to setup screen
    setKey(prev => prev + 1); // force re-render
  };

  const handleComplete = () => {
    if (!isBreak) {
      // Finished focus -> start break
      setBr(prev => prev + 1);
    }
    setIsBreak(!isBreak); // toggle break/focus
    setKey(prev => prev + 1); // reset timer
    return { shouldRepeat: false };
  };

  return (
    <div className='timerBoxMain'>
      <div className='timer-box'>
        <div>{isBreak ? 'Break Time' : 'Focus Time'}</div>
        <div>Total breaks: {br}</div>

        <CountdownCircleTimer
          key={key}
          isPlaying={isPlaying}
          duration={duration}
          onComplete={handleComplete}
          colors={['#004777', '#F7B801', '#A30000']}
          colorsTime={[duration, duration / 2, 10]}
          size={150}
          className='tmr'
        >
          {({ remainingTime }) => formatTime(remainingTime)}
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

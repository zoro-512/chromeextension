import React, { useState } from 'react';
import './FocusCard.css'; 
import Timer from './Tmr';

export default function FocusCard() {


  const [minutes, setMinutes] = useState(5);
  const [skipBreaks, setSkipBreaks] = useState(false);
 const [pl,setpl]=useState(true);
  const handleIncrease = () => {
    setMinutes(m => Math.min(m + 5, 240));
  };
  

  const handleDecrease = () => {
    setMinutes(m => Math.max(m - 5, 5));
  };

  const getBreakCount = () => {
    if (skipBreaks) return 0;
    if(minutes<20) return 0;
    else{
      return Math.floor(minutes/20)
    }
    
  };

 return (
    <>
      {pl && (
        <div className="card">
          <h2>Get ready to focus</h2>
          <p>
           For longer sessions, we’ll add a short break so you can recharge.
          </p>

          <div className="time-picker">
            <button onClick={handleIncrease}>▲</button>
            <div className="minutes">{minutes}</div>
            <button onClick={handleDecrease}>▼</button>
            <div className="label">mins</div>
          </div>

          <p>You’ll have <strong>{getBreakCount()}</strong> break{getBreakCount() !== 1 ? 's' : ''}.</p>

          <div className="skip-break">
            <input
              type="checkbox"
              id="skipBreaks"
              checked={skipBreaks}
              onChange={(e) => setSkipBreaks(e.target.checked)}
            />
            <label htmlFor="skipBreaks">Skip breaks</label>
          </div>

          <button className="start-btn" onClick={()=>setpl(false)}>
            ▶ Start focus session
          </button>
        </div>
      )}
      {
        !pl && (
          <div className="card">
            <Timer time={minutes} br={getBreakCount} pl={setpl} />
          </div>
        )
      }
    </>
  );
}
import { useState } from 'react'
import { useRef } from 'react';
import './App.css'
import Dashboard from './components/Dashboard'

export default function App() {
  const [timer, setTimer] = useState([]);
  const nextId = useRef(1);

  function createTimer() {
    const randomValue = Math.floor(Math.random() * 20) + 1;

    const newTimer = {
      id: nextId.current++,
      initialVal: randomValue,
      currentVal: randomValue,
      paused: false
    }
    setTimer(p => [...p, newTimer]);
  };

  function deleteTimer(id) {
    setTimer(p => p.filter(i => i.id !== id));
  };
  
  function duplicateTimer(id) {
    setTimer(p => {
      const orig = p.find(t => t.id === id);
      if (!orig) return p;

      const copy = {
        ...orig,
        id: nextId.current++
      }
      return [...p, copy];
    })
  };

  function Pause(id) {
    setTimer(p => p.map(t => t.id === id
      ? {...t, paused: !t.paused}
      :t
    ))
  };

  function Tick(id) {
    setTimer(p => 
      p.map(t => t.id === id && !t.paused && t.currentVal > 0
        ? {...t, currentVal: t.currentVal - 1}
        :t
      )
    )
  }

  return (
    <div>
      <h1>Timers App</h1>
      <button onClick={createTimer}>Create Timer</button>
      <Dashboard 
      timers={timer} 
      onDelete={deleteTimer}  
      onDuplicate={duplicateTimer}
      onPause={Pause}
      onTick={Tick}
      />
    </div>
  )
}
import { useEffect } from "react"
export default function Timer({id, currentVal, paused, onDelete, onDuplicate, onPause, onTick}) {
    useEffect(() => {
        if (paused) return;
        const interval = setInterval(() => {
            onTick(id);
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, [paused, id, onTick]);
    return (
        <div className="timer">
            <h3>Timer {id}</h3>
            <div className="timer-value">{currentVal}</div>
            <p>Status: {paused ? "Paused" : "Running"}</p>
            <div className="timer-buttons">
                <button onClick={() => onDelete(id)}>Delete</button>
                <button onClick={() => onDuplicate(id)}>Duplicate</button>
                <button onClick={() => onPause(id)}>{paused ? "Continue" : "Pause"}</button>
            </div>
        </div>
    )
}
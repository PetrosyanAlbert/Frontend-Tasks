import Timer  from "./Timer"

export default function Dashboard({timers, onDelete, onDuplicate, onPause, onTick}) {
    return (
        <div className="dashboard">
            <h2>Dashboard</h2>
            <p>Total timers: {timers.length}</p>

            {timers.map((t) => (
                <Timer 
                key={t.id} 
                id={t.id} 
                currentVal={t.currentVal}
                paused={t.paused}
                onDelete={onDelete}
                onDuplicate={onDuplicate}
                onPause={onPause}
                onTick={onTick}
                />
            ))}
        </div>
    )
}
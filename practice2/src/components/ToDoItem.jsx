export const ToDoItem = ({id, text, complete, onRemove}) => {
    return <div style={{background: "indianred", padding: 20, margin: 10}}>
        <h3>{text}</h3>
        <button onClick={() => onRemove(id)}>delete</button>
        <button>{complete ? "cancel" : "complete"}</button>
    </div>
}
import { useState } from "react"   

export const AddToDo = ({onAdd}) => {
    const [text, setText] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(text);
        setText("");
    };

    return <div>
        <h3>AddToDo</h3>
        <form onSubmit={handleSubmit}>
            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write your todo..."
            />
            <button type="subnit">add</button>
        </form>
    </div>
}
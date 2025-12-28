import { useContext, useState } from "react";
import { UserContext } from "../context/userlist-context";
import { addUser } from "../context/action-creators";

export const AddUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("Out of provider");

    const { dispatch } = context;

    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [salary, setSalary] = useState("");

    const handleSubmit = () => {
        if (!name.trim() || !age || !salary) return;

        dispatch(
            addUser({
                id: Date.now(),
                name: name.trim(),
                age: Number(age),
                salary: Number(salary),
            })
        );

        setName("");
        setAge("");
        setSalary("");
    };
    return (
        <div>
            <h3>Add User</h3>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <input 
                type="number"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
            />

            <input 
                type="number"
                placeholder="Salary"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
            />

            <button onClick={handleSubmit}>Add</button>
        </div>
    );
};

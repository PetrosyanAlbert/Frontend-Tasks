import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../features/users/usersThunks";

export default function UserForm() {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [age, setAge] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(addUser({ name, age: Number(age) }));
        setName("");
        setAge("");
    };
    return (
        <form onSubmit={onSubmit}>
            <input
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                placeholder="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
            />
            <button type="submit">Add User</button>
        </form>
    );
}

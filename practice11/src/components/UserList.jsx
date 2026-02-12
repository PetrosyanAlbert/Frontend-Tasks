import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    editUser,
    fetchUsers,
    removeUser,
} from "../features/users/usersThunks";

export default function UserList() {
    const dispatch = useDispatch();
    const { list, loading, error } = useSelector((state) => state.users);

    useEffect(() => {
        dispatch(fetchUsers());
    }, []);
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    return (
        <ul>
            {list.map((u) => (
                <li key={u.id}>
                    {u.name} - {u.age}
                    <button
                        onClick={() =>
                            dispatch(
                                editUser({
                                    id: u.id,
                                    data: { age: u.age + 1 },
                                }),
                            )
                        }
                    >
                        +
                    </button>
                    <button onClick={() => dispatch(removeUser(u.id))}>
                        delete
                    </button>
                </li>
            ))}
        </ul>
    );
}

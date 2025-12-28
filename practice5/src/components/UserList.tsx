import { useContext } from "react";
import { UserContext } from "../context/userlist-context";
import { UserItem } from "./UserItem";

export const UserList = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("Out of provider");

    const { state } = context;
    const { users, limit } = state;

    const visibleUsers =
        limit === "all"
            ? users
            : users.slice(0, limit);

    return (
        <div>
            <h3>User List</h3>

            {visibleUsers.length === 0 && (
                <p>No users</p>
            )}

            {visibleUsers.map(u => (
                <UserItem key={u.id} data={u} />
            ))}
        </div>
    );
};

import { useContext } from "react";
import type { IUser } from "../context/types";
import { UserContext } from "../context/userlist-context";
import { deleteUser, salaryUp } from "../context/action-creators";

type Props = {
    data: IUser;
};

export const UserItem: React.FC<Props> = ({ data }) => {
    const context = useContext(UserContext);
    if (!context) throw new Error("Out of provider");
    const {dispatch} = context;
    return (
        <div className="user-item">
            <p>{data.name}</p>
            <p>{data.age} years old </p>
            <small>{data.salary} AMD</small>
            <div>
                <button onClick={() => dispatch(salaryUp(data.id))}>Salary Up</button>
                <button onClick={() => dispatch(deleteUser(data.id))}>Delete</button>
            </div>
        </div>
    );
};

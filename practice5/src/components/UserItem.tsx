import { useContext } from "react";
import type { IUser } from "../context/types";
import { UserContext } from "../context/userlist-context";
import { salaryUp } from "../context/action-creators";

type Props = {
    data: IUser;
};

export const UserItem: React.FC<Props> = ({ data }) => {
    const context = useContext(UserContext);
    if (!context) throw new Error("Out of provider");

    const { dispatch } = context;
    return (
        <div>
            <p>{data.name}</p>
            <p>{data.age}</p>
            <p>Salary: {data.salary} AMD</p>
            <button onClick={() => dispatch(salaryUp(data.id))}>
                Salary Up
            </button>
        </div>
    );
};

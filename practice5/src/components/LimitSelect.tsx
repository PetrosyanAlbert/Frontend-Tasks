import { useContext } from "react";
import { UserContext } from "../context/userlist-context";
import { setLimit } from "../context/action-creators";

export const LimitSelect = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("Out of provider");
    }
    const { state, dispatch } = context;

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        dispatch(setLimit(val === "all" ? "all" : Number(val)));
    };
    return (
        <div>
            <label>
                Show Users:
                <select value={state.limit} onChange={handleChange}>
                    <option value={"all"}>All</option>
                    <option value={"5"}>5</option>
                    <option value={"10"}>10</option>
                    <option value={"15"}>15</option>
                </select>
            </label>
        </div>
    )
};

import { useReducer } from "react";
import { UserList } from "./components/UserList";
import { UserContext } from "./context/userlist-context";
import { reducer } from "./context/reducer";
import { initialState } from "./context/state";
import { LimitSelect } from "./components/LimitSelect";

export default function App() {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <>
            <UserContext.Provider value={{state, dispatch}}>
                <LimitSelect />
                <UserList />
            </UserContext.Provider>
        </>
    );
}

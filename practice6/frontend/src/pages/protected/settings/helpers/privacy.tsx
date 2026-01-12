import { useOutletContext } from "react-router-dom";
import type { IContext } from "../../../types/utility";
import { Axios } from "../../../../config/axios";
import { useState } from "react";

export const Privacy = () => {
    const { user, setUser } = useOutletContext<IContext>();
    const [error, setError] = useState("");

    const togglePrivacy = async () => {
        try {
            const res = await Axios.patch<{ isAccountPrivate: boolean }>("/account/privacy");

            setUser({
                ...user,
                isAccountPrivate: res.data.isAccountPrivate,
            });
        } catch (err: any) {
            setError(err?.response?.data?.message);
        }
    };

    return (
        <div>
            <button onClick={togglePrivacy}>
                {user.isAccountPrivate ? (
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/15/15247.png"
                        alt="Private"
                    />
                ) : (
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/597/597356.png"
                        alt="Public"
                    />
                )}
            </button>

            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

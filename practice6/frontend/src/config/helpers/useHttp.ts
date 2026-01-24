import { useEffect, useState } from "react";
import { Axios } from "../axios";
import type { AxiosRequestConfig } from "axios";

export const useHttp = <T>(url: string) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const refetch = () => {
        setLoading(true);
        setError("");
        Axios.get(url)
            .then((response) => {
                setData(response.data);
            })
            .catch((err) => {
                setError(err?.response?.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        refetch();
    }, [url]);

    return {
        data,
        loading,
        error,
        refetch,
    };
};

type HTTP = "post" | "patch" | "delete" | "put";
type RETURN_ACTION = {
    fetch: (value: AxiosRequestConfig<unknown>) => void;
    loading: boolean;
    error: string;
    data: unknown;
};

export const useAction = <T>(
    url: string,
    method: HTTP = "post",
): RETURN_ACTION => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetch = (payload: AxiosRequestConfig<unknown>) => {
        setLoading(true);
        setError("");

        Axios[method](url, payload)
            .then((response) => {
                setData(response.data);
            })
            .catch((err) => {
                setError(err?.response?.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };
    return { fetch, loading, error, data };
};
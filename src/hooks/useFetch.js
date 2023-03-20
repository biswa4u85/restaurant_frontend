import { useCallback, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import axios from 'axios';
import config from "../common/config";
const baseURL = process.env.REACT_APP_ENV == 'dev' ? config.apiURL : ''

function getUrl(relative) {
    const urlExpression = "https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)";
    const regex = new RegExp(urlExpression);

    if (relative.match(regex)) {
        return relative;
    }

    var mainURL = process.env.REACT_APP_API_ENDPOINT;
    if (mainURL === undefined) return "";
    if (mainURL.charAt(mainURL.length - 1) !== "/") mainURL += "/";

    if (relative.length > 0 && relative.charAt(0) === "/") relative = relative.substring(1, relative.length);

    return mainURL + relative;
}

export function useFetch({ method, data, start }) {

    console.log('aaa ', method, data, start)
    const [result, setResult] = useState()
    const [loading, setLoading] = useState(false);
    const [statusCode, setCode] = useState(-1);

    const fetchData = useCallback(async () => {
        if (loading) { return; }
        setLoading(true);

        let headers = {}
        if (process.env.REACT_APP_ENV == 'dev') {
            headers.Authorization = config.token
        } else {
            headers['X-Frappe-CSRF-Token'] = token
        }
        const response = await fetch(baseURL, {
            headers: headers,
            body: JSON.stringify(data === undefined ? {} : data),
            method: method
        });
        debugger
        setCode(response.status);

        try {
            debugger
            const text = await response.text();
            const data = JSON.parse(text);
            setResult(data);
        } catch (err) {
            setResult({});
        }

        setLoading(false);
    }, [data, loading, statusCode]);

    useEffect(() => {
        if (start) { fetchData(); }
    }, [fetchData, start]);

    const refresh = () => {
        fetchData();
    }

    return ([result, loading, refresh, statusCode]);
}

export function useGet({ data, start }) {
    return useFetch({ method: "GET", data, start });
}

export function usePost({ path, start, data }) {
    const fetchResult = useFetch({ path, method: "POST", start, data });
    return (fetchResult);
}
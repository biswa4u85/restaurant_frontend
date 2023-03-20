import { useState, useEffect } from 'react';
import { addNewDataApi } from '../common/apis'

const useAxiosPost = ({ data, doctype }) => {
    const [res, setRes] = useState({ data: null, error: null, isLoading: false });

    // You POST method here
    const callAPI = async () => {
        setRes(prevState => ({ ...prevState, isLoading: true }));
        setRes({ data: null, isLoading: false, error: null });
        let isMounted = true
        try {
            let response = await addNewDataApi({ ...data, doctype, token: window?.frappe?.csrf_token })
            if (isMounted) {
                setRes({ data: response, isLoading: false, error: null });
            }
        } catch (err) {
            if (isMounted) {
                setRes({ data: null, isLoading: false, error: err.message });
            }
        }
    }

    useEffect(() => {
        if (data) {
            callAPI()
        }
    }, [data])


    return [res, callAPI];
}

export default useAxiosPost;
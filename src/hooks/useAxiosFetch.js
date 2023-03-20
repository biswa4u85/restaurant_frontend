import { useState, useEffect } from 'react';
import { apiPostCall } from '../common/apis'

const useAxiosFetch = (dataUrl) => {
    const [data, setData] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const fetchData = async (params) => {
            setIsLoading(true);
            try {
                let response = await apiPostCall('/', params, window?.frappe?.csrf_token)
                if (isMounted) {
                    setData(response.message);
                    setFetchError(null);
                }
            } catch (err) {
                if (isMounted) {
                    setFetchError(err.message);
                    setData([]);
                }
            } finally {
                isMounted && setIsLoading(false);
            }
        }
        if (dataUrl) {
            fetchData(dataUrl);
        }
        return () => {
            isMounted = false;
        };
    }, [dataUrl]);

    return { data, fetchError, isLoading };
}

export default useAxiosFetch;
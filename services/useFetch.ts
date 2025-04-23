import { useEffect, useState } from 'react';


const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);


    const fetchdata = async () => {
        try {
            setLoading(true);
            setError(null);

            const result = await fetchFunction();
            setData(result);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('An error occurred'));
        } finally {
            setLoading(false);
        }
    };

    const reset = () => {
        setData(null);
        setLoading(false);
        setError(null);
    }

    useEffect(() => {
        if (autoFetch) {
            fetchdata();
        }
    },[]);

    return{ data, loading, error, refetch: fetchdata, reset}
}

export default useFetch;
// This custom hook can be used to fetch data from an API and manage the loading and error states.
// It takes a fetch function as an argument and returns the data, loading state, error state, and a refetch function.
// The fetch function should return a promise that resolves to the data.
// The autoFetch parameter determines whether the fetch function should be called automatically when the component mounts.

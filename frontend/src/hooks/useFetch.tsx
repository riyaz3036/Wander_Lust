import {useState, useEffect} from 'react'
import {message} from 'antd';

const useFetch = (url: any)=>{
    const [data, setData]= useState([])
    const [error, setError] = useState<any>(null)
    const [loading, setLoading] = useState(false)

    useEffect(()=>{

        const fetchData = async()=>{
            setLoading(true)

            try{
            const res = await fetch(url);

            if(!res.ok){
                setError('Failed to fetch data');
                message.error('failed to fetch data');
            }
            const result = await res.json();
            setData(result.data);
            setLoading(false);

            }catch(err: any){
               setError(err.message);
               setLoading(false);
            }
        }

        fetchData()
    },[url]);

    return {
        data,
        error,
        loading,
    };
};

export default useFetch;

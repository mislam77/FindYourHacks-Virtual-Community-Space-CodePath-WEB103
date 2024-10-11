import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/venues');
                setData(response.data);
            } catch (error) {
                setError('Error fetching data');
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1>API Data</h1>
            {error && <p>{error}</p>}
            <pre>{data ? JSON.stringify(data, null, 2) : 'Loading...'}</pre>
        </div>
    );
};

export default App;
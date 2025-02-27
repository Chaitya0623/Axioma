import { useEffect, useState } from 'react';

const GoogleTrends = () => {
  const [trends, setTrends] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/trending');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setTrends(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchTrends();
  }, []);

  return (
    <div className='border border-white rounded-xl p-6'>
      <h1 className="font-bold text-lg">Trending Topics in India</h1>
      {error ? (
        <div>Error: {error}</div>
      ) : (
        <ul>
          {trends.map((trend, index) => (
            <ol>
            <li key={index}>{trend}</li>
            </ol>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GoogleTrends;

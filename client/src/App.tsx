import { useState, useEffect } from 'react';
import axios from 'axios';
import LeagueCard from './components/LeagueCard';

const App = () => {
  const [leagues, setLeagues] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const response = await axios.get('/api/leagues');
        const validLeagues = response.data.filter((league: any) => league && league.name && league.country);
        setLeagues(validLeagues); // Get valid leagues
      } catch (error) {
        setError('Error fetching data');
        console.error('Error fetching data:', error);
      }
    };
    fetchLeagues();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h1 className="text-4xl font-bold mb-2 text-center text-blue-600">🏆KickOffNow🏆</h1>
        <h1 className="text-4xl font-bold mb-2 text-center text-blue-600">Major Leagues of 2022 Season</h1>
        <h2 className="text-xl text-center text-gray-600 mb-4">Explore all your football/soccer league matches around the world</h2>
      </div>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mx-24">
        {leagues.map((league) => (
          <LeagueCard
            key={league.id}
            id={league.id}
            name={league.name}
            country={league.country}
            logo={league.logo}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
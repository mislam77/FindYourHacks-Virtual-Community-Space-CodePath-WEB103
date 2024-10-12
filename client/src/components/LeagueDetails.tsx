import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const LeagueDetails = () => {
  const { leagueId } = useParams<{ leagueId: string }>();
  const [fixtures, setFixtures] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFixtures = async () => {
      try {
        const response = await axios.get(`/api/leagues/${leagueId}/fixtures`, {
          params: { season: 2022 }
        });
        setFixtures(response.data); // Get recent 6 fixtures
      } catch (error) {
        setError('Error fetching fixtures');
        console.error('Error fetching fixtures:', error);
      }
    };
    fetchFixtures();
  }, [leagueId]);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Fixtures</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {fixtures.map((fixture) => (
          <div key={fixture.id} className="border rounded-lg p-4 shadow-lg">
            <h2 className="text-xl font-semibold">{fixture.home_team} vs {fixture.away_team}</h2>
            <p className="text-gray-600">Date: {new Date(fixture.date).toLocaleString()}</p>
            <p className="text-gray-600">Score: {fixture.home_score} - {fixture.away_score}</p>
            <p className="text-gray-600">Venue: {fixture.venue_name}, {fixture.venue_city}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeagueDetails;
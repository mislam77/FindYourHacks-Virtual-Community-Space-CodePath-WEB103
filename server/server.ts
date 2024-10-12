import express from 'express';
import axios from 'axios';
import leaguesRouter from './routes/leaguesRoutes';
import { pool } from './config/database';

const app = express();

app.use('/api', leaguesRouter);

const PORT = process.env.PORT || 5000;

const initializeData = async () => {
    try {
        // Fetch all leagues
        const leaguesResponse = await axios.get('https://v3.football.api-sports.io/leagues', {
            headers: {
                'x-rapidapi-host': 'v3.football.api-sports.io',
                'x-rapidapi-key': process.env.FOOTBALL_API_KEY
            }
        });
        const leagues = leaguesResponse.data.response;

        for (const league of leagues) {
            // Insert league details
            await pool.query(
                'INSERT INTO leagues (id, name, country, logo) VALUES ($1, $2, $3, $4) ON CONFLICT (id) DO NOTHING',
                [league.league.id, league.league.name, league.country.name, league.league.logo]
            );

            // Fetch and insert first 6 fixtures for each league
            const fixturesResponse = await axios.get('https://v3.football.api-sports.io/fixtures', {
                headers: {
                    'x-rapidapi-host': 'v3.football.api-sports.io',
                    'x-rapidapi-key': process.env.FOOTBALL_API_KEY
                },
                params: { league: league.league.id, season: 2022 }
            });
            const fixtures = fixturesResponse.data.response.slice(0, 6);

            for (const fixture of fixtures) {
                await pool.query(
                    'INSERT INTO fixtures (id, league_id, home_team, away_team, date, home_score, away_score, venue_name, venue_city) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) ON CONFLICT (id) DO NOTHING',
                    [
                        fixture.fixture.id,
                        league.league.id,
                        fixture.teams.home.name,
                        fixture.teams.away.name,
                        fixture.fixture.date,
                        fixture.goals.home,
                        fixture.goals.away,
                        fixture.fixture.venue.name,
                        fixture.fixture.venue.city
                    ]
                );
            }
        }
    } catch (error) {
        console.error('Error initializing data:', error);
    }
};

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    await initializeData(); // Initialize data when the server starts
});
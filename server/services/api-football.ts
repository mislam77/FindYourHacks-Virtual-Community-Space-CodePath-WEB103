import axios from 'axios';
import { pool } from '../config/database';

const API_KEY = process.env.FOOTBALL_API_KEY;
const BASE_URL = 'https://v3.football.api-sports.io';

export const getLeagueDetails = async (leagueId: number) => {
    try {
        const response = await axios.get(`${BASE_URL}/leagues`, {
            headers: {
                'x-rapidapi-host': 'v3.football.api-sports.io',
                'x-rapidapi-key': API_KEY
            },
            params: { id: leagueId }
        });
        const league = response.data.response[0];
        await pool.query(
            'INSERT INTO leagues (id, name, country, logo) VALUES ($1, $2, $3, $4) ON CONFLICT (id) DO NOTHING',
            [league.league.id, league.league.name, league.country.name, league.league.logo]
        );
        return league;
    } catch (error) {
        console.error('Error fetching league details:', error);
        throw error;
    }
};

export const getFixturesByLeagueAndSeason = async (leagueId: number, season: number) => {
    try {
        const response = await axios.get(`${BASE_URL}/fixtures`, {
            headers: {
                'x-rapidapi-host': 'v3.football.api-sports.io',
                'x-rapidapi-key': API_KEY
            },
            params: { league: leagueId, season: season }
        });
        const fixtures = response.data.response;
        for (const fixture of fixtures) {
            await pool.query(
                'INSERT INTO fixtures (id, league_id, home_team, away_team, date, home_score, away_score, venue_name, venue_city) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) ON CONFLICT (id) DO NOTHING',
                [
                    fixture.fixture.id,
                    leagueId,
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
        return fixtures;
    } catch (error) {
        console.error('Error fetching fixtures:', error);
        throw error;
    }
};
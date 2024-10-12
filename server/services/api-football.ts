import axios from 'axios';

// Use your API key directly here for testing purposes
const API_KEY = '093ce5cacb150856ed7a5375cf86f826';
const BASE_URL = 'https://v3.football.api-sports.io';

const LEAGUE_IDS = [39, 140, 78, 135, 61, 88, 11, 89, 60];

// Function to get league details by league ID
export const getLeagueDetails = async (leagueId: number) => {
    try {
        const response = await axios.get(`${BASE_URL}/leagues`, {
            headers: {
                'x-rapidapi-host': 'v3.football.api-sports.io',
                'x-rapidapi-key': API_KEY
            },
            params: {
                id: leagueId
            }
        });
        return response.data.response[0];
    } catch (error) {
        console.error('Error fetching league details:', error);
        throw error;
    }
};

// Function to get fixtures by league ID and season
export const getFixturesByLeagueAndSeason = async (leagueId: number, season: number) => {
    try {
        const response = await axios.get(`${BASE_URL}/fixtures`, {
            headers: {
                'x-rapidapi-host': 'v3.football.api-sports.io',
                'x-rapidapi-key': API_KEY
            },
            params: {
                league: leagueId,
                season: season
            }
        });
        return response.data.response;
    } catch (error) {
        console.error('Error fetching fixtures:', error);
        throw error;
    }
};

// Function to get details for all specified leagues
export const getAllLeaguesDetails = async () => {
    try {
        const allLeagues = [];
        for (const leagueId of LEAGUE_IDS) {
            const leagueDetails = await getLeagueDetails(leagueId);
            allLeagues.push(leagueDetails);
        }
        return allLeagues;
    } catch (error) {
        console.error('Error fetching all leagues details:', error);
        throw error;
    }
};
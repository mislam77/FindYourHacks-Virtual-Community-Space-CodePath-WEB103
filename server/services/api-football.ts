import axios from 'axios';

const API_KEY = process.env.FOOTBALL_API_KEY;
const BASE_URL = 'https://api.football-data.org/v2';

export const getVenuesInAmerica = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/venues`, {
            headers: { 'X-Auth-Token': API_KEY }
        });
        const venues = response.data.venues;
        return venues.filter((venue: any) => venue.country === 'USA');
    } catch (error) {
        console.error('Error fetching venues:', error);
        throw error;
    }
};
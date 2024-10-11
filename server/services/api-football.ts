import axios from 'axios';

// Use your API key directly here for testing purposes
const API_KEY = 'ccdfd10e0811753dc302ce78e280087c';
const BASE_URL = 'https://v3.football.api-sports.io';

// Function to get venues in the USA
export const getVenuesInAmerica = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/venues`, {
            headers: {
                'x-rapidapi-host': 'v3.football.api-sports.io',
                'x-rapidapi-key': API_KEY
            },
            params: {
                country: 'USA'  // Filter by country 'USA'
            }
        });
        const venues = response.data.response;
        return venues;  // Returning the list of USA venues
    } catch (error) {
        console.error('Error fetching venues:', error);
        throw error;
    }
};

// Function to get fixtures by venue ID
export const getFixturesByVenue = async (venueId: number) => {
    try {
        const response = await axios.get(`${BASE_URL}/fixtures`, {
            headers: {
                'x-rapidapi-host': 'v3.football.api-sports.io',
                'x-rapidapi-key': API_KEY
            },
            params: {
                venue: venueId  // Fetch fixtures for the specific venue
            }
        });
        return response.data.response;
    } catch (error) {
        console.error('Error fetching fixtures:', error);
        throw error;
    }
};
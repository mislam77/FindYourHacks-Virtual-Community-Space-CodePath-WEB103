import { Request, Response } from 'express';
import { getVenuesInAmerica, getFixturesByVenue } from '../services/api-football';

export const getAmericanVenues = async (req: Request, res: Response): Promise<void> => {
    try {
        const venues = await getVenuesInAmerica();
        res.json(venues);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const getFixturesForVenue = async (req: Request, res: Response): Promise<void> => {
    const { venueId } = req.params;
    try {
        const fixtures = await getFixturesByVenue(parseInt(venueId, 10));
        res.json(fixtures);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};
import { Request, Response } from 'express';
import { getVenuesInAmerica } from '../services/api-football';

export const getAmericanVenues = async (req: Request, res: Response): Promise<void> => {
    try {
        const venues = await getVenuesInAmerica();
        res.json(venues);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};
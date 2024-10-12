import { Request, Response } from 'express';
import { getAllLeaguesDetails, getFixturesByLeagueAndSeason } from '../services/api-football';

export const getLeaguesController = async (req: Request, res: Response): Promise<void> => {
    try {
        const leagues = await getAllLeaguesDetails();
        res.json(leagues);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const getFixturesForLeague = async (req: Request, res: Response): Promise<void> => {
    const { leagueId } = req.params;
    const season = 2022; // Hardcoded season for now
    try {
        const fixtures = await getFixturesByLeagueAndSeason(parseInt(leagueId, 10), season);
        res.json(fixtures.slice(0, 6)); // Get recent 6 fixtures
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};
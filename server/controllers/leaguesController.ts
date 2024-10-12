import { Request, Response } from 'express';
import { pool } from '../config/database';

export const getLeaguesController = async (_req: Request, res: Response): Promise<void> => {
    try {
        const result = await pool.query('SELECT * FROM leagues');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const getFixturesForLeague = async (req: Request, res: Response): Promise<void> => {
    const { leagueId } = req.params;
    try {
        const result = await pool.query('SELECT * FROM fixtures WHERE league_id = $1 ORDER BY date ASC LIMIT 6', [leagueId]);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};
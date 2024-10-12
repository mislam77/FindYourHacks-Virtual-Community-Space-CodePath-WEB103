import express from 'express';
import { getLeaguesController, getFixturesForLeague } from '../controllers/leaguesController';

const router = express.Router();

router.get('/leagues', getLeaguesController);
router.get('/leagues/:leagueId/fixtures', getFixturesForLeague);

export default router;
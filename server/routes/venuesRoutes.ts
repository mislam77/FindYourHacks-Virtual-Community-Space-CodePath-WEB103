import express from 'express';
import { getAmericanVenues, getFixturesForVenue } from '../controllers/venuesController';

const router = express.Router();

router.get('/venues', getAmericanVenues);
router.get('/venues/:venueId/fixtures', getFixturesForVenue);

export default router;
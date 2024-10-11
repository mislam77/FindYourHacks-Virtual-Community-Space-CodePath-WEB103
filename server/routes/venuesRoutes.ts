import express from 'express';
import { getAmericanVenues } from '../controllers/venuesController';

const router = express.Router();

router.get('/venues', getAmericanVenues);

export default router;
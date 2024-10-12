import express from 'express';
import leaguesRouter from './routes/leaguesRoutes';

const app = express();

app.use('/api', leaguesRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
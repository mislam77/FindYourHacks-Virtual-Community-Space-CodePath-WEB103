import express from 'express';
import venuesRouter from './routes/venuesRoutes';

const app = express();

app.use('/api', venuesRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
import express from 'express';
import vehicleRoutes from './routes/vehicules.js';
import journal from './middlewares/journal.js';
import notFound from './middlewares/notFound.js';

const app = express();

app.use(express.json());
app.use(journal);
app.use('/vehicles', vehicleRoutes);
app.use(notFound);

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

import express from 'express';
import vehicleRoutes from './routes/vehicules.js';
import journal from './middlewares/journal.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(journal);
app.use('/vehicules', vehicleRoutes);

app.listen(port, () => {
    console.log(`Server is running on port https://localhost:${port}`);
});

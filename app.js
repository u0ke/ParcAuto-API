import express from 'express';
const app = express();
app.use(express.json());
import vehicles from './data.js';

app.get('/vehicles', (req, res) => {
    res.json(vehicles);
});
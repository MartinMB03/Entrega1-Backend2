import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import sessionsRouter from './routes/sessions.router.js';
import 'dotenv/config';

const app = express();
const PORT = 8080;

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
    .then(() => console.log('Conectado exitosamente a la base de datos MongoDB.'))
    .catch(error => console.error('Error al conectar a la base de datos MongoDB:', error));

app.use(express.json());
initializePassport();
app.use(passport.initialize());

app.use('/api/sessions', sessionsRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salio mal en el servidor!');
});


app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`));
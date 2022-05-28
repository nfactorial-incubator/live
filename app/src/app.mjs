import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import isAuth from './middleware/isAuth.mjs';
import unauthorizedHandler from './middleware/unauthorizedHandler.mjs';
import { register, login } from './routes/auth.mjs';
import { getUser } from './routes/user.mjs';

const app = express()

// middleware
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', isAuth);
app.use(unauthorizedHandler);

// static
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/', express.static(__dirname + '/static'));

// routes
app.post('/auth/register', register);
app.post('/auth/login', login);
app.get('/api/user', getUser);

export default app;
import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import isAuth from './middleware/isAuth.mjs';
import unauthorizedHandler from './middleware/unauthorizedHandler.mjs';
import { register, login } from './routes/auth.mjs';
import { getUser } from './routes/user.mjs';
import { commentSubmission, createAssignment, createSubmission, deleteAssignment, deleteSubmission, getAllAssignments, getAllSubmissions, getAssignment, getSubmission, gradeSubmission } from './routes/homework.mjs';
import isMentor from './middleware/isMentor.mjs';

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

app.post('/api/hw/assignment', isMentor, createAssignment);
app.delete('/api/hw/assignment/:id', isMentor, deleteAssignment);
app.get('/api/hw/assignment', getAllAssignments);
app.get('/api/hw/assignment/:id', getAssignment);

app.post('/api/hw/submission', createSubmission);
app.delete('/api/hw/submission/:id', deleteSubmission);
app.get('/api/hw/submission', getAllSubmissions);
app.get('/api/hw/submission/:id', getSubmission);
app.post('/api/hw/submission/:id/comment', commentSubmission);
app.post('/api/hw/submission/:id/grade', isMentor, gradeSubmission);

export default app;
import express, { Application } from 'express';
import { db } from './config/database';
import userRouter from './routes/user.router';
import roleRouter from './routes/role.router';
import teamRouter from './routes/team.router';

const app: Application = express();

// PostGRESql database connection
db.authenticate()
    .then(() => console.log('Connected to database...'))
    .catch((err: Error) => console.log('Error: ' + err));

app.use(express.json());
app.use('/admin/users', userRouter);
app.use('/admin/roles', roleRouter);
app.use('/admin/teams', teamRouter);

const port = process.env.PORT || 3000

app.listen(port, () => console.log('Server running on port ' + port));
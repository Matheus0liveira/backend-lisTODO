import express from 'express';
import cors from 'cors';
import routes from './routes';

import './database';

const PORT = process.env.PORT || 3333;

const app = express();
app.use(cors());
app.use(express.json());

app.use(routes);

app.listen(PORT, () => console.log('🔥 Server started at: http://localhost:3333'));

import dotenv from 'dotenv';
import express from 'express';
import { setupStatic } from './src/http/static.js';
import { registerBackend } from './src/app/registerBackend.js';

import { registerSurvey } from './src/app/registerSurvey.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 7000;

// Parse JSON request bodies
app.use(express.json());



registerBackend(app);
registerSurvey(app);

app.get('/ping', (req, res) => {
  res.send('pong');
});
setupStatic(app);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


import express from 'express';
import { setupStatic } from './src/http/static.js';
import { registerBackend } from './src/app/registerBackend.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
// Parse JSON request bodies
app.use(express.json());

setupStatic(app);

registerBackend(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


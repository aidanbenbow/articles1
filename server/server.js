import express from 'express';
import { setupStatic } from './src/http/static.js';

const app = express();
const port = process.env.PORT || 5000;

setupStatic(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


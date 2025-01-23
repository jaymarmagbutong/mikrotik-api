// app.js

import express from 'express';  // Importing express
import { RouterOSAPI } from 'routeros-client';  // Correctly destructuring the import
import cors from 'cors';
const app = express();
import routes from './routes/index.js';

// Set up RouterOS API connection details
const conn = new RouterOSAPI({
  host: '192.168.30.1',  // MikroTik Router IP (Replace with your MikroTik's IP)
  user: 'admin',          // Your MikroTik username
  password: 'jaymar123',  // Your MikroTik password
  port: 8728              // Default port for API
});

// Middleware to handle JSON responses

app.use(cors());
app.use(express.json());

app.use('/api', routes);


export default app;  // Exporting the app for use in server.js
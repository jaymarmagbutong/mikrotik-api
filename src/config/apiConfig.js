// config/apiConfig.js
import dotenv from 'dotenv';
dotenv.config();

export const apiConfig = {
  host: process.env.API_HOST,
  user: process.env.API_USER,
  password: process.env.API_PASSWORD,
  port: process.env.API_PORT
};

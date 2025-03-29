import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';

import { connectToDatabase } from './config/database';
import { taskRoute } from './routes/task.route';
import { apiDocumentation } from './docs/apidoc';

const cors = require('cors');
const app = express();


const corsOptions = {
  origin: 'http://localhost:5173', // Allow only requests from this origin
  methods: '*', // Allow only these methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Allow only these headers
};

dotenv.config();

const HOST = process.env.HOST || 'http://localhost/';
const PORT = parseInt(process.env.PORT || '4500');

// Use CORS middleware with specified options
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', taskRoute());
app.use('/documentation', swaggerUi.serve, swaggerUi.setup(apiDocumentation));

app.get('/', (req, res): any => {
  return res.json({ message: 'Hello World!' });
});

app.listen(PORT, async () => {
  await connectToDatabase();

  console.log(`Application started on URL ${HOST}:${PORT} 🎉`);
});
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/debug-standalone', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Standalone Express in API folder works',
    env: process.env.NODE_ENV
  });
});

export default app;

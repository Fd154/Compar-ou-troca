import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import productsRouter from './routes/products';
import authRouter from './routes/auth';
import categoriesRouter from './routes/categories';

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/debug-env', (req, res) => {
  res.json({
    hasUrl: !!process.env.SUPABASE_URL,
    hasKey: !!process.env.SUPABASE_KEY,
    nodeEnv: process.env.NODE_ENV
  });
});

app.use('/api/products', productsRouter);
app.use('/api/auth', authRouter);
app.use('/api/categories', categoriesRouter);

const PORT = Number(process.env.PORT) || 4000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`api listening on http://localhost:${PORT}`);
  });
}

export default app;

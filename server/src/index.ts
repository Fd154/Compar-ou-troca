import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import productsRouter from './routes/products';
import authRouter from './routes/auth';
import categoriesRouter from './routes/categories';

const app = express();

// Configure CORS
const allowedOrigins = [
  'http://localhost:5173', 
  'http://localhost:4173',
  'https://compar-ou-troca.vercel.app',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || origin.endsWith('.vercel.app')) {
      callback(null, true);
    } else {
      console.log('CORS Check:', origin);
      // For debugging, let's allow all for now, but log it
      callback(null, true);
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(morgan('dev'));

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'API is running', version: '1.0.0' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Mount routes
app.use('/api/products', productsRouter);
app.use('/api/auth', authRouter);
app.use('/api/categories', categoriesRouter);

// Global Error Handler
app.use((err: any, req: any, res: any, next: any) => {
  console.error('Global API Error:', err);
  
  // Ensure response is always JSON
  if (!res.headersSent) {
    res.status(err.status || 500).json({
      error: err.message || 'Internal Server Error',
      type: err.name || 'Error',
      timestamp: new Date().toISOString()
    });
  }
});

// Handle 404
app.use((req, res) => {
  if (!res.headersSent) {
    res.status(404).json({ error: 'Route not found' });
  }
});

export default app;

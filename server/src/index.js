import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import productsRouter from './routes/products.js';
import authRouter from './routes/auth.js';
import categoriesRouter from './routes/categories.js';
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
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1 || origin.endsWith('.vercel.app')) {
            callback(null, true);
        }
        else {
            console.log('Blocked by CORS:', origin);
            // Don't block for now to debug, just log
            callback(null, true);
        }
    },
    credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));
// Add root route for basic health check
app.get('/', (req, res) => {
    res.json({ status: 'API is running', version: '1.0.0' });
});
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

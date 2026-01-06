import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import productsRouter from './routes/products.js';
import authRouter from './routes/auth.js';
import categoriesRouter from './routes/categories.js';

const app = express();

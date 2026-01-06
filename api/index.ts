import app from '../server/src/index.js';

export default async function handler(req: any, res: any) {
  try {
    console.log('API Handler started');
    console.log('API Entry Point Hit. Deployment: ' + new Date().toISOString());
  return app(req, res);
  } catch (error: any) {
    console.error('API Error:', error);
    res.status(500).json({ 
      error: 'Internal Server Error', 
      details: error.message 
    });
  }
}
export default async function handler(req: any, res: any) {
  try {
    console.log('API Entry Point Hit. Deployment: ' + new Date().toISOString());
    const appModule = await import('./_server/index.js');
    const app = appModule.default;
    return app(req, res);
  } catch (error: any) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      error: 'API Boot Error', 
      details: error.message,
      stack: error.stack
    });
  }
}
export default async function handler(req: any, res: any) {
  try {
    const appModule = await import('../server/src/index.js');
    const app = appModule.default;
    return app(req, res);
  } catch (error: any) {
    console.error('API Error:', error);
    res.status(500).json({ 
      error: 'Internal Server Error', 
      details: error.message,
      stack: error.stack 
    });
  }
}
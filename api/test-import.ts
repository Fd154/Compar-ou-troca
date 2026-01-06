export default async function handler(req: any, res: any) {
  try {
    console.log('Attempting to import server/src/index.js');
    // @ts-ignore
    const serverIndex = await import('../server/src/index.js');
    console.log('Import success');
    res.status(200).json({ 
      status: 'Import Success', 
      keys: Object.keys(serverIndex) 
    });
  } catch (error: any) {
    console.error('Import Failed:', error);
    res.status(500).json({ 
      error: 'Import Failed', 
      message: error.message, 
      stack: error.stack,
      code: error.code
    });
  }
}
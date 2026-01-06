import express from 'express';

export default function handler(req: any, res: any) {
  try {
    res.json({ 
      status: 'ok',
      typeofExpress: typeof express,
      // Check if it's a function (default import) or object (namespace)
      isFunction: typeof express === 'function',
      message: 'If you see this, dependencies are loading.'
    });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
}

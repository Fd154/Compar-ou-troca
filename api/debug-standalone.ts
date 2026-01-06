import { createRequire } from 'module';
const require = createRequire(import.meta.url);

export default function handler(req: any, res: any) {
  try {
    const express = require('express');
    const app = express();
    
    res.json({ 
      status: 'ok',
      method: 'require',
      typeofExpress: typeof express,
      isFunction: typeof express === 'function'
    });
  } catch (e: any) {
    res.status(500).json({ error: e.message, stack: e.stack });
  }
}

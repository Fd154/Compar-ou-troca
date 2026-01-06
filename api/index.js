import app from '../server/src/index.js';
export default async function handler(req, res) {
    try {
        console.log('API Handler started');
        return app(req, res);
    }
    catch (error) {
        console.error('API Error:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            details: error.message
        });
    }
}

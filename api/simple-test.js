import { z } from 'zod';
export default function handler(req, res) {
    const schema = z.string();
    res.status(200).json({
        status: 'Alive',
        timestamp: new Date().toISOString(),
        env: {
            hasUrl: !!process.env.SUPABASE_URL
        },
        zodCheck: schema.safeParse('test').success
    });
}

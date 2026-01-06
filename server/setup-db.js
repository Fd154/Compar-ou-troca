import pg from 'pg';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const run = async () => {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
        console.error('❌ DATABASE_URL não encontrado no arquivo .env');
        console.log('Por favor, adicione a variável DATABASE_URL ao seu arquivo .env');
        console.log('Exemplo: DATABASE_URL=postgres://postgres.xxxx:password@aws-0-us-east-1.pooler.supabase.com:6543/postgres');
        process.exit(1);
    }
    console.log('🔌 Conectando ao banco de dados...');
    const client = new pg.Client({
        connectionString,
        ssl: {
            rejectUnauthorized: false
        }
    });
    try {
        await client.connect();
        console.log('✅ Conectado com sucesso!');
        const sqlPath = path.join(__dirname, 'supabase_schema.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');
        console.log('🚀 Executando migração...');
        // Split commands safely? Or just run the whole block?
        // pg.query supports multiple statements usually
        await client.query(sql);
        console.log('✅ Tabelas criadas com sucesso!');
    }
    catch (err) {
        console.error('❌ Erro ao criar tabelas:', err);
    }
    finally {
        await client.end();
    }
};
run();

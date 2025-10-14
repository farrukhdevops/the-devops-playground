import { Pool } from "pg"; let _pool: Pool | null = null;
export function pool(){ if(!_pool) _pool = new Pool({ connectionString: process.env.DATABASE_URL }); return _pool; }
export async function ensureSchema(){ await pool().query(`CREATE TABLE IF NOT EXISTS cart_items(sid TEXT NOT NULL, product_id INTEGER NOT NULL, qty INTEGER NOT NULL DEFAULT 1, PRIMARY KEY (sid,product_id))`); }

import { DataSource } from 'typeorm';
import path from 'path';
import * as fs from 'fs';

import * as entities from 'entities';

// Managed Postgres (Vercel, Supabase, Neon, RDS, ...) requires TLS. Enable it
// with DB_SSL=true so local development against a plain Postgres still works.
// When the provider's CA chain is bundled we verify it; otherwise we fall back
// to an encrypted-but-unverified connection so the deploy can still connect.
const resolveSslConfig = (): boolean | { rejectUnauthorized: boolean; ca?: string } => {
  if (process.env.DB_SSL !== 'true') {
    return false;
  }

  const caCertPath = path.join(__dirname, '../../ca-certificate.crt');

  if (fs.existsSync(caCertPath)) {
    return {
      rejectUnauthorized: true,
      ca: fs.readFileSync(caCertPath).toString(),
    };
  }

  return { rejectUnauthorized: false };
};

const createDatabaseConnection = (): Promise<DataSource> =>
  new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: Object.values(entities),
    ssl: resolveSslConfig(),
    synchronize: true,
  }).initialize();

export default createDatabaseConnection;

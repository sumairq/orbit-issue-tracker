import { DataSource } from 'typeorm';
// import path from 'path';
// import * as fs from 'fs';

import * as entities from 'entities';

const createDatabaseConnection = (): Promise<DataSource> =>
  new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: Object.values(entities),
    // ssl: {
    //   rejectUnauthorized: true,
    //   ca: fs.readFileSync(path.join(__dirname, '../../ca-certificate.crt')),
    // },
    synchronize: true,
  }).initialize();

export default createDatabaseConnection;

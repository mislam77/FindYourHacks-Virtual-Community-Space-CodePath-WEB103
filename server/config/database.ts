import pg from 'pg';

const config = {
    user: process.env.PGUSER as string,
    password: process.env.PGPASSWORD as string,
    host: process.env.PGHOST as string,
    port: parseInt(process.env.PGPORT as string, 10),
    database: process.env.PGDATABASE as string
};

export const pool = new pg.Pool(config);
export default {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    schema: process.env.DB_SCHEMA || 'public',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
  },
};

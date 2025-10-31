export default function dbConfigFuntion(dbname) {
    return {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
        database: dbname
    }
}
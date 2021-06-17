import dotenv from 'dotenv'
dotenv.config()

const openSqlite = async () => {
  const sqlite3 = await import("sqlite3");
  const { open } = await import("sqlite")

  const db = await open({
    filename: "./database.db",
    driver: sqlite3.Database,
  });

  return db
}

const openMySQL = async () => {
  const mysql = (await import('serverless-mysql')).default

  const conn = mysql({
    config: {
      host: process.env.MYSQL_HOST,
      database: process.env.MYSQL_DATABASE,
      user: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      port: parseInt(process.env.MYSQL_PORT),
    },
  })

  const db = {
    run: conn.query,
    exec: conn.query,
    get: conn.query,
    all: conn.query,
    close: () => {},
    open: () => {}
  }

  return db;
  
}

const openDb = async () => {
  if (process.env.USE_MYSQL === "true") {
    return openMySQL();
  }
  return openSqlite();
}

const db = await openDb();

export default db;

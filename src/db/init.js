const Database = require("./config")

const initDB = {
  async init() {
    const db = await Database()

    await db.exec(`CREATE TABLE rooms (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      pass TEXT
    )`)

    await db.exec(`CREATE TABLE questions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titule TEXT,
      read INT
    )`)

    await db.close()
  },
}

initDB.init()
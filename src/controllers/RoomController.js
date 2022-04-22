const Database = require("../db/config")

module.exports = {
  async create(req, res) {
    const db = await Database()

    /** Dados do form */
    const pass = req.body.password
    let roomId = ""
    /** Criar uma senha com números randomicos */
    for (var i = 0; i <= 5; i++) {
      roomId += Math.floor(Math.random() * 10).toString()
    }

    /** Query de inserção no banco de dados */
    await db.run(`INSERT INTO rooms ( id, pass ) 
      VALUES ( ${parseInt(roomId)}, ${pass} )`)

    /** Fechar o banco de dados */
    await db.close()

    res.redirect(`/room/${roomId}`)
  },
}

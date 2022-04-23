const Database = require("../db/config")

module.exports = {
  async create(req, res) {
    const db = await Database()
    /** Dados do form */
    const pass = req.body.password
    let roomId = ""
    let isValidRoom = true

    while (isValidRoom) {
      /** Criar uma senha com números randomicos */
      for (var i = 0; i <= 5; i++) {
        roomId += Math.floor(Math.random() * 10).toString()
      }
      /** Verifica se o número não existe */
      const roomsIds = await db.all("SELECT id FROM rooms")
      isValidRoom = roomsIds.some((roomsId) => roomsId === roomId)
      /** Se o número não existir, criar sala */
      if (!isValidRoom) {
        /** Query de inserção no banco de dados */
        await db.run(`INSERT INTO rooms ( id, pass ) 
          VALUES ( ${parseInt(roomId)}, ${pass} )`)
      }
    }

    /** Fechar o banco de dados */
    await db.close()

    res.redirect(`/room/${roomId}`)
  },

  async open(req, res) {
    /** Iniciar banco de dados */
    const db = await Database()
    /** Pegar o id da sala */
    const roomId = parseInt(req.params.room)
    /** Verificar se a sala existe */
    const room = await db.get(`SELECT * FROM rooms WHERE id = ${roomId}`)
    if (!room) {
      /** Redirecionar para a tela inicial */
      return res.redirect("/no-room")
    }
    /** Buscar as questões da sala */
    const questions = await db.all(
      `SELECT * FROM questions WHERE room = ${roomId} ORDER BY read`
    )
    /** Redirecionar para a sala */
    res.render("room", { roomId: roomId, questions: questions })
  },

  async enter(req, res) {
    const roomId = req.body.roomId
    res.redirect(`/room/${roomId}`)
  },
}

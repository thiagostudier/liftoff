const Database = require("../db/config")

module.exports = {
  async index(req, res) {
    /** Iniciar banco de dados */
    const db = await Database()
    /** Pegar os dados da requisição */
    const roomId = req.params.room
    const questionId = req.params.question
    const action = req.params.action
    const password = req.body.password
    /** Verificar se a senha está correta */
    const verifyRoom = await db.get(`SELECT * FROM rooms WHERE id = ${roomId}`)
    if (verifyRoom.pass === password) {
      /** Se a ação for de remoção */
      if (action === "delete") {
        await db.run(`DELETE FROM questions WHERE id = ${questionId}`)
      } else if (action === "check") {
        await db.run(`UPDATE questions SET read = 1 WHERE id = ${questionId}`)
      }
      /** Redirecionar para a tela da sala */
      res.redirect(`/room/${roomId}`)
    } else {
      /** Se a senah estiver incorreta */
      res.render("pass-incorrect", { roomId: roomId })
    }
  },

  async create(req, res) {
    /** Iniciar banco de dados */
    const db = await Database()
    /** Pegar os dados da requisição */
    const question = req.body.question
    const roomId = req.params.room
    /** Query de inserção no banco de dados */
    await db.run(`INSERT INTO questions ( 
      title, 
      room,
      read 
    ) VALUES ( 
      "${question}", 
      ${roomId},
      0 
    )`)
    /** Redirecionar para a tela da sala */
    res.redirect(`/room/${roomId}`)
  },
}

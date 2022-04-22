module.exports = {

  index(req, res) {
    const roomId = req.params.room
    const questionId = req.params.question
    const actionId = req.params.action
    const password = req.body.password

    console.log(roomId, questionId, actionId, password)
  }

}
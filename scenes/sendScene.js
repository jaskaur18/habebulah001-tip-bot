const { errorMessage } = require("../helpers")

module.exports = () => async (ctx) => {
    if (ctx.chat.type != 'private') return
    ctx.session.username = ctx.message.text
    ctx.reply(`Enter Amount Of Token To Send to ${ctx.session.username}`)
        .catch(err => errorMessage(err, ctx))
    ctx.scene.leave();
    ctx.scene.enter("enter-send-token")
}
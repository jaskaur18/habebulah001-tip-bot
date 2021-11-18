const { errorHandler } = require('../helpers')

module.exports = () => async (ctx) => {
    if (ctx.chat.type != 'private') return
    ctx.reply(`
Enter Your Transcation Id Of Your Paymen
Ex- b264dc6a542a77baf84b2f167cf6a6527a37afb76cae179dd267f237b79aea4ee`).catch(err => errorHandler(ctx, errorHandler))
    ctx.scene.enter("enter-deposit")
}
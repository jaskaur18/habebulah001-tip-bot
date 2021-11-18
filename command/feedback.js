const { errorHandler } = require('../helpers')
const { Keyboard, Key } = require('telegram-keyboard')

const feedbackKeyboard = Keyboard.make([
    [Key.callback("Bug Report", "feedbackaction"),
    Key.callback("Thanks", "feedbackaction")],
    [Key.callback("Questions", "feedbackaction"),
    Key.callback("Proposal", "feedbackaction")],
    [Key.callback("Help", "help"),
    Key.callback("Menu", "menu")]
]).inline()

module.exports = () => async ctx => {
    if (ctx.chat.type != 'private') return
    ctx.reply(
        `
Choose the reason for your request:help:feedback
`,feedbackKeyboard
    ).catch(err => errorHandler(err, ctx))
}
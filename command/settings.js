const { errorHandler } = require('../helpers')
const { Keyboard, Key } = require('telegram-keyboard')

featuresKeyboard = Keyboard.make([
    Key.callback("Feedback", "feedback"),
    Key.callback("Main Menu", "menu")
]).inline()

module.exports = () => async (ctx, next) => {
    ctx.reply(`
Your personal settings are here`, featuresKeyboard).catch(err => errorHandler(err, ctx))
}
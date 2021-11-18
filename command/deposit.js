const { errorHandler } = require('../helpers')
const { Keyboard, Key } = require('telegram-keyboard')

depositKeyboard = Keyboard.make([Key.callback("Check Deposit", 'checkdeposit')]).inline()

module.exports = () => async (ctx) => {
    if (ctx.chat.type != 'private') return
    user_exits = await db.collection("userdata").findOne({ _id: ctx.from.id });
    ctx.reply(`
Deposit - DepositAddess
Send Token Here And Click ON Button Below
`, depositKeyboard).catch(err => errorHandler(err, ctx))
}
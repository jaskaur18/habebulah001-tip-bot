const { errorHandler } = require('../helpers')
const { Keyboard, Key } = require('telegram-keyboard')

balanceKeyboard = Keyboard.make([
    Key.callback("Balance", "balance"),
        Key.callback("Send", "send"),
            Key.callback("Menu", "menu",)
]).inline()
module.exports = () => async (ctx) => {
    if (ctx.chat.type != 'private') return

    user_exits = await db.collection("userdata").findOne({ _id: ctx.from.id });

    ctx.reply(`
Your Balance:

= ${user_exits.Balance} RAPTOREUM 
`, balanceKeyboard).catch(err => errorHandler(err, ctx))
}
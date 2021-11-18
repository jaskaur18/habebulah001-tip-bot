const { errorHandler } = require("../helpers")
const { Keyboard, Key } = require("telegram-keyboard")

const groulistKeyboard = Keyboard.make([
    Key.callback("Balance", "balance"),
    Key.callback("Send", "send"),
    Key.callback("Back", "menu"),
]).inline()

module.exports = () => async ctx => {
    ctx.reply(`
List of group commands:
/send - [amount] [Token] [@user]
/giveaway - [amount] [Token] [numberofusers]
/balance - your balance in private message`, groulistKeyboard).catch(err => errorHandler(err,ctx))
}
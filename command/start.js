const { errorHandler } = require('../helpers')
const { Keyboard, Key } = require('telegram-keyboard')

mainKeyboard = Keyboard.make([
    [Key.callback("Send", "send"),
    Key.callback("💰 Balance", "balance"),
    Key.callback("📱 Featues", "features")],
    [Key.callback("Deposit", "deposit"),
    Key.callback("Withdraw", "withdraw"),
    Key.callback("⚙️", "settings")]
]).inline();

module.exports = () => async (ctx) => {
    if (ctx.chat.type != 'private') return

    user_exits = await db.collection("userdata").findOne({ _id: ctx.from.id });
    if (user_exits == undefined) {
        await db.collection("userdata").insertOne({
            _id: ctx.from.id,
            username: ctx.from.username,
            first_name: ctx.from.first_name,
            last_name: ctx.from.last_name,
            wallet_address: 0,
            Balance: 0,
            Referral: 0,
            Referral_parrent: "None",
            lang: "en",
            Referral_link: `https://t.me/${ctx.me}?start=${ctx.from.id}`
        });
    }


    ctx.reply(`
/send any token to a Telegram nickname
/deposit tokens to mainwalletbot
/withdraw tokens to another wallet
/balance your balance in private message


/forgroups list of group commands
/affiliate earn coins and tokens
/feedback support

@${ctx.me}`, mainKeyboard).catch(err => errorHandler(err, ctx))
}
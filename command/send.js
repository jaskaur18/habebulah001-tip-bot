const { errorHandler } = require('../helpers')

module.exports = () => async (ctx) => {
    if (ctx.chat.type == "private") {
        ctx.reply(`
        Step 1/2.
        Enter recipient username: 
        for example - ronnekeren
        `).catch(err => errorHandler(err, ctx))
        return ctx.scene.enter("enter-send")
    }
    if (typeof ctx.message.reply_to_message === "undefined")
        return ctx.reply(`@${ctx.from.username} you must Type While Replying`);
    sendMessage = ctx.message.text.split(" ");
    let [command, sendAmount] = sendMessage
    let userToSend = ctx.message.reply_to_message.from.id;
    if (isNaN(sendAmount)) return ctx.reply("Correct Format - /send [Amount] While Replying To A Message")

    user = await db.collection("userdata").findOne({
        _id: ctx.from.id
    })
    if (sendAmount <= 0) return ctx.reply("Amount Must Be Greater Than 0")
    if (user.Balance < sendAmount) return ctx.reply(`Amount Must Be Equal Or Less Than ${user.Balance} Token`)
    await db.collection("userdata").updateOne({ _id: ctx.from.id }, {
        $inc: {
            Balance: - Number(sendAmount)
        }
    })
    await db.collection("userdata").updateOne({ _id: Number(userToSend) }, {
        $inc: {
            Balance: Number(sendAmount)
        }
    })
    await ctx.reply(`Successfully Sended ${sendAmount} To ${ctx.message.reply_to_message.from.first_name}`)

}
const { errorHandler } = require("../helpers")

module.exports = () => async (ctx) => {
    try {
        if (ctx.chat.type != 'private') return
        ctx.session.token = Number(ctx.message.text)
        if (ctx.message.text == "/cancle") return ctx.scene.leave()
        if (isNaN(ctx.session.token)) return ctx.reply("Please Enter A Valid Amount\n/cancle To Cancle")
        user_exits = await db.collection("userdata").findOne({
            username: {
                $regex: new RegExp(ctx.session.username, "ig")
            }
        })

        user = await db.collection("userdata").findOne({
            _id: ctx.from.id
        })

        if (user_exits == undefined) {
            await ctx.reply("User Didn't Register In The Bot")
            return ctx.scene.leave();
        }
        if (sendAmount <= 0) return ctx.reply("Amount Must Be Greater Than 0")
        if (user.Balance < ctx.session.token) return ctx.reply(`Amount Must Be Equal Or Less Than ${user.Balance} Token
/cancle To Cancle"`)

        await ctx.reply(`${ctx.session.token} Token Sended To ${ctx.session.username}`)
            .catch(err => errorMessage(err, ctx))

        users = await db.collection("userdata").updateOne({ _id: ctx.from.id }, {
            $inc: {
                Balance: -ctx.session.token
            }
        })

        await db.collection("userdata").updateOne({ _id: user_exits._id }, {
            $inc: {
                Balance: ctx.session.token
            }
        })
        ctx.scene.leave();
    }
    catch (err) {
        errorHandler(err, ctx)
    }
}
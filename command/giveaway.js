const { errorHandler } = require('../helpers')

module.exports = () => async (ctx) => {
    // if (ctx.chat.type == "private") return ctx.reply("This Command Works In Only Groups")
    giveawayMessage = ctx.message.text.split(" ");
    let [command, giveawayAmount, giveawayUser] = giveawayMessage
    amountToAdd = Number(giveawayAmount) / Number(giveawayUser)
    if (isNaN(giveawayUser) || isNaN(giveawayAmount)) return ctx.reply("Correct Format - /giveaway [Amount] [User]")
    user = await db.collection("userdata").findOne({
        _id: ctx.from.id
    })

    if (giveawayAmount <= 0) return ctx.reply("Amount Must Be Greater Than 0")
    if (user.Balance < giveawayAmount) return ctx.reply(`Amount Must Be Equal Or Less Than ${user.Balance} Token`)

    groupuserCount = await db
        .collection(`${ctx.chat.id}`)
        .countDocuments()
    if (groupuserCount < giveawayUser) return ctx.reply(`Not Enough Register User In The Group Current Count - ${groupuserCount}`)

    await db.collection("userdata").updateOne({ _id: ctx.from.id }, {
        $inc: {
            Balance: - giveawayAmount
        }
    })

    users = await db.collection(`${ctx.chat.id}`).find().limit(Number(giveawayUser)).toArray()
    users.map(async (user) => {
        await db.collection("userdata").updateOne({ _id: user._id }, {
            $inc: {
                Balance: amountToAdd
            }
        })
    })
    await ctx.reply(`${amountToAdd} Token Sended To ${giveawayUser} Users`)
}


module.exports = () => async ctx => {

    if (ctx.chat.type == "private") return

    user_exits = await db
        .collection(`${ctx.chat.id}`)
        .findOne({ _id: ctx.from.id })

    groupmemberCount = await db
        .collection(`${ctx.chat.id}`)
        .countDocuments();

    if (groupmemberCount > 300)
        return await db
            .collection(`${ctx.chat.id}`)
            .find()
            .sort({ timestamp: -1 })
            .limit(100)
            .map(async (doc) => {
                await db
                    .collection(`${ctx.chat.id}`)
                    .remove({ _id: doc._id });
            });

    if (user_exits == undefined)
        await db
            .collection(`${ctx.chat.id}`)
            .insertOne({
                _id: ctx.from.id,
                username: ctx.from.username,
                firstname: ctx.from.first_name,
                lastname: ctx.from.last_name,
            });
}
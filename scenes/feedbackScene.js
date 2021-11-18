const { errorMessage } = require("../helpers")

module.exports = () => async (ctx) => {
    if (ctx.chat.type != 'private') return
    message = ctx.message.text
    await ctx.reply("Your Message Has Been Sended TO Admin")
    ctx.telegram.sendMessage(process.env.ADMIN_ID, `
New Feeback From ${ctx.from.first_name} ${ctx.from.last_name} Id - ${ctx.from.id}  @${ctx.from.username}

${message}
`).catch(err => errorMessage(err, ctx))

ctx.scene.leave();
}
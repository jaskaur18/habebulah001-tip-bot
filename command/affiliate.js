const {errorHandler} = require("../helpers")

module.exports = () => async (ctx) => {
    user_exits = await db.collection("userdata").findOne({ _id: ctx.from.id });
    ctx.reply(`
Invite your friends and earn money from their commission on paid operations!

Your referrer, you have been invited: ${user_exits.Referral_parrent}
    
Your referral link:
https://t.me/${ctx.me}?start=${ctx.from.id}    
`).catch(err => errorHandler(err, ctx))
}
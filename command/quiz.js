const { errorHandler } = require('../helpers')

module.exports = () => async (ctx) => {
    if (ctx.chat.type !== "private") return
    ctx.reply(`
Create a Quiz with a prize in crypto!
Participants who guess the correct answer - share the prize!
    
Write your question:`).catch(err => errorHandler(err, ctx))
}
const { inspect } = require('util')
const addGroupid = require('./addGroup')

// eslint-disable-next-line no-console
const debug = (err, ctx) => {
  console.log(err);
  ctx.reply("Oh Error Happened 😢.");
  ctx.telegram
    .sendMessage(
      process.env.ADMIN_ID,
      `
Error Happned ${ctx.from.first_name}
Id - ${ctx.from.id} Username - @${ctx.from.username}
  
${err}
  `
    )
    .catch((err) => console.log(err));
}

// eslint-disable-next-line no-console
const errorHandler = (error, ctx) => debug(error, ctx)



module.exports = {
  debug,
  errorHandler,
  addGroupid
}
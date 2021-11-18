const {errorHandler} = require("../helpers")

module.exports = () => async (ctx ) =>{
    ctx.reply("Write the subject of your request").catch(err => errorHandler(err, ctx))
    ctx.scene.enter("feedback")
}
const { errorMessage, errorHandler } = require("../helpers")
const axios = require("axios")

module.exports = () => async (ctx) => {
    try {
        if (ctx.chat.type != 'private') return
        txid = ctx.message.text
        await ctx.reply("Checking Your New Deposit")
        tx = await axios.get(`https://explorer.raptoreum.com/api/getrawtransaction?txid=${txid}`)
            .catch(err => errorMessage(err, ctx))
        if (tx.data == undefined) {
            ctx.reply("Invalid Transaction")
            returnctx.scene.leave();
        }
        inputtrans = tx.data.vin[0]
        outputtrans = tx.data.vout[0]
        value = outputtrans.value
        address = outputtrans.scriptPubKey.addresses[0]

        if (isNaN(value)) {
            ctx.reply("Invalid Transaction")
            returnctx.scene.leave();
        }
        await db.collection("userdata").updateOne({
            _id: ctx.from.id
        }, {
            Balance: value
        }).catch(err => errorHandler(err, ctx))

        ctx.scene.leave();
    }
    catch (err) {
        errorHandler(err, ctx)
        ctx.scene.leave();
    }
}
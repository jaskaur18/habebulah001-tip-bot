const { errorHandler } = require('../helpers')
const { Keyboard, Key } = require('telegram-keyboard')

featuresKeyboard = Keyboard.make([
    [Key.callback("Paywall", "paywall"),
    Key.callback("Quiz", "quiz")],
    [Key.callback("FeedBack", "feedback"),
    Key.callback("Main Menu 🔙", "menu")]
]).inline()

module.exports = () => async (ctx, next) => {
    ctx.reply(`
You can earn coins and tokens using the next features:

/paywall create paid message
/quiz create your own quizz
    
/forgroups list of group commands
/affiliate earn coins and tokens
    
@${ctx.me}`, featuresKeyboard).catch(err => errorHandler(err, ctx))
}
require("dotenv").config()

const { Telegraf, session, Stage, BaseScene } = require('telegraf')
const { BOT_TOKEN, ADMIN_ID } = process.env
const { db } = require('./db')
const { startCommand, balanceCommand, featuresCommand, grouplistCommand,
    affiliateCommand, feedbackCommand, settingsCommand, depositCommand, sendCommand, giveawayCommand, quizCommand } = require('./command')
const { feedbackaction, checkdepositAction } = require('./actions')
const { feedbackScene, depositScene, sendScene, sendtokenScene } = require('./scenes')
const { referralStart } = require('./hears')
const { errorHandler, addGroupid } = require('./helpers')
const stage = new Stage();

const init = async (bot, db) => {

    /**
     * BaseScene
     */
    const feedback = new BaseScene("feedback");
    stage.register(feedback);
    const deposit = new BaseScene("enter-deposit");
    stage.register(deposit);
    const enterSend = new BaseScene("enter-send");
    stage.register(enterSend);
    const enterSendToken = new BaseScene("enter-send-token");
    stage.register(enterSendToken);

    /**
     * Middlewares
     */
    bot.use(session())
    bot.use(stage.middleware());

    /**
     * Handlers
     */
    // bot.hears(/[\S\s]*/, hearsHandler())
    // bot.on('new_chat_members', newChatMembersHandler())
    // bot.on('left_chat_member', leftChatMemberHandler())

    /**
     * Actions
     */
    bot.action("balance", balanceCommand())
    bot.action("menu", startCommand())
    bot.action("features", featuresCommand())
    bot.action("feedback", feedbackCommand())
    bot.action("feedbackaction", feedbackaction())
    bot.action("settings", settingsCommand())
    bot.action("deposit", depositCommand())
    bot.action("checkdeposit", checkdepositAction())
    bot.action("send", sendCommand())

    /**
     * Commands
     */
    bot.start(startCommand())
    bot.command('menu', startCommand())
    bot.command('balance', balanceCommand())
    bot.command("features", featuresCommand())
    bot.command("forgroups", grouplistCommand())
    bot.command("affiliate", affiliateCommand())
    bot.command("feedback", feedbackCommand())
    bot.command("settings", settingsCommand())
    bot.command("deposit", depositCommand())
    bot.command("send", sendCommand())
    bot.command("giveaway", giveawayCommand())
    bot.command("quiz", quizCommand())

    /**
    * Hears
    */
    bot.hears(/^\/start (.+[1-9]$)/, referralStart());


    /**
     * Scenes
     */
    feedback.on("message", feedbackScene())
    deposit.on("message", depositScene())
    enterSend.on("message", sendScene())
    enterSendToken.on("message", sendtokenScene())

    bot.on("message", addGroupid())
    return bot
}

/**
 * Init bot function.
 *
 * @param {Telegraf} bot The bot instance.
 * @param {Object} dbConfig The knex connection configuration.
 * @return {Promise<Telegraf>} Bot ready to launch.
 */

init(new Telegraf(BOT_TOKEN), db)
    .then((bot) => {
        /**
         * Run
         */
        bot.launch(console.log("BOt Started Working"))
    })
    .catch(console.log)

module.exports = init
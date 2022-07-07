const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder().setName('ping').setDescription('bruh'),
    async execute(interation: typeof BaseInteraction) {
        await interation.reply('Pong')
    },
}

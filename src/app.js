require('dotenv/config')
const { Client } = require('discord.js')
const { validReplay, downloadFiles, cleanDirectories } = require('./utils.js')
const { createChart } = require('./chart.js')

const client = new Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] })
const botId = '989087652949131274'

client.once('ready', () => {
    console.log(`logged in as ${client.user.tag}`)
})

client.on('messageCreate', async (message) => {
    if (!message.mentions.users.has(botId)) {
        return
    }
    if (message.attachments.first() === undefined) {
        console.log('no attatchments')
        message.reply('no attatchments: attach a slippi replay file')
        return
    }

    const files = {}
    for (const [key, value] of message.attachments) {
        const url = value.url
        const fileName = value.name
        files[fileName] = url
    }

    if (!validReplay(files)) {
        message.reply('invalid replay files')
        return
    }

    await downloadFiles(files)

    const fileNames = Object.keys(files)

    try {
        for (const fileName of fileNames) {
            const chartPath = await createChart(fileName)

            message.reply({ files: [chartPath] })
            // message.reply(attach)
        }
    } catch {
        message.reply('corrupted .slp file')
    } finally {
        cleanDirectories()
    }
})

client.login(process.env.DISCORD_TOKEN)

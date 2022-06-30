import 'dotenv/config'
import { Client, MessageSelectMenu } from 'discord.js'
import request from 'request'

const client = new Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] })

client.once('ready', () => {
    console.log(`logged in as ${client.user.tag}`)
})

client.on('messageCreate', (message) => {
    if (message.attachments.first() === undefined) {
        console.log('no attatchments')
        return
    }

    console.log(`hi${message.attachments.keys()}hi`)

    for (let [key, value] of message.attachments) {
        console.log(key + ' + ' + value)
        console.log(value.url)
    }
})

client.login(process.env.DISCORD_TOKEN)

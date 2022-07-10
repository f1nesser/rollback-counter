import dotenv from 'dotenv'
import { Intents } from 'discord.js'
import WOKCommands from 'wokcommands'
import { Client } from 'discord.js'
import path from 'path'
dotenv.config()

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
})

client.on('ready', () => {
    new WOKCommands(client, {
        commandDir: path.join(__dirname, 'commands'),
        typeScript: true,
        testServers: [process.env.GUILD_ID!],
        debug: true,
    })
})

client.login(process.env.DISCORD_TOKEN)

require('dotenv/config')
const { Client } = require('discord.js')
const https = require('https')
const fs = require('fs')
const { SlippiGame } = require('@slippi/slippi-js')

const client = new Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] })

client.once('ready', () => {
    console.log(`logged in as ${client.user.tag}`)
})

client.on('messageCreate', (message) => {
    if (message.attachments.first() === undefined) {
        console.log('no attatchments')
        return
    }

    for (let [key, value] of message.attachments) {
        const url = value.url
        const fileName = value.name
        const writeStream = fs.createWriteStream(fileName)
        const request = https.get(url, (response) => {
            response.pipe(writeStream)
            writeStream.on('finish', () => {
                writeStream.close
                console.log(`${fileName} downloaded`)
                const game = new SlippiGame(fileName)
                const { count, frames, lengths } = game.getRollbackFrames()
                console.log('count', count)
                // console.log('frames', frames)
                console.log('lengths', lengths)
            })
        })
    }
})

client.login(process.env.DISCORD_TOKEN)

import 'dotenv/config'
import { Client, MessageSelectMenu } from 'discord.js'
import https from 'https'
import fs from 'fs'

const client = new Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] })

client.once('ready', () => {
	console.log(`logged in as ${client.user.tag}`)
})

client.on('messageCreate', message => {
	if (message.attachments.first() === undefined) {
		console.log('no attatchments')
		return
	}

	console.log(`hi${message.attachments.keys()}hi`)

	for (let [key, value] of message.attachments) {
		console.log(key + ' + ' + value)
		console.log(value.url)
		const file = fs.createWriteStream(value.name)
		const request = https.get(value.url, response => {
			response.pipe(file)
			file.on('finish', () => {
				file.close
				console.log(`${value.name} downloaded`)
			})
		})
	}
})

client.login(process.env.DISCORD_TOKEN)

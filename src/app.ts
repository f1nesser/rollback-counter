require('dotenv/config')
const { Client, Collection, BaseInteraction } = require('discord.js')
const fs = require('node:fs')
const path = require('node:path')

const client = new Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] })

client.commands = new Collection()
const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs.readirSync(
    commandsPath.filter((file: string) => file.endsWith('.ts'))
)

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file)
    const command = require(filePath)
    client.commands.set(command.data.name, command)
}

client.on('interactionCreate', async (interaction: typeof BaseInteraction) => {
    if (!interaction.isCommand()) return

    const command = client.commands.get(interaction.commandName)

    if (!command) return

    try {
        await command.execute(interaction)
    } catch (error) {
        console.log(error)
        await interaction.reply({
            content: 'An error occured',
            ephemeral: true,
        })
    }
})

client.once('ready', () => {
    console.log(`logged in as ${client.user.tag}`)
})

client.login(process.env.DISCORD_TOKEN)

import { ICommand } from 'wokcommands'
import DiscordJS from 'discord.js'
import { validReplay } from '../utils/utils'
import fetch from 'node-fetch'
import { createChart } from '../utils/createChart'

export default {
    category: 'test',
    description:
        'upload an .slp replay file and recieve a chart of the rollbacks',
    slash: 'both',
    minArgs: 1,
    expectedArgs: '<slpReplay>',
    options: [
        {
            name: 'slpreplay',
            description: 'your .slp replay file',
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.ATTACHMENT,
        },
    ],
    callback: async ({ interaction }) => {
        try {
            const { name, url } =
                interaction.options.getAttachment('slpreplay')!

            if (!validReplay(name!)) {
                interaction.reply({ content: 'invalid file type' })
                return
            }

            const response = await fetch(url)
            const fileBuf = await response.arrayBuffer()
            const chart = await createChart(fileBuf)

            interaction.reply({
                files: [chart],
            })
            return
        } catch (error) {
            console.log(error)
            interaction.reply({
                content: 'something went wrong: most likely corrupt .slp file',
            })
        }
    },
} as ICommand

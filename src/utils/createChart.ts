import { ChartJSNodeCanvas } from 'chartjs-node-canvas'
import { FramesType, RollbackFramesType, SlippiGame } from '@slippi/slippi-js'
import { FramesAndLengths } from '../types'
import { ChartConfiguration } from 'chart.js'

function correlateLengths(
    rollbackFrames: RollbackFramesType,
    rollbackLengths: number[]
) {
    // first frame is -123
    // first playable is -39
    let i = 1
    const data: FramesAndLengths = {}
    Object.keys(rollbackFrames).forEach((item, x) => {
        i -= 1
        if (i === 0) {
            const length = rollbackLengths[x]
            if (length) {
                data[item] = length
                i = length
            }
        }
    })
    return data
}

function getGraphData(gameFrames: FramesType, rollbackObj: FramesAndLengths) {
    const gameFrameKeys = Object.keys(gameFrames)
    const graphData: FramesAndLengths = {}
    gameFrameKeys.forEach((key) => {
        graphData[key] = rollbackObj[key] ? rollbackObj[key] : 0
    })
    return graphData
}

export async function createChart(gameBuffer: ArrayBuffer): Promise<Buffer> {
    const game = new SlippiGame(gameBuffer)
    const { frames, lengths } = game.getRollbackFrames()
    const gameFrames = game.getFrames()
    const { players } = game.getSettings()!

    const rollbackObj = correlateLengths(frames, lengths)
    const graphData = getGraphData(gameFrames, rollbackObj)

    const charTitle = `${players[0].displayName} (${players[0].connectCode}) vs. ${players[1].displayName} (${players[1].connectCode})`

    const config: ChartConfiguration = {
        type: 'bar',
        data: {
            datasets: [
                {
                    label: 'rollbacks',
                    data: Object.values(graphData),
                    backgroundColor: 'red',
                    barThickness: 0.2,
                },
            ],
            labels: Object.keys(graphData),
        },
        options: {
            scales: {
                yAxis: {
                    min: 0,
                    max: 7,
                },
            },
            plugins: {
                title: {
                    display: true,
                    text: charTitle,
                },
            },
        },
    }

    const canvas = new ChartJSNodeCanvas({
        height: 600,
        width: 1000,
        backgroundColour: 'white',
    })

    return await canvas.renderToBuffer(config, 'image/png')
}

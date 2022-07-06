const { ChartJSNodeCanvas } = require('chartjs-node-canvas')
const { SlippiGame } = require('@slippi/slippi-js')
const fs = require('fs')

function correlateLengths(rollbackFrames, rollbackLengths) {
    let i = 1
    const rollbackObj = {}
    Object.keys(rollbackFrames).forEach((item, x) => {
        i -= 1
        if (i === 0) {
            const length = rollbackLengths[x]
            if (length) {
                rollbackObj[item] = length
                i = length
            }
        }
    })
    return rollbackObj
}

function getGraphData(gameFrames, rollbackObj) {
    const gameFrameKeys = Object.keys(gameFrames)
    const graphData = {}
    gameFrameKeys.forEach((key) => {
        graphData[key] = rollbackObj[key] ? rollbackObj[key] : 0
    })
    return graphData
}

function createChart(gameName) {
    return new Promise((resolve, reject) => {
        const path = `./replays/${gameName}`
        const chartPath = `./charts/${gameName}.png`
        const game = new SlippiGame(path)

        if (!game) {
            reject()
        }

        const { frames, lengths } = game.getRollbackFrames()
        const gameFrames = game.getFrames()
        const { players } = game.getSettings()
        const rollbackObj = correlateLengths(frames, lengths)
        const graphData = getGraphData(gameFrames, rollbackObj)
        const charTitle = `${players[0].displayName} (${players[0].connectCode}) vs. ${players[1].displayName} (${players[1].connectCode})`

        ;(async () => {
            const config = {
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
            const callBack = (ChartJS) => {}
            const canvas = new ChartJSNodeCanvas({
                height: 600,
                width: 1000,
                backgroundColour: 'white',
                chartCallback: callBack,
            })

            const image = await canvas.renderToBuffer(config, 'image/png')

            fs.promises
                .writeFile(chartPath, image, () =>
                    console.log('chart generated')
                )
                .then(() => resolve(chartPath))
            // resolve(chartPath)
        })()
    })
}

exports.createChart = createChart

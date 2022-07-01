const { SlippiGame } = require('@slippi/slippi-js')
const game = new SlippiGame('example_game.slp')
const { frames, count, lengths } = game.getRollbackFrames()
const gameFrames = game.getFrames()

const sum = lengths.reduce((acc, cur) => acc + cur, 0)
// console.log(Object.keys(frames))
// console.log(Object.keys(gameFrames))
console.log(gameFrames['0'])

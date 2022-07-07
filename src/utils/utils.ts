const { Files } = require('../types')
function validReplay(files: typeof Files) {
    const regex = /.*\.slp/
    const names = Object.keys(files)
    let ret = true
    names.forEach((item) => {
        if (!regex.exec(item)) {
            ret = false
        }
    })
    return ret
}

exports.validReplay = validReplay

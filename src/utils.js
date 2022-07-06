const https = require('https')
const fs = require('fs')
const path = require('path')

function downloadFiles(files) {
    return new Promise((resolve, reject) => {
        for (const name in files) {
            const url = files[name]
            const filePath = `./replays/${name}`
            const writeStream = fs.createWriteStream(filePath)
            const request = https.get(url, (response) => {
                response.pipe(writeStream)
                writeStream.on('finish', () => {
                    console.log(`${name} downloaded`)
                    resolve()
                })
                response.on('error', (e) => {
                    console.log(e)
                    reject()
                })
            })
        }
    })
}

function validReplay(files) {
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

function cleanDirectories() {
    const dirs = ['./replays', './charts']
    dirs.forEach((dir) => {
        fs.readdir(dir, (err, files) => {
            if (err) throw err
            files.forEach((file) => {
                fs.unlink(path.join(dir, file), (err) => {
                    if (err) throw err
                })
            })
        })
    })
    console.log('all clean!')
}

exports.cleanDirectories = cleanDirectories
exports.downloadFiles = downloadFiles
exports.validReplay = validReplay

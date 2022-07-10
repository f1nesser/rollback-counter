export function validReplay(fileName: string) {
    const regex = /.*\.slp/
    return regex.exec(fileName)
}

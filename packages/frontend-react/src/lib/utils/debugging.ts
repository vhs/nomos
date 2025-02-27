const checkpointStates: Record<string, number> = {}

const checkpointNames = [
    'Alpha',
    'Bravo',
    'Charlie',
    'Delta',
    'Echo',
    'Foxtrot',
    'Golf',
    'Hotel',
    'India',
    'Juliett',
    'Kilo',
    'Lima',
    'Mike',
    'November',
    'Oscar',
    'Papa',
    'Quebec',
    'Romeo',
    'Sierra',
    'Tango',
    'Uniform',
    'Victor',
    'Whiskey',
    'Xray',
    'Yankee',
    'Zulu'
]

const getLine = function (layer = 2): string | undefined {
    return new Error().stack?.split('at ')[layer]
    // .replace('https://localhost:5173/', '')
    // .replace(/\?t=\d{12,}/, '')
}

export const RESET_CHECKPOINT = (color: string): void => {
    checkpointStates[color] = 0
}
export const CHECKPOINT = (color: string, ...args: unknown[]): void => {
    if (checkpointStates[color] == null || checkpointStates[color] === checkpointNames.length)
        checkpointStates[color] = 0

    const checkpointStateIdx = checkpointStates[color]++

    console.debug(`CHECKPOINT[${color}/${checkpointNames[checkpointStateIdx]}]`, getLine(3), ...args)
}

import moment from 'moment'

import type { BubbleDataPoint } from 'chart.js'

import { isString, isStringArray } from './validators/guards'

export const coerceStringArray = (inp: unknown): string[] => {
    if (typeof inp !== 'string' && Array.isArray(inp) && inp.length > 0 && inp.every((e) => typeof e !== 'string'))
        throw new Error(`Invalid input: ${JSON.stringify(inp)}`)

    const arrayStrings = Array.isArray(inp) ? inp : [inp]

    if (!arrayStrings.every((e) => typeof e === 'string')) {
        throw new Error(`Not all entries are string`)
    }

    return arrayStrings
}

export const coerceStringObject = (inp: Record<string, unknown>): Record<string, string> => {
    return Object.entries(inp).reduce<Record<string, string>>((c, [k, v]) => {
        if (v == null) {
            c[k] = ''
            // eslint-disable-next-line @typescript-eslint/no-base-to-string
        } else if (v.toString() === '[object Object]') {
            c[k] = JSON.stringify(v)
        } else {
            // eslint-disable-next-line @typescript-eslint/no-base-to-string
            c[k] = String(v)
        }

        return c
    }, {})
}

export const generateRangeArray = (min: number, max: number): number[] =>
    Array.from({ length: max - min + 1 }, (_, i) => min + i)

export const compareStringArray = <T extends string[] = string[]>(leftArray?: T, rightArray?: T): boolean => {
    if (!isStringArray(leftArray) || !isStringArray(rightArray)) return false
    if (leftArray.length !== rightArray.length) return false

    return (
        [...leftArray].sort((a, b) => a.localeCompare(b)).join('') !==
        [...rightArray].sort((a, b) => a.localeCompare(b)).join('')
    )
}

// export const compareObjects = <T extends Record<string, unknown> = Record<string, unknown>>(
//     leftObject?: T,
//     rightObject?: T
// ): boolean => {
//     if (leftObject == null || rightObject == null) return false
//     if (Array.isArray(leftObject) || Array.isArray(rightObject)) return false

//     if (Object.keys(leftObject).length !== Object.keys(rightObject).length) return false

//     if ([...new Set(...Object.keys(leftObject), Object.keys(rightObject))].reduce((c, e) => { },{})) return false

//     return true
// }

export const generateRowColArray = <T = unknown>(rows: number, cols: number, defaultValue?: T): T[][] => {
    defaultValue ??= 0 as T

    const generatedArray: T[][] = []

    for (let row = 0; row < rows; row++) {
        if (generatedArray[row] == null) generatedArray[row] = []
        for (let col = 0; col < cols; col++) {
            generatedArray[row][col] = defaultValue
        }
    }

    return generatedArray
}

export const generateRowColBubbleDataset = (rows: number, cols: number, defaultValue?: number): BubbleDataPoint[] => {
    defaultValue ??= 0

    const generatedArray: BubbleDataPoint[] = []

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            generatedArray.push({ x: col, y: row, r: defaultValue })
        }
    }

    return generatedArray
}

export const convertDayofWeekByNumber = (dayNumber: string | number): string => moment().day(dayNumber).format('dddd')
export const convertMonthNumberByNumber = (monthNumber: string | number): string =>
    moment().month(monthNumber).format('MMMM')

export const stripResultMessageQuotes = (inp: string): string => {
    if (!isString(inp)) throw new Error('Not a string')

    if (!/^".+"$/.test(inp)) return inp

    return inp.substring(1, inp.length - 1)
}

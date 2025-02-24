import moment from 'moment'

import type { BubbleDataPoint } from 'chart.js'

import {
    isBasePrivilegesArray,
    isPrivilegesArray,
    isBooleanRecord,
    isString,
    isStringArray
} from '@/lib/validators/guards'

import type { BooleanRecord } from '@/types/common'
import type { FilterDefinitions } from '@/types/query-filters'
import type { BasePrivileges, Privileges } from '@/types/records'

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

export const getEnabledStateRecordKeys = <
    T extends Record<string, boolean>,
    F extends string | number | symbol = keyof T
>(
    inp: T
): F[] => Object.keys(inp).filter((k) => inp[k]) as F[]

export const convertPrivilegesArrayToBooleanRecord = (
    privileges: BasePrivileges | Privileges | null | undefined | string,
    defaultVal?: boolean
): BooleanRecord => {
    defaultVal ??= true

    if (privileges == null || (!isPrivilegesArray(privileges) && !isBasePrivilegesArray(privileges))) return {}

    return privileges?.reduce<BooleanRecord>((c, e) => {
        c[e.code] = defaultVal

        return c
    }, {})
}

export const convertFilterArrayToBooleanRecord = (
    filters: FilterDefinitions | null | undefined,
    defaultVal?: boolean
): BooleanRecord => {
    defaultVal ??= false

    if (filters == null) return {}

    return filters?.reduce<BooleanRecord>((c, filter) => {
        c[filter.id] = defaultVal

        return c
    }, {})
}

export const convertStringArrayToBooleanRecord = (
    inp: string[] | null | undefined,
    defaultVal?: boolean
): BooleanRecord => {
    defaultVal ??= false

    if (!isStringArray(inp)) return {}

    return inp?.reduce<BooleanRecord>((c, e) => {
        c[e] = defaultVal

        return c
    }, {})
}

export const mergeBooleanRecord = (base: BooleanRecord, override: BooleanRecord): BooleanRecord => {
    if (!isBooleanRecord(base)) throw new Error('Invalid base state record')
    if (!isBooleanRecord(override)) throw new Error('Invalid override state record')

    return Object.keys(override).reduce((c, e) => {
        c[e] = override[e]

        return c
    }, base)
}

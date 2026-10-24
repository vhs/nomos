/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from 'zod'

import { zString } from '@/lib/validators/common'

const zStringRecord = z.record(zString, z.unknown())

type StringRecord = z.infer<typeof zStringRecord>

const isStringRecord = (inp: unknown): inp is StringRecord => zStringRecord.safeParse(inp).success

export const getObjectKeyByPath = (path: string, obj: object): string => {
    const pathKeys = path.split('.')

    return pathKeys.reduce((result, pathKey) => {
        // @ts-expect-error intentional mismatch
        if (isStringRecord(obj)) result = result[pathKey]
        // @ts-expect-error intentional mismatch
        else result = pathKey

        return result
    }, obj) as unknown as string
}

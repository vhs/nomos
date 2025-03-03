import { z } from 'zod'

import { zBoolean, zDateTime, zString } from '@/lib/validators/common'
import { zKey } from '@/lib/validators/records'

export const zApiKeysSchema = z.object({
    key: zString,
    notes: zString,
    expiry: zDateTime
})

export const zApiKeysCreateSchema = z.object({
    notes: zString.min(1)
})

export const zApiKeysScope = z.union([z.literal('system'), z.literal('user')])

export const zScopedApiKeysTerm = z.record(zApiKeysScope, z.string())

export const zApiKeysActiveViewHelp = z.literal('help')
export const zApiKeysActiveViewList = z.literal('list')
export const zApiKeysActiveViewUsage = z.literal('usage')
export const zApiKeysActiveView = z.union([zApiKeysActiveViewHelp, zApiKeysActiveViewList, zApiKeysActiveViewUsage])

export const zParsedApiKeysPath = z.object({
    activeView: zApiKeysActiveView,
    createModal: zBoolean,
    editModal: zBoolean,
    keyId: zKey.shape.id.nullish()
})

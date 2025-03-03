import { z } from 'zod'

import { zBoolean, zDateTime, zString } from '@/lib/validators/common'
import { zKey } from '@/lib/validators/records'

export const zApiKeySchema = z.object({
    key: zString,
    value: zString,
    notes: zString,
    expiry: zDateTime
})

export const zApiKeyCreateSchema = z.object({
    notes: zString.min(1)
})

export const zApiKeysScope = z.union([z.literal('system'), z.literal('user')])

export const zScopedApiKeyTerm = z.record(zApiKeysScope, z.string())

export const zApiKeysActiveViewHelp = z.literal('help')
export const zApiKeysActiveViewList = z.literal('list')
export const zApiKeysActiveViewUsage = z.literal('usage')
export const zApiKeysActiveView = z.union([zApiKeysActiveViewHelp, zApiKeysActiveViewList, zApiKeysActiveViewUsage])

export const zParsedApiKeyPath = z.object({
    activeView: zApiKeysActiveView,
    createModal: zBoolean,
    editModal: zBoolean,
    keyId: zKey.shape.id.nullish()
})

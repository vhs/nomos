import { z } from 'zod'

import { zBoolean } from '@/lib/validators/common'
import { zAppClient } from '@/lib/validators/records'

export const zOAuthPageEditSchema = zAppClient.omit({ id: true })

export const zOAuthPageCreateSchema = zAppClient.omit({ id: true })

export const zOAuthPageScope = z.union([z.literal('system'), z.literal('user')])

export const zScopedOAuthPageTerm = z.record(zOAuthPageScope, z.string())

export const zOAuthPageActiveView = z.union([z.literal(''), z.literal('clients')])

export const zParsedOAuthPagePath = z.object({
    activeView: zOAuthPageActiveView,
    createModal: zBoolean,
    editModal: zBoolean,
    appClientId: zAppClient.shape.id.nullish()
})

import { z } from 'zod'

import { TablePageSchema } from '@/components/05-materials/TablePage/TablePage.schema'

import {
    zBoolean,
    zCoerceNumber,
    zDateTimeString,
    zEmailAddress,
    zHumanName,
    zPasswordInput,
    zString,
    zStringArray,
    zUserActiveStateCode,
    zUsername,
    zUserPin
} from '@/lib/validators/common'

export const zAdminUsersColumns = z.union([
    z.literal('User Name'),
    z.literal('Real Name'),
    z.literal('Email'),
    z.literal('Status'),
    z.literal('Cash'),
    z.literal('Member Since'),
    z.literal('Expiry'),
    z.literal('Last Login')
])

export const zAdminUserField = z.object({
    title: zAdminUsersColumns,
    field: z.union([zString, zStringArray])
})

export const zAdminUserFields = zAdminUserField.array()

export const zAdminUsersFieldStates = z.record(zAdminUsersColumns, zBoolean)

export const zAdminUsersPrimaryFilters = z.union([z.literal('showExpired'), z.literal('showCash')])

export const zAdminUsersPrimaryFilterStates = z.record(zAdminUsersPrimaryFilters, zBoolean)

export const zAdminUsersSecondaryFilters = z.union([
    z.literal('showActive'),
    z.literal('showPending'),
    z.literal('showInactive'),
    z.literal('showBanned')
])

export const zAdminUsersSecondaryFilterStates = z.record(zAdminUsersSecondaryFilters, zBoolean)

export const AdminUsersTablePageSchema = TablePageSchema.extend({
    fieldStates: zAdminUsersFieldStates,
    primaryFilterStates: zAdminUsersPrimaryFilterStates,
    secondaryFilterStates: zAdminUsersSecondaryFilterStates
})

export const AdminUsersEditSchema = z.object({
    user: z.object({
        firstName: zHumanName,
        lastName: zHumanName,
        userName: zUsername,
        userEmail: zEmailAddress,
        paypalEmail: zEmailAddress,
        stripeEmail: zEmailAddress,
        newsletter: zBoolean,
        cashMember: zBoolean,
        userPin: zUserPin,
        memExpire: zDateTimeString,
        memStatus: zUserActiveStateCode,
        memType: zCoerceNumber
    }),
    password: zPasswordInput
})

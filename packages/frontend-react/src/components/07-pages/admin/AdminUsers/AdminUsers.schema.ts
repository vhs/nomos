import { z } from 'zod'

import { zTablePageSchema } from '@/components/05-materials/TablePage/TablePage.schema'

import {
    zBoolean,
    zCoerceNumber,
    zDateTimeString,
    zEmailAddress,
    zHumanName,
    zPasswordField,
    zPasswordInput,
    zString,
    zStringArray,
    zUserActiveStateCode,
    zUsername,
    zUserPin
} from '@/lib/validators/common'

export const zAdminUsersColumns = z.union([
    z.literal('Cash'),
    z.literal('Email'),
    z.literal('Expiry'),
    z.literal('Last Login'),
    z.literal('Member Since'),
    z.literal('Real Name'),
    z.literal('Status'),
    z.literal('User Name')
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

export const zAdminUsersTablePageSchema = zTablePageSchema.extend({
    fieldStates: zAdminUsersFieldStates,
    primaryFilterStates: zAdminUsersPrimaryFilterStates,
    secondaryFilterStates: zAdminUsersSecondaryFilterStates
})

export const zAdminUsersCreateSchema = z.object({
    firstName: zHumanName,
    lastName: zHumanName,
    memType: zCoerceNumber,
    userEmail: zEmailAddress,
    userName: zUsername,
    userPass: zPasswordField
})

export const zAdminUsersEditPasswordSchema = zPasswordInput

export const zAdminUsersEditProfileSchema = z.object({
    cashMember: zBoolean,
    firstName: zHumanName,
    lastName: zHumanName,
    memExpire: zDateTimeString,
    memStatus: zUserActiveStateCode,
    memType: zCoerceNumber,
    newsletter: zBoolean,
    paypalEmail: zEmailAddress,
    stripeEmail: zEmailAddress,
    userEmail: zEmailAddress,
    userName: zUsername,
    userPin: zUserPin.nullish()
})

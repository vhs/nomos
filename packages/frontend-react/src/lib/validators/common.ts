import { z } from 'zod'

export const zBoolean = z.boolean()

export const zDateTime = z.union([z.date(), z.string(), z.number()])

export const zEmailAddress = z.coerce.string().email().min(5)

export const zNonNegativeNumber = z.number().nonnegative()

export const zNumber = z.number()

export const zNumberArray = z.array(zNumber)

export const zPositiveNumber = zNumber.positive()

export const zString = z.string()

export const zUrl = zString.url().nullish()

export const zHumanName = zString.min(1)

export const zNonEmptyStringArray = z.array(zString).min(1)

export const zStringArray = z.array(zString).min(0)

export const zFunctionBoolResultFromStringArraySpread = z.function(z.tuple([]).rest(zString), zBoolean)

export const zHTTPMethods = z.union([
    z.literal('CONNECT'),
    z.literal('DELETE'),
    z.literal('GET'),
    z.literal('HEAD'),
    z.literal('OPTIONS'),
    z.literal('PATCH'),
    z.literal('POST'),
    z.literal('PUT'),
    z.literal('TRACE')
])

export const zIpnValidationStates = z.union([z.literal('VERIFIED'), z.literal('INVALID')])

export const zKeyTypes = z.union([
    z.literal('undefined'),
    z.literal('api'),
    z.literal('rfid'),
    z.literal('pin'),
    z.literal('github'),
    z.literal('google'),
    z.literal('slack')
])

export const zPasswordField = z
    .string()
    .min(8)
    .max(255)
    .refine((password) => /[A-Z]/.test(password), { message: 'Please use at least one uppercase letter.' })
    .refine((password) => /[a-z]/.test(password), { message: 'Please use at least one lowercase letter.' })
    .refine((password) => /[0-9]/.test(password), { message: 'Please use at least one number.' })
    .refine((password) => /[!@#$%^&*]/.test(password), { message: 'Please use at least one special character.' })

export const zPasswordInput = z
    .object({ password1: zPasswordField, password2: zPasswordField })
    .refine((data) => data.password1 === data.password2, { message: "Passwords don't match", path: ['confirmation'] })

export const zMoneyBookers = z.literal('MoneyBookers')
export const zPayPal = z.literal('PayPal')
export const zStripe = z.literal('Stripe')

export const zPaymentProviders = z.union([zPayPal, zMoneyBookers, zStripe])

export const zStateRecord = z.record(zString, zBoolean)

export const zStripePaymentStates = z.union([z.literal('UNKNOWN'), z.literal('VALID')])

export const zUserStateTitleActive = z.literal('Active')

export const zUserStateTitleBanned = z.literal('Banned')

export const zUserStateTitleInactive = z.literal('Inactive')

export const zUserStateTitlePending = z.literal('Pending')

export const zUserActiveStateTitles = z.union([
    zUserStateTitleActive,
    zUserStateTitleBanned,
    zUserStateTitleInactive,
    zUserStateTitlePending
])

export const zUserStateCodeActive = z.literal('y')

export const zUserStateCodeBanned = z.literal('b')

export const zUserStateCodeInactive = z.literal('n')

export const zUserStateCodePending = z.literal('t')

export const zUserActiveStateCodes = z.union([
    zUserStateCodeActive,
    zUserStateCodeBanned,
    zUserStateCodeInactive,
    zUserStateCodePending
])

export const zUserActiveStateType = z.object({ title: zUserStateTitleActive, code: zUserStateCodeActive })

export const zUserBannedStateType = z.object({ title: zUserStateTitleBanned, code: zUserStateCodeBanned })

export const zUserInactiveStateType = z.object({ title: zUserStateTitleInactive, code: zUserStateCodeInactive })

export const zUserPendingStateType = z.object({ title: zUserStateTitlePending, code: zUserStateCodePending })

export const zUserActiveStateDefinition = z.union([
    zUserActiveStateType,
    zUserBannedStateType,
    zUserInactiveStateType,
    zUserPendingStateType
])

export const zUserActiveStates = z.array(zUserActiveStateDefinition)

export const zUsername = zString.min(3)

export const zUserPin = z.coerce.string().regex(/\d{1,4}/)

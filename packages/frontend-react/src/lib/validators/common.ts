import { z } from 'zod'

export const zBoolean = z.boolean()

export const zCoerceNumber = z.coerce.number()

export const zCoerceString = z.coerce.string()

export const zString = z.string()
export const zStrings = zString.array().min(0)
export const zStringRecord = z.record(zString, z.unknown())
export const zStringStringRecord = z.record(zString, zString)

export const zNumber = z.number()

export const zDateTimeFormInput = zString.regex(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/)
export const zDateTimeString = zString.regex(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/)

export const zDateTime = z.union([
    z.literal(''),
    z.date(),
    zString.datetime(),
    zDateTimeFormInput,
    zDateTimeString,
    z.number()
])

export const zEmailAddress = zCoerceString.email().min(5)

export const zNonNegativeNumber = z.number().nonnegative()

export const zNumbers = zNumber.array()

export const zPositiveNumber = zNumber.positive()

export const zUrl = zString.url()

export const zHumanName = zString.min(1)

export const zMinString = zString.min(1)

export const zEmptyOrMinString = z.union([z.literal(''), zMinString])

export const zNonEmptyStrings = zString.array().min(1)

export const zSpreadString = z.tuple([]).rest(zString)

export const zFunctionBoolResultFromStringArraySpread = z.function(z.tuple([]).rest(zString), zBoolean)

export const zHTTPMethod = z.union([
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

export const zIpnValidationState = z.union([z.literal('VERIFIED'), z.literal('INVALID')])

export const zKeyType = z.union([
    z.literal('undefined'),
    z.literal('api'),
    z.literal('rfid'),
    z.literal('pin'),
    z.literal('github'),
    z.literal('google'),
    z.literal('slack')
])

export const zPasswordField = zString
    .min(8)
    .max(255)
    .refine((password) => /[A-Z]/.test(password), { message: 'Please use at least one uppercase letter.' })
    .refine((password) => /[a-z]/.test(password), { message: 'Please use at least one lowercase letter.' })
    .refine((password) => /[0-9!@#$%^&*\\/()-]/.test(password), {
        message: 'Please use at least one number or special character.'
    })

export const zPasswordInput = z
    .object({ password1: zPasswordField, password2: zPasswordField })
    .refine((data) => data.password1 === data.password2, { message: "Passwords don't match", path: ['confirmation'] })

export const zMoneyBookers = z.literal('MoneyBookers')
export const zPayPal = z.literal('PayPal')
export const zStripe = z.literal('Stripe')

export const zPaymentProvider = z.union([zPayPal, zMoneyBookers, zStripe])

export const zBooleanRecord = z.record(zString, zBoolean)

export const zStripePaymentState = z.union([z.literal('UNKNOWN'), z.literal('VALID')])

export const zUserStateTitleActive = z.literal('Active')

export const zUserStateTitleBanned = z.literal('Banned')

export const zUserStateTitleInactive = z.literal('Inactive')

export const zUserStateTitlePending = z.literal('Pending')

export const zUserActiveStateTitle = z.union([
    zUserStateTitleActive,
    zUserStateTitleBanned,
    zUserStateTitleInactive,
    zUserStateTitlePending
])

export const zUserStateCodeActive = z.literal('y')

export const zUserStateCodeBanned = z.literal('b')

export const zUserStateCodeInactive = z.literal('n')

export const zUserStateCodePending = z.literal('t')

export const zUserActiveStateCode = z.union([
    zUserStateCodeActive,
    zUserStateCodeBanned,
    zUserStateCodeInactive,
    zUserStateCodePending
])

export const zUserActiveStateType = z.object({ title: zUserStateTitleActive, code: zUserStateCodeActive })

export const zUserBannedStateType = z.object({ title: zUserStateTitleBanned, code: zUserStateCodeBanned })

export const zUserInactiveStateType = z.object({ title: zUserStateTitleInactive, code: zUserStateCodeInactive })

export const zUserPendingStateType = z.object({ title: zUserStateTitlePending, code: zUserStateCodePending })

export const zUserActiveState = z.union([
    zUserActiveStateType,
    zUserBannedStateType,
    zUserInactiveStateType,
    zUserPendingStateType
])

export const zUserActiveStates = zUserActiveState.array()

export const zUserActiveStatus = z.object({
    y: zUserStateTitleActive,
    n: zUserStateTitleInactive,
    t: zUserStateTitlePending,
    b: zUserStateTitleBanned
})

export const zUsername = zString.min(3)

export const zUserPin = zCoerceString.regex(/\d{1,4}/)

export const zBooleans = zBoolean.array()
export const zCoerceNumbers = zCoerceNumber.array()
export const zCoerceStrings = zCoerceString.array()
export const zStringRecords = zStringRecord.array()
export const zStringStringRecords = zStringStringRecord.array()
export const zDateTimeFormInputs = zDateTimeFormInput.array()
export const zDateTimeStrings = zDateTimeString.array()
export const zDateTimes = zDateTime.array()
export const zEmailAddresss = zEmailAddress.array()
export const zNonNegativeNumbers = zNonNegativeNumber.array()
export const zPositiveNumbers = zPositiveNumber.array()
export const zUrls = zUrl.array()
export const zHumanNames = zHumanName.array()
export const zMinStrings = zMinString.array()
export const zEmptyOrMinStrings = zEmptyOrMinString.array()
export const zSpreadStrings = zSpreadString.array()
export const zFunctionBoolResultFromStringArraySpreads = zFunctionBoolResultFromStringArraySpread.array()
export const zHTTPMethods = zHTTPMethod.array()
export const zIpnValidationStates = zIpnValidationState.array()
export const zKeyTypes = zKeyType.array()
export const zPasswordFields = zPasswordField.array()
export const zPasswordInputs = zPasswordInput.array()
export const zMoneyBookerss = zMoneyBookers.array()
export const zPayPals = zPayPal.array()
export const zStripes = zStripe.array()
export const zPaymentProviders = zPaymentProvider.array()
export const zBooleanRecords = zBooleanRecord.array()
export const zStripePaymentStates = zStripePaymentState.array()
export const zUserStateTitleActives = zUserStateTitleActive.array()
export const zUserStateTitleBanneds = zUserStateTitleBanned.array()
export const zUserStateTitleInactives = zUserStateTitleInactive.array()
export const zUserStateTitlePendings = zUserStateTitlePending.array()
export const zUserActiveStateTitles = zUserActiveStateTitle.array()
export const zUserStateCodeActives = zUserStateCodeActive.array()
export const zUserStateCodeBanneds = zUserStateCodeBanned.array()
export const zUserStateCodeInactives = zUserStateCodeInactive.array()
export const zUserStateCodePendings = zUserStateCodePending.array()
export const zUserActiveStateCodes = zUserActiveStateCode.array()
export const zUserActiveStateTypes = zUserActiveStateType.array()
export const zUserBannedStateTypes = zUserBannedStateType.array()
export const zUserInactiveStateTypes = zUserInactiveStateType.array()
export const zUserPendingStateTypes = zUserPendingStateType.array()
export const zUserActiveStatuses = zUserActiveStatus.array()
export const zUsernames = zUsername.array()
export const zUserPins = zUserPin.array()

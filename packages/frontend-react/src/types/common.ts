import type { z } from 'zod'

import type {
    zBoolean,
    zBooleanRecord,
    zCoerceNumber,
    zCoerceString,
    zDateTime,
    zDateTimeString,
    zEmailAddress,
    zFunctionBoolResultFromStringArraySpread,
    zHTTPMethod,
    zHumanName,
    zIpnValidationState,
    zKeyType,
    zMoneyBookers,
    zNonEmptyStringArray,
    zNonNegativeNumber,
    zNumber,
    zNumberArray,
    zPasswordField,
    zPasswordInput,
    zPayPal,
    zPaymentProvider,
    zPositiveNumber,
    zString,
    zStringArray,
    zStripe,
    zStripePaymentState,
    zUrl,
    zUserActiveState,
    zUserActiveStateCode,
    zUserActiveStateDefinition,
    zUserActiveStateTitle,
    zUserActiveStateType,
    zUserActiveStatus,
    zUserBannedStateType,
    zUserInactiveStateType,
    zUserPendingStateType,
    zUserPin,
    zUserStateCodeActive,
    zUserStateCodeBanned,
    zUserStateCodeInactive,
    zUserStateCodePending,
    zUserStateTitleActive,
    zUserStateTitleBanned,
    zUserStateTitleInactive,
    zUserStateTitlePending,
    zUsername
} from '@/lib/validators/common.ts'

export type Boolean = z.infer<typeof zBoolean>
export type Booleans = Boolean[]
export type BooleanRecord = z.infer<typeof zBooleanRecord>
export type BooleanRecords = BooleanRecord[]
export type CoerceNumber = z.infer<typeof zCoerceNumber>
export type CoerceNumbers = CoerceNumber[]
export type CoerceString = z.infer<typeof zCoerceString>
export type CoerceStrings = CoerceString[]
export type DateTime = z.infer<typeof zDateTime>
export type DateTimes = DateTime[]
export type DateTimeString = z.infer<typeof zDateTimeString>
export type DateTimeStrings = DateTimeString[]
export type EmailAddress = z.infer<typeof zEmailAddress>
export type EmailAddresss = EmailAddress[]
export type FunctionBoolResultFromStringArraySpread = z.infer<typeof zFunctionBoolResultFromStringArraySpread>
export type FunctionBoolResultFromStringArraySpreads = FunctionBoolResultFromStringArraySpread[]
export type HTTPMethod = z.infer<typeof zHTTPMethod>
export type HTTPMethods = HTTPMethod[]
export type HumanName = z.infer<typeof zHumanName>
export type HumanNames = HumanName[]
export type IpnValidationState = z.infer<typeof zIpnValidationState>
export type IpnValidationStates = IpnValidationState[]
export type KeyType = z.infer<typeof zKeyType>
export type KeyTypes = KeyType[]
export type MoneyBookers = z.infer<typeof zMoneyBookers>
export type MoneyBookerss = MoneyBookers[]
export type NonEmptyStringArray = z.infer<typeof zNonEmptyStringArray>
export type NonEmptyStringArrays = NonEmptyStringArray[]
export type NonNegativeNumber = z.infer<typeof zNonNegativeNumber>
export type NonNegativeNumbers = NonNegativeNumber[]
export type Number = z.infer<typeof zNumber>
export type Numbers = Number[]
export type NumberArray = z.infer<typeof zNumberArray>
export type NumberArrays = NumberArray[]
export type PasswordField = z.infer<typeof zPasswordField>
export type PasswordFields = PasswordField[]
export type PasswordInput = z.infer<typeof zPasswordInput>
export type PasswordInputs = PasswordInput[]
export type PayPal = z.infer<typeof zPayPal>
export type PayPals = PayPal[]
export type PaymentProvider = z.infer<typeof zPaymentProvider>
export type PaymentProviders = PaymentProvider[]
export type PositiveNumber = z.infer<typeof zPositiveNumber>
export type PositiveNumbers = PositiveNumber[]
export type String = z.infer<typeof zString>
export type Strings = String[]
export type StringArray = z.infer<typeof zStringArray>
export type StringArrays = StringArray[]
export type Stripe = z.infer<typeof zStripe>
export type Stripes = Stripe[]
export type StripePaymentState = z.infer<typeof zStripePaymentState>
export type StripePaymentStates = StripePaymentState[]
export type Url = z.infer<typeof zUrl>
export type Urls = Url[]
export type UserActiveState = z.infer<typeof zUserActiveState>
export type UserActiveStates = UserActiveState[]
export type UserActiveStateCode = z.infer<typeof zUserActiveStateCode>
export type UserActiveStateCodes = UserActiveStateCode[]
export type UserActiveStateDefinition = z.infer<typeof zUserActiveStateDefinition>
export type UserActiveStateDefinitions = UserActiveStateDefinition[]
export type UserActiveStateTitle = z.infer<typeof zUserActiveStateTitle>
export type UserActiveStateTitles = UserActiveStateTitle[]
export type UserActiveStateType = z.infer<typeof zUserActiveStateType>
export type UserActiveStateTypes = UserActiveStateType[]
export type UserActiveStatus = z.infer<typeof zUserActiveStatus>
export type UserActiveStatuss = UserActiveStatus[]
export type UserBannedStateType = z.infer<typeof zUserBannedStateType>
export type UserBannedStateTypes = UserBannedStateType[]
export type UserInactiveStateType = z.infer<typeof zUserInactiveStateType>
export type UserInactiveStateTypes = UserInactiveStateType[]
export type UserPendingStateType = z.infer<typeof zUserPendingStateType>
export type UserPendingStateTypes = UserPendingStateType[]
export type UserPin = z.infer<typeof zUserPin>
export type UserPins = UserPin[]
export type UserStateCodeActive = z.infer<typeof zUserStateCodeActive>
export type UserStateCodeActives = UserStateCodeActive[]
export type UserStateCodeBanned = z.infer<typeof zUserStateCodeBanned>
export type UserStateCodeBanneds = UserStateCodeBanned[]
export type UserStateCodeInactive = z.infer<typeof zUserStateCodeInactive>
export type UserStateCodeInactives = UserStateCodeInactive[]
export type UserStateCodePending = z.infer<typeof zUserStateCodePending>
export type UserStateCodePendings = UserStateCodePending[]
export type UserStateTitleActive = z.infer<typeof zUserStateTitleActive>
export type UserStateTitleActives = UserStateTitleActive[]
export type UserStateTitleBanned = z.infer<typeof zUserStateTitleBanned>
export type UserStateTitleBanneds = UserStateTitleBanned[]
export type UserStateTitleInactive = z.infer<typeof zUserStateTitleInactive>
export type UserStateTitleInactives = UserStateTitleInactive[]
export type UserStateTitlePending = z.infer<typeof zUserStateTitlePending>
export type UserStateTitlePendings = UserStateTitlePending[]
export type Username = z.infer<typeof zUsername>
export type Usernames = Username[]

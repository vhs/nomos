import type { z } from 'zod'

import type {
    zBoolean,
    zDateTime,
    zEmailAddress,
    zFunctionBoolResultFromStringArraySpread,
    zHTTPMethods,
    zHumanName,
    zIpnValidationStates,
    zKeyTypes,
    zMoneyBookers,
    zNonEmptyStringArray,
    zNonNegativeNumber,
    zNumber,
    zNumberArray,
    zPasswordField,
    zPasswordInput,
    zPayPal,
    zPaymentProviders,
    zPositiveNumber,
    zStateRecord,
    zString,
    zStringArray,
    zStripe,
    zStripePaymentStates,
    zUrl,
    zUserActiveStateCodes,
    zUserActiveStateDefinition,
    zUserActiveStateTitles,
    zUserActiveStateType,
    zUserActiveStates,
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
export type DateTime = z.infer<typeof zDateTime>
export type DateTimes = DateTime[]
export type EmailAddress = z.infer<typeof zEmailAddress>
export type EmailAddresss = EmailAddress[]
export type FunctionBoolResultFromStringArraySpread = z.infer<typeof zFunctionBoolResultFromStringArraySpread>
export type FunctionBoolResultFromStringArraySpreads = FunctionBoolResultFromStringArraySpread[]
export type HTTPMethods = z.infer<typeof zHTTPMethods>
export type HTTPMethodss = HTTPMethods[]
export type HumanName = z.infer<typeof zHumanName>
export type HumanNames = HumanName[]
export type IpnValidationStates = z.infer<typeof zIpnValidationStates>
export type IpnValidationStatess = IpnValidationStates[]
export type KeyTypes = z.infer<typeof zKeyTypes>
export type KeyTypess = KeyTypes[]
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
export type PaymentProviders = z.infer<typeof zPaymentProviders>
export type PaymentProviderss = PaymentProviders[]
export type PositiveNumber = z.infer<typeof zPositiveNumber>
export type PositiveNumbers = PositiveNumber[]
export type StateRecord = z.infer<typeof zStateRecord>
export type StateRecords = StateRecord[]
export type String = z.infer<typeof zString>
export type Strings = String[]
export type StringArray = z.infer<typeof zStringArray>
export type StringArrays = StringArray[]
export type Stripe = z.infer<typeof zStripe>
export type Stripes = Stripe[]
export type StripePaymentStates = z.infer<typeof zStripePaymentStates>
export type StripePaymentStatess = StripePaymentStates[]
export type Url = z.infer<typeof zUrl>
export type Urls = Url[]
export type UserActiveStateCodes = z.infer<typeof zUserActiveStateCodes>
export type UserActiveStateCodess = UserActiveStateCodes[]
export type UserActiveStateDefinition = z.infer<typeof zUserActiveStateDefinition>
export type UserActiveStateDefinitions = UserActiveStateDefinition[]
export type UserActiveStateTitles = z.infer<typeof zUserActiveStateTitles>
export type UserActiveStateTitless = UserActiveStateTitles[]
export type UserActiveStateType = z.infer<typeof zUserActiveStateType>
export type UserActiveStateTypes = UserActiveStateType[]
export type UserActiveStates = z.infer<typeof zUserActiveStates>
export type UserActiveStatess = UserActiveStates[]
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

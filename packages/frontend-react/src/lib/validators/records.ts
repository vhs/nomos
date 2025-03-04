/* eslint-disable @typescript-eslint/naming-convention */
import { z } from 'zod'

import { zIcon } from '@/lib/ui/fontawesome'

import {
    zBoolean,
    zString,
    zStringArray,
    zIpnValidationState,
    zFunctionBoolResultFromStringArraySpread,
    zKeyType,
    zPaymentProvider,
    zUsername,
    zEmailAddress,
    zHumanName,
    zUserActiveStateCode,
    zStripePaymentState,
    zNumber,
    zUrl,
    zHTTPMethod,
    zDateTime,
    zSpreadString
} from './common'

export const zCommon = z.object({ id: zNumber })

export const zDataRecord = zCommon.catchall(z.unknown())

export const UserTrimValues = [
    'id',
    'username',
    'email',
    'fname',
    'lname',
    'membership',
    'created',
    'active',
    'privileges'
]

export const zAccessLog = zCommon.extend({
    key: zString,
    type: zString,
    authorized: zBoolean,
    from_ip: zString,
    time: zDateTime,
    userid: zNumber.nullish()
})

export const zAccessToken = zCommon.extend({
    token: zString,
    expires: zDateTime,
    userid: zNumber,
    appclientid: zNumber
})

export const zAppClient = zCommon.extend({
    secret: zString,
    expires: zDateTime,
    userid: zNumber,
    name: zString,
    description: zString,
    url: zString,
    redirecturi: zString,
    enabled: zBoolean
})

export const zAuthCheckResult = z
    .object({ valid: zBoolean, type: zString.nullish(), privileges: zStringArray.nullish() })
    .catchall(z.unknown())

export const zBasePrivilege = z.object({ name: zString, code: zString })

export const zBasePrivilegesArray = zBasePrivilege.array()

export const zCurrentUser = zCommon.extend({ permissions: zStringArray })

export const zDomain = zCommon.extend({
    name: zString,
    domain: zString,
    event: zString,
    description: zString,
    enabled: zBoolean
})

export const zEmail = zCommon.extend({
    name: zString,
    code: zString,
    subject: zString,
    help: zString,
    body: zString,
    html: zString
})

export const zEmailTemplate = z.object({
    id: zNumber,
    name: zString,
    code: zString,
    subject: zString,
    help: zString,
    body: zString,
    html: zString
})

export const zEvent = zCommon.extend({
    name: zString,
    domain: zString,
    event: zString,
    description: zString,
    enabled: zBoolean
})

export const zGenuineCard = zCommon.extend({
    key: zString,
    created: zDateTime,
    issued: zDateTime,
    active: zBoolean,
    paymentid: zNumber.nullish(),
    userid: zNumber.nullish(),
    owneremail: zString,
    notes: zString
})

export const zIpn = z.object({
    id: zNumber,
    created: zString,
    validation: zIpnValidationState,
    payment_status: zString,
    payment_amount: zString,
    payment_currency: zString,
    payer_email: zString,
    item_name: zString,
    item_number: zString,
    raw: zString
})

export const zIpnRequest = zCommon.extend({
    created: zDateTime,
    validation: zIpnValidationState,
    payment_status: zString,
    payment_amount: zString,
    payment_currency: zString,
    payer_email: zString,
    item_name: zString,
    item_number: zString,
    raw: zString
})

export const zIPrincipal = z.object({
    canGrantAllPermissions: zFunctionBoolResultFromStringArraySpread,
    canGrantAnyPermissions: zFunctionBoolResultFromStringArraySpread,
    getIdentity: z.function().returns(zBoolean),
    hasAllPermissions: zFunctionBoolResultFromStringArraySpread,
    hasAnyPermissions: zFunctionBoolResultFromStringArraySpread,
    isAnon: z.function().returns(zBoolean),
    __toString: z.function().returns(zString)
})

export const zPrivilege = zCommon
    .merge(zBasePrivilege)
    .extend({ description: zString.nullish(), icon: zIcon.nullish(), enabled: zBoolean })

export const zPrivilegesArray = z.array(zPrivilege)

export const zPrivilegesField = z.object({ privileges: zPrivilegesArray.nullish() })

export const zKey = zCommon
    .extend({
        userid: zNumber,
        type: zKeyType,
        key: zString,
        created: zDateTime,
        notes: zString.nullish(),
        expires: zDateTime.nullish(),
        pin: zString.nullish(),
        pinid: zString.nullish()
    })
    .merge(zPrivilegesField)

export const zMembershipPeriodDay = z.literal('D')

export const zMembershipPeriodMonth = z.literal('M')

export const zMembershipPeriodYear = z.literal('Y')

export const zMembershipPeriod = z.union([zMembershipPeriodDay, zMembershipPeriodMonth, zMembershipPeriodYear])

export const zMembershipBaseFields = z.object({
    title: zString,
    code: zString,
    description: zString,
    price: zNumber,
    days: zNumber,
    period: zMembershipPeriod
})

export const zMembership = zCommon
    .merge(zMembershipBaseFields)
    .extend({ trial: zBoolean, recurring: zBoolean, private: zBoolean, active: zBoolean })
    .merge(zPrivilegesField)

export const zMembershipWithId = zMembership.extend({ membershipId: z.coerce.number() })

export const zMetricServiceBaseRangeResult = z.object({ start_range: zString, end_range: zString })

export const zMetricServiceGetCreatedDatesResult = zMetricServiceBaseRangeResult.extend({
    byDowHour: z.record(zString, z.record(zString, zNumber)),
    byMonthDow: z.record(zString, z.record(zString, zNumber))
})

export const zMetricServiceGetMembersResult = zMetricServiceBaseRangeResult.extend({
    created: z.record(zString, zNumber),
    expired: z.record(zString, zNumber),
    total: z.record(zString, zNumber)
})

export const zMetricServiceGroupType = z.union([
    z.literal('day'),
    z.literal('month'),
    z.literal('year'),
    z.literal('all')
])

export const zMetricServiceRevenueResultSet = z.record(
    z.union([zMetricServiceGroupType, zString]),
    z.union([zNumber, z.record(zString, zNumber)])
)

export const zRevenueByMembersType = z.union([
    z.literal('vhs_membership_keyholder'),
    z.literal('vhs_membership_member'),
    z.literal('Donation'),
    z.literal('vhs_card_2015'),
    zString.regex(/^prod_.+/)
])

export const zMetricServiceRevenueByMembership = z.record(zRevenueByMembersType, z.record(zString, zNumber))

export const zMetricServiceGetRevenueResult = zMetricServiceBaseRangeResult.extend({
    grouping: z.union([zMetricServiceRevenueResultSet, z.any().array().length(0)]),
    by_membership: zMetricServiceRevenueByMembership
})

export const zMetricServiceResult = zMetricServiceBaseRangeResult.extend({ start: zNumber, end: zNumber })

export const zMetricServiceValueResult = z.object({ value: z.coerce.number() })

export const zMetricServiceNewKeyholdersResult = zMetricServiceValueResult

export const zMetricServiceNewMembersResult = zMetricServiceResult.merge(zMetricServiceValueResult)

export const zPayment = zCommon.extend({
    txn_id: zString,
    membership_id: zNumber,
    user_id: zNumber,
    payer_email: zString,
    payer_fname: zString,
    payer_lname: zString,
    rate_amount: zString,
    currency: zString,
    date: zDateTime,
    pp: zPaymentProvider,
    ip: zString,
    status: zNumber,
    item_name: zString,
    item_number: zString
})

export const zUser = zCommon.extend({
    username: zUsername,
    password: zString.nullish(),
    membership_id: zNumber,
    mem_expire: zDateTime,
    trial_used: zBoolean,
    email: zEmailAddress,
    fname: zHumanName,
    lname: zHumanName,
    token: zString,
    cookie_id: zString,
    newsletter: zBoolean,
    cash: zBoolean,
    userlevel: zNumber,
    notes: zString.nullish(),
    created: zDateTime,
    lastlogin: zDateTime,
    lastip: zString,
    avatar: zString.nullish(),
    active: zUserActiveStateCode,
    paypal_id: zString,
    payment_email: zString,
    stripe_id: zString,
    stripe_email: zString,
    keys: z.array(zKey),
    privileges: zPrivilegesArray,
    membership: zMembership
})

export const zPrincipalUser = zUser.extend({
    principal: zUser,
    hasPermission: z.function().args(zString).returns(z.boolean())
})

export const zRefreshToken = z.object({
    id: zNumber,
    token: zString,
    expires: zString,
    userid: zNumber,
    appclientid: zNumber
})

export const zStripeEvent = zCommon.extend({
    ts: zDateTime,
    status: zStripePaymentState,
    created: zNumber,
    event_id: zString,
    type: zString,
    object: zString,
    request: zString,
    api_version: zString,
    raw: zString
})

export const zSystemPreference = zCommon
    .extend({ key: zString, value: zString, enabled: zBoolean, notes: zString.nullish() })
    .merge(zPrivilegesField)

export const zMetricServiceTotalKeyHoldersResult = zMetricServiceValueResult
export const zMetricServiceTotalMembersResult = zMetricServiceValueResult

export const zTrimmedAppClientOwner = z
    .object({
        id: zNumber,
        active: zBoolean,
        created: zString,
        email: zEmailAddress,
        expires: zString,
        fname: zHumanName,
        lname: zHumanName,
        membership: zMembership,
        username: zUsername,
        redirecturi: zString,
        url: zUrl
    })
    .merge(zPrivilegesField)

export const zTrimmedAppClient = z.object({
    id: zNumber,
    description: zString,
    enabled: zBoolean,
    expires: zDateTime,
    name: zString,
    owner: zTrimmedAppClientOwner.nullish()
})

export const zTrimmedUser = zUser
    .pick(UserTrimValues.reduce((c, e) => ({ ...c, [e]: true }), {}))
    .extend({ expires: zDateTime })

export const zAnonPrincipal = zCommon.extend({
    canGrantAllPermissions: z.function(zSpreadString, z.literal(false)),
    canGrantAnyPermissions: z.function(zSpreadString, z.literal(false)),
    hasAllPermissions: z.function(zSpreadString, zBoolean),
    hasAnyPermissions: z.function(zSpreadString, zBoolean),
    getIdentity: z.function().returns(z.null()),
    isAnon: z.function().returns(z.literal(true)),
    __toString: z.function().returns(z.literal('anon'))
})

export const zUserPrincipal = zCommon.extend({ permissions: z.array(zString) })

export const zWebHookBaseFields = z.object({
    name: zString,
    description: zString,
    enabled: zBoolean,
    userid: zNumber,
    url: zString,
    translation: zString,
    headers: zString,
    method: zHTTPMethod,
    eventid: zNumber
})

export const zWebHook = zCommon.merge(zWebHookBaseFields)

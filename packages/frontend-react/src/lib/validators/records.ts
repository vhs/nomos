/* eslint-disable @typescript-eslint/naming-convention */
import { z } from 'zod'

import {
    zBoolean,
    zString,
    zStringArray,
    zIpnValidationStates,
    zFunctionBoolResultFromStringArraySpread,
    zKeyTypes,
    zPaymentProviders,
    zUsername,
    zEmailAddress,
    zHumanName,
    zUserActiveStateCodes,
    zStripePaymentStates,
    zNumber,
    zUrl,
    zHTTPMethods,
    zDateTime
} from './common'

export const zCommon = z.object({ id: z.number() })

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
    key: z.string(),
    type: z.string(),
    authorized: z.boolean(),
    from_ip: z.string(),
    time: zDateTime,
    userid: z.number().nullish()
})

export const zAccessToken = zCommon.extend({
    token: z.string(),
    expires: zDateTime,
    userid: z.number(),
    appclientid: z.number()
})

export const zAppClient = zCommon.extend({
    secret: z.string(),
    expires: zDateTime,
    userid: z.number(),
    name: z.string(),
    description: z.string(),
    url: z.string(),
    redirecturi: z.string(),
    enabled: z.boolean()
})

export const zAuthCheckResult = z
    .object({ valid: zBoolean, type: zString.nullish(), privileges: zStringArray.nullish() })
    .catchall(z.unknown())

export const zBasePrivilege = z.object({ name: z.string(), code: z.string() })

export const zCurrentUser = zCommon.extend({ permissions: z.array(z.string()) })

export const zDomain = zCommon.extend({
    name: z.string(),
    domain: z.string(),
    event: z.string(),
    description: z.string(),
    enabled: z.boolean()
})

export const zEmail = zCommon.extend({
    name: z.string(),
    code: z.string(),
    subject: z.string(),
    help: z.string(),
    body: z.string(),
    html: z.string()
})

export const zEmailTemplate = z.object({
    id: z.number(),
    name: z.string(),
    code: z.string(),
    subject: z.string(),
    help: z.string(),
    body: z.string(),
    html: z.string()
})

export const zEvent = zCommon.extend({
    name: z.string(),
    domain: z.string(),
    event: z.string(),
    description: z.string(),
    enabled: z.boolean()
})

export const zGenuineCard = zCommon.extend({
    key: z.string(),
    created: zDateTime,
    issued: zDateTime,
    active: z.boolean(),
    paymentid: z.number().nullish(),
    userid: z.number().nullish(),
    owneremail: z.string(),
    notes: z.string()
})

export const zIpn = z.object({
    id: z.number(),
    created: z.string(),
    validation: zIpnValidationStates,
    payment_status: z.string(),
    payment_amount: z.string(),
    payment_currency: z.string(),
    payer_email: z.string(),
    item_name: z.string(),
    item_number: z.string(),
    raw: z.string()
})

export const zIpnRequest = zCommon.extend({
    created: zDateTime,
    validation: zIpnValidationStates,
    payment_status: z.string(),
    payment_amount: z.string(),
    payment_currency: z.string(),
    payer_email: z.string(),
    item_name: z.string(),
    item_number: z.string(),
    raw: z.string()
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
    .extend({ description: z.string().nullish(), icon: z.string().nullish(), enabled: z.boolean() })

export const zPrivilegesArray = z.array(zPrivilege)

export const zPrivilegesField = z.object({ privileges: zPrivilegesArray.nullish() })

export const zKey = zCommon
    .extend({
        userid: z.number(),
        type: zKeyTypes,
        key: z.string(),
        created: zDateTime,
        notes: z.string().nullish(),
        expires: zDateTime.nullish(),
        pin: z.string().nullish(),
        pinid: z.string().nullish()
    })
    .merge(zPrivilegesField)

export const zMembershipPeriodDay = z.literal('D')

export const zMembershipPeriodMonth = z.literal('M')

export const zMembershipPeriodYear = z.literal('Y')

export const zMembershipPeriod = z.union([zMembershipPeriodDay, zMembershipPeriodMonth, zMembershipPeriodYear])

export const zMembershipBaseFields = z.object({
    title: z.string(),
    code: z.string(),
    description: z.string(),
    price: z.number(),
    days: z.number(),
    period: zMembershipPeriod
})

export const zMembership = zCommon
    .merge(zMembershipBaseFields)
    .extend({ trial: z.boolean(), recurring: z.boolean(), private: z.boolean(), active: z.boolean() })
    .merge(zPrivilegesField)

export const zMembershipWithId = zMembership.extend({ membershipId: z.coerce.number() })

export const zMetricsBaseRangeResult = z.object({ start_range: z.string(), end_range: z.string() })

export const zMetricServiceGetCreatedDatesResult = zMetricsBaseRangeResult.extend({
    byDowHour: z.record(z.string(), z.record(z.string(), z.number())),
    byMonthDow: z.record(z.string(), z.record(z.string(), z.number()))
})

export const zMetricServiceGetMembersResult = zMetricsBaseRangeResult.extend({
    created: z.record(z.string(), z.number()),
    expired: z.record(z.string(), z.number()),
    total: z.record(z.string(), z.number())
})

export const zMetricServiceGroupTypes = z.union([
    z.literal('day'),
    z.literal('month'),
    z.literal('year'),
    z.literal('all')
])

export const zRevenueResultSet = z.record(
    z.union([zMetricServiceGroupTypes, z.string()]),
    z.union([z.number(), z.record(z.string(), z.number())])
)

export const zRevenueByMembersTypes = z.union([
    z.literal('vhs_membership_keyholder'),
    z.literal('vhs_membership_member'),
    z.literal('Donation'),
    z.literal('vhs_card_2015'),
    z.string().regex(/^prod_.+/)
])

export const zRevenueByMembership = z.record(zRevenueByMembersTypes, z.record(z.string(), z.number()))

export const zMetricServiceGetRevenueResult = zMetricsBaseRangeResult.extend({
    grouping: z.union([zRevenueResultSet, z.any().array().length(0)]),
    by_membership: zRevenueByMembership
})

export const zMetricsResult = zMetricsBaseRangeResult.extend({ start: z.number(), end: z.number() })

export const zMetricsValueResult = z.object({ value: z.coerce.number() })

export const zNewKeyholdersResult = zMetricsBaseRangeResult.merge(zMetricsValueResult)

export const zNewMembersResult = zMetricsResult.merge(zMetricsValueResult)

export const zPayment = zCommon.extend({
    txn_id: z.string(),
    membership_id: z.number(),
    user_id: z.number(),
    payer_email: z.string(),
    payer_fname: z.string(),
    payer_lname: z.string(),
    rate_amount: z.string(),
    currency: z.string(),
    date: zDateTime,
    pp: zPaymentProviders,
    ip: z.string(),
    status: z.number(),
    item_name: z.string(),
    item_number: z.string()
})

export const zUser = zCommon.extend({
    username: zUsername,
    password: z.string().nullish(),
    membership_id: z.number(),
    mem_expire: zDateTime,
    trial_used: z.boolean(),
    email: zEmailAddress,
    fname: zHumanName,
    lname: zHumanName,
    token: z.string(),
    cookie_id: z.string(),
    newsletter: z.boolean(),
    cash: z.boolean(),
    userlevel: z.number(),
    notes: z.string().nullish(),
    created: zDateTime,
    lastlogin: zDateTime,
    lastip: z.string(),
    avatar: z.string().nullish(),
    active: zUserActiveStateCodes,
    paypal_id: z.string(),
    payment_email: z.string(),
    stripe_id: z.string(),
    stripe_email: z.string(),
    keys: z.array(zKey),
    privileges: zPrivilegesArray,
    membership: zMembership
})

export const zPrincipalUser = zUser.extend({
    principal: zUser,
    hasPermission: z.function().args(z.string()).returns(z.boolean())
})

export const zRefreshToken = z.object({
    id: z.number(),
    token: z.string(),
    expires: z.string(),
    userid: z.number(),
    appclientid: z.number()
})

export const zStripeEvent = zCommon.extend({
    ts: zDateTime,
    status: zStripePaymentStates,
    created: z.number(),
    event_id: z.string(),
    type: z.string(),
    object: z.string(),
    request: z.string(),
    api_version: z.string(),
    raw: z.string()
})

export const zSystemPreference = zCommon
    .extend({ key: z.string(), value: z.string(), enabled: z.boolean(), notes: z.string().nullish() })
    .merge(zPrivilegesField)

export const zTotalKeyHoldersResult = zMetricsValueResult
export const zTotalMembersResult = zMetricsValueResult
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

export const zUserPrincipal = zCommon.extend({ permissions: z.array(z.string()) })

export const zWebHook = zCommon.extend({
    name: z.string(),
    description: z.string(),
    enabled: z.boolean(),
    userid: z.number(),
    url: z.string(),
    translation: z.string(),
    headers: z.string(),
    method: zHTTPMethods,
    eventid: z.number()
})

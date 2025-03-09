// WARNING:
// This file is automatically generated.
// Do not edit manually.

import type { z } from 'zod'

import type {
    zAccessLog,
    zAccessToken,
    zAnonPrincipal,
    zAppClient,
    zAuthCheckResult,
    zBasePrivilege,
    zBasePrivilegesArray,
    zCommon,
    zCurrentUser,
    zDataRecord,
    zDomain,
    zEmail,
    zEmailTemplate,
    zEvent,
    zGenuineCard,
    zIPrincipal,
    zIpn,
    zIpnRequest,
    zKey,
    zMembership,
    zMembershipBaseFields,
    zMembershipPeriod,
    zMembershipPeriodDay,
    zMembershipPeriodMonth,
    zMembershipPeriodYear,
    zMembershipWithId,
    zMetricServiceBaseRangeResult,
    zMetricServiceGetCreatedDatesResult,
    zMetricServiceGetMembersResult,
    zMetricServiceGetRevenueResult,
    zMetricServiceGroupType,
    zMetricServiceNewKeyholdersResult,
    zMetricServiceNewMembersResult,
    zMetricServiceResult,
    zMetricServiceRevenueByMembership,
    zMetricServiceRevenueResultSet,
    zMetricServiceTotalKeyHoldersResult,
    zMetricServiceTotalMembersResult,
    zMetricServiceValueResult,
    zPayment,
    zPrincipalUser,
    zPrivilege,
    zPrivilegesArray,
    zPrivilegesField,
    zRefreshToken,
    zRevenueByMembersType,
    zStripeEvent,
    zSystemPreference,
    zTrimmedAppClient,
    zTrimmedAppClientOwner,
    zTrimmedUser,
    zUser,
    zUserPrincipal,
    zWebHook,
    zWebHookBaseFields
} from '@/lib/validators/records.ts'

export type AccessLog = z.infer<typeof zAccessLog>
export type AccessLogs = AccessLog[]

export type AccessToken = z.infer<typeof zAccessToken>
export type AccessTokens = AccessToken[]

export type AnonPrincipal = z.infer<typeof zAnonPrincipal>
export type AnonPrincipals = AnonPrincipal[]

export type AppClient = z.infer<typeof zAppClient>
export type AppClients = AppClient[]

export type AuthCheckResult = z.infer<typeof zAuthCheckResult>
export type AuthCheckResults = AuthCheckResult[]

export type BasePrivilege = z.infer<typeof zBasePrivilege>
export type BasePrivileges = BasePrivilege[]

export type BasePrivilegesArray = z.infer<typeof zBasePrivilegesArray>
export type BasePrivilegesArrays = BasePrivilegesArray[]

export type Common = z.infer<typeof zCommon>
export type Commons = Common[]

export type CurrentUser = z.infer<typeof zCurrentUser>
export type CurrentUsers = CurrentUser[]

export type DataRecord = z.infer<typeof zDataRecord>
export type DataRecords = DataRecord[]

export type Domain = z.infer<typeof zDomain>
export type Domains = Domain[]

export type Email = z.infer<typeof zEmail>
export type Emails = Email[]

export type EmailTemplate = z.infer<typeof zEmailTemplate>
export type EmailTemplates = EmailTemplate[]

export type Event = z.infer<typeof zEvent>
export type Events = Event[]

export type GenuineCard = z.infer<typeof zGenuineCard>
export type GenuineCards = GenuineCard[]

export type IPrincipal = z.infer<typeof zIPrincipal>
export type IPrincipals = IPrincipal[]

export type Ipn = z.infer<typeof zIpn>
export type Ipns = Ipn[]

export type IpnRequest = z.infer<typeof zIpnRequest>
export type IpnRequests = IpnRequest[]

export type Key = z.infer<typeof zKey>
export type Keys = Key[]

export type Membership = z.infer<typeof zMembership>
export type Memberships = Membership[]

export type MembershipBaseFields = z.infer<typeof zMembershipBaseFields>

export type MembershipPeriod = z.infer<typeof zMembershipPeriod>
export type MembershipPeriods = MembershipPeriod[]

export type MembershipPeriodDay = z.infer<typeof zMembershipPeriodDay>
export type MembershipPeriodDays = MembershipPeriodDay[]

export type MembershipPeriodMonth = z.infer<typeof zMembershipPeriodMonth>
export type MembershipPeriodMonths = MembershipPeriodMonth[]

export type MembershipPeriodYear = z.infer<typeof zMembershipPeriodYear>
export type MembershipPeriodYears = MembershipPeriodYear[]

export type MembershipWithId = z.infer<typeof zMembershipWithId>
export type MembershipWithIds = MembershipWithId[]

export type MetricServiceBaseRangeResult = z.infer<typeof zMetricServiceBaseRangeResult>
export type MetricServiceBaseRangeResults = MetricServiceBaseRangeResult[]

export type MetricServiceGetCreatedDatesResult = z.infer<typeof zMetricServiceGetCreatedDatesResult>
export type MetricServiceGetCreatedDatesResults = MetricServiceGetCreatedDatesResult[]

export type MetricServiceGetMembersResult = z.infer<typeof zMetricServiceGetMembersResult>
export type MetricServiceGetMembersResults = MetricServiceGetMembersResult[]

export type MetricServiceGetRevenueResult = z.infer<typeof zMetricServiceGetRevenueResult>
export type MetricServiceGetRevenueResults = MetricServiceGetRevenueResult[]

export type MetricServiceGroupType = z.infer<typeof zMetricServiceGroupType>
export type MetricServiceGroupTypes = MetricServiceGroupType[]

export type MetricServiceNewKeyholdersResult = z.infer<typeof zMetricServiceNewKeyholdersResult>
export type MetricServiceNewKeyholdersResults = MetricServiceNewKeyholdersResult[]

export type MetricServiceNewMembersResult = z.infer<typeof zMetricServiceNewMembersResult>
export type MetricServiceNewMembersResults = MetricServiceNewMembersResult[]

export type MetricServiceResult = z.infer<typeof zMetricServiceResult>
export type MetricServiceResults = MetricServiceResult[]

export type MetricServiceRevenueByMembership = z.infer<typeof zMetricServiceRevenueByMembership>
export type MetricServiceRevenueByMemberships = MetricServiceRevenueByMembership[]

export type MetricServiceRevenueResultSet = z.infer<typeof zMetricServiceRevenueResultSet>
export type MetricServiceRevenueResultSets = MetricServiceRevenueResultSet[]

export type MetricServiceTotalKeyHoldersResult = z.infer<typeof zMetricServiceTotalKeyHoldersResult>
export type MetricServiceTotalKeyHoldersResults = MetricServiceTotalKeyHoldersResult[]

export type MetricServiceTotalMembersResult = z.infer<typeof zMetricServiceTotalMembersResult>
export type MetricServiceTotalMembersResults = MetricServiceTotalMembersResult[]

export type MetricServiceValueResult = z.infer<typeof zMetricServiceValueResult>
export type MetricServiceValueResults = MetricServiceValueResult[]

export type Payment = z.infer<typeof zPayment>
export type Payments = Payment[]

export type PrincipalUser = z.infer<typeof zPrincipalUser>
export type PrincipalUsers = PrincipalUser[]

export type Privilege = z.infer<typeof zPrivilege>
export type Privileges = Privilege[]

export type PrivilegesArray = z.infer<typeof zPrivilegesArray>
export type PrivilegesArrays = PrivilegesArray[]

export type PrivilegesField = z.infer<typeof zPrivilegesField>
export type PrivilegesFields = PrivilegesField[]

export type RefreshToken = z.infer<typeof zRefreshToken>
export type RefreshTokens = RefreshToken[]

export type RevenueByMembersType = z.infer<typeof zRevenueByMembersType>
export type RevenueByMembersTypes = RevenueByMembersType[]

export type StripeEvent = z.infer<typeof zStripeEvent>
export type StripeEvents = StripeEvent[]

export type SystemPreference = z.infer<typeof zSystemPreference>
export type SystemPreferences = SystemPreference[]

export type TrimmedAppClient = z.infer<typeof zTrimmedAppClient>
export type TrimmedAppClients = TrimmedAppClient[]

export type TrimmedAppClientOwner = z.infer<typeof zTrimmedAppClientOwner>
export type TrimmedAppClientOwners = TrimmedAppClientOwner[]

export type TrimmedUser = z.infer<typeof zTrimmedUser>
export type TrimmedUsers = TrimmedUser[]

export type User = z.infer<typeof zUser>
export type Users = User[]

export type UserPrincipal = z.infer<typeof zUserPrincipal>
export type UserPrincipals = UserPrincipal[]

export type WebHook = z.infer<typeof zWebHook>
export type WebHooks = WebHook[]

export type WebHookBaseFields = z.infer<typeof zWebHookBaseFields>

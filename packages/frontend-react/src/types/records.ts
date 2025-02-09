import type { z } from 'zod'

import type {
    zAccessLog,
    zAccessToken,
    zAppClient,
    zAuthCheckResult,
    zBasePrivilege,
    zCommon,
    zCurrentUser,
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
    zMetricServiceGetCreatedDatesResult,
    zMetricServiceGetMembersResult,
    zMetricServiceGetRevenueResult,
    zMetricServiceGroupTypes,
    zMetricsBaseRangeResult,
    zMetricsResult,
    zMetricsValueResult,
    zNewKeyholdersResult,
    zNewMembersResult,
    zPayment,
    zPrincipalUser,
    zPrivilege,
    zPrivilegesArray,
    zPrivilegesField,
    zRefreshToken,
    zRevenueByMembersTypes,
    zRevenueByMembership,
    zRevenueResultSet,
    zStripeEvent,
    zSystemPreference,
    zTotalKeyHoldersResult,
    zTotalMembersResult,
    zTrimmedAppClient,
    zTrimmedAppClientOwner,
    zTrimmedUser,
    zUser,
    zUserPrincipal,
    zWebHook
} from '@/lib/validators/records.ts'

export type AccessLog = z.infer<typeof zAccessLog>
export type AccessLogs = AccessLog[]
export type AccessToken = z.infer<typeof zAccessToken>
export type AccessTokens = AccessToken[]
export type AppClient = z.infer<typeof zAppClient>
export type AppClients = AppClient[]
export type AuthCheckResult = z.infer<typeof zAuthCheckResult>
export type AuthCheckResults = AuthCheckResult[]
export type BasePrivilege = z.infer<typeof zBasePrivilege>
export type BasePrivileges = BasePrivilege[]
export type Common = z.infer<typeof zCommon>
export type Commons = Common[]
export type CurrentUser = z.infer<typeof zCurrentUser>
export type CurrentUsers = CurrentUser[]
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
export type MembershipBaseFieldss = MembershipBaseFields[]
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
export type MetricServiceGetCreatedDatesResult = z.infer<typeof zMetricServiceGetCreatedDatesResult>
export type MetricServiceGetCreatedDatesResults = MetricServiceGetCreatedDatesResult[]
export type MetricServiceGetMembersResult = z.infer<typeof zMetricServiceGetMembersResult>
export type MetricServiceGetMembersResults = MetricServiceGetMembersResult[]
export type MetricServiceGetRevenueResult = z.infer<typeof zMetricServiceGetRevenueResult>
export type MetricServiceGetRevenueResults = MetricServiceGetRevenueResult[]
export type MetricServiceGroupTypes = z.infer<typeof zMetricServiceGroupTypes>
export type MetricServiceGroupTypess = MetricServiceGroupTypes[]
export type MetricsBaseRangeResult = z.infer<typeof zMetricsBaseRangeResult>
export type MetricsBaseRangeResults = MetricsBaseRangeResult[]
export type MetricsResult = z.infer<typeof zMetricsResult>
export type MetricsResults = MetricsResult[]
export type MetricsValueResult = z.infer<typeof zMetricsValueResult>
export type MetricsValueResults = MetricsValueResult[]
export type NewKeyholdersResult = z.infer<typeof zNewKeyholdersResult>
export type NewKeyholdersResults = NewKeyholdersResult[]
export type NewMembersResult = z.infer<typeof zNewMembersResult>
export type NewMembersResults = NewMembersResult[]
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
export type RevenueByMembersTypes = z.infer<typeof zRevenueByMembersTypes>
export type RevenueByMembersTypess = RevenueByMembersTypes[]
export type RevenueByMembership = z.infer<typeof zRevenueByMembership>
export type RevenueByMemberships = RevenueByMembership[]
export type RevenueResultSet = z.infer<typeof zRevenueResultSet>
export type RevenueResultSets = RevenueResultSet[]
export type StripeEvent = z.infer<typeof zStripeEvent>
export type StripeEvents = StripeEvent[]
export type SystemPreference = z.infer<typeof zSystemPreference>
export type SystemPreferences = SystemPreference[]
export type TotalKeyHoldersResult = z.infer<typeof zTotalKeyHoldersResult>
export type TotalKeyHoldersResults = TotalKeyHoldersResult[]
export type TotalMembersResult = z.infer<typeof zTotalMembersResult>
export type TotalMembersResults = TotalMembersResult[]
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

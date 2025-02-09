import type { FC, ReactNode } from 'react'

import type { KeyedMutator } from 'swr'

import type { Filter } from '@/types/query-filters'

export type ValidServiceEndpoints =
    | 'ApiKeyService2'
    | 'AuthService2'
    | 'EmailService2'
    | 'EventService2'
    | 'IpnService2'
    | 'KeyService2'
    | 'MemberCardService2'
    | 'MembershipService2'
    | 'MetricService2'
    | 'PaymentService2'
    | 'PinService2'
    | 'PreferenceService2'
    | 'PrivilegeService2'
    | 'StripeEventService2'
    | 'SystemPreferenceService2'
    | 'UserService2'
    | 'WebHookService2'
    | 'MockService2'
    | 'TemplateNameService2'

interface IdentifiableRecord {
    id: number
    [key: string]: unknown
}

export interface MockServiceData extends IdentifiableRecord {
    color: string
}

export interface FilterDefinition {
    id?: string
    label: string
    filter: Filter
}

export interface FieldDefinition {
    title: string
    field: string | string[]
    hidden?: boolean
}

export type FieldDefinitions = FieldDefinition[]

export interface TablePageProps {
    children?: ReactNode
    title: string
    label: string
    serviceEndpoint: ValidServiceEndpoints
    baseServiceMethod: string
    user?: boolean
    fields: FieldDefinition[]
    order: string | string[]

    component: FC<{ data: object; mutate: KeyedMutator<object[]> }>
    filters?: FilterDefinition[]
    secondaryFilters?: FilterDefinition[]
    actions?: ReactNode[]
    unsafeSearchColumns?: string[]
}

export type FiltersState = Record<string, boolean>

export interface TablePageContextDefinition<T = object> {
    mutate: KeyedMutator<T[]>
}

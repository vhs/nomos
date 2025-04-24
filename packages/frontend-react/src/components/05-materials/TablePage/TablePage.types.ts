import type { ReactNode, FC } from 'react'

import type { TablePageSchema, AllowedPageSizes, TablePageSchemaType } from './TablePage.schema'
import type { KeyedMutator } from 'swr'

import type { FieldDefinitions, FilterDefinitions, Filters } from '@/lib/db/utils/query-filters'

import type { DataRecord } from '@/types/validators/records'

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
    | 'OAuthService2'
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

export interface TablePageContextDefinition<T = DataRecord> {
    mutate: KeyedMutator<T[]>
}

export interface TablePageDefaults {
    searchPage: TablePageSchema['search']['page']
    searchPageSize: TablePageSchema['search']['pageSize']
    allowedPageSizes: AllowedPageSizes[]
}

export interface TablePageProps {
    children?: ReactNode
    title: string
    label: string
    serviceEndpoint: ValidServiceEndpoints
    baseServiceMethod: string
    user?: boolean
    fields: FieldDefinitions
    order: string | string[]
    embedded?: boolean

    component: FC<{ data: DataRecord; mutate: KeyedMutator<DataRecord[]> }>
    defaultFilters?: Filters
    primaryFilters?: FilterDefinitions
    secondaryFilters?: FilterDefinitions
    actions?: ReactNode[]
    unsafeSearchColumns?: string[]

    schema?: TablePageSchemaType
}

import type { Filter } from './query-filters'

export interface PagedApiRequestParams {
    page?: number
    size?: number
    columns?: string
    order?: string
    search: string | null
    filters?: Filter
}

export interface PageUserApiRequestParams extends PagedApiRequestParams {
    userid?: number | string
}

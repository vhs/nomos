import type { Filter } from '../lib/db/utils/query-filters'

export type BackendResult<T> = Promise<T | string | null>

export type NOMOSResponse<T extends object = object> = Response & T
export type NOMOSSWRResponse<T extends object = object> = T | string | null | undefined

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

export interface ServiceResponseSuccess {
    success: true
    msg: 'success'
}

export interface ServiceResponseError {
    success: false
    msg: string
}

export type ServiceResponse = ServiceResponseSuccess | ServiceResponseError

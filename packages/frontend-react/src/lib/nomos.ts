import type { Filter } from '@/lib/db/utils/query-filters'

import type { UserActiveState } from '@/types/validators/common'

// const addRightmost = function (filter: QueryFilter, val: QueryFilter) {
//     if (isQueryFilterComp(filter) && filter.right == null) filter.right = val
//     if (isQueryFilterComp(filter) && filter.right != null) addRightmost(filter.right, val)
// }

interface CompileFilterArgs {
    filters: Filter[]
    fields: string[]
    defaultOperator?: 'and' | 'or'
    search?: string
}

const hasValidFilters = (filters: Filter[]): boolean =>
    Object.values(filters)
        .map((e) => Object.keys(e).length > 0)
        .filter(Boolean).length > 0

export const compileFilter = ({ filters, fields, defaultOperator, search }: CompileFilterArgs): Filter | null => {
    defaultOperator ??= 'and'

    if (filters.length === 0 && search === '') return null

    const localFilters: Filter[] = hasValidFilters(filters) ? structuredClone(filters) : []

    if (search != null && search !== '') {
        const val = '%' + search + '%'

        localFilters.push(
            // TODO make this ts-expect-error go away
            // @ts-expect-error mismatch
            fields.reduceRight<Filter>((c, e, i, a) => {
                if (i === a.length - 1)
                    return { left: null, operator: 'or', right: { column: e, operator: 'like', value: val } }
                else if (i === a.length - 2) return { ...c, left: { column: e, operator: 'like', value: val } }
                else return { left: { column: e, operator: 'like', value: val }, operator: 'or', right: c }
            }, {})
        )
    }

    if (localFilters.length === 1) return localFilters[0]

    // TODO make this ts-expect-error go away
    // @ts-expect-error mismatch
    return localFilters.reduceRight((c, f, i, a) => {
        if (i === a.length - 1) return { left: null, operator: defaultOperator, right: f }
        else if (i === a.length - 2) return { ...c, left: f }
        else return { left: f, operator: defaultOperator, right: c }
    }, {})
}

export const convertUserStatus = (statuses: UserActiveState | null | undefined, code: string): string => {
    if (statuses == null) throw new Error('Undefined status codes')

    const result = statuses.find((status) => status.code === code)

    if (result == null) throw new Error('Invalid or missing user status code')

    return result.title
}

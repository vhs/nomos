import type { Filter } from '@/lib/db/utils/query-filters'

export const filterMockData = (
    data: Array<Record<string, unknown>>,
    filter: Filter
): Array<Record<string, unknown>> => {
    if (filter.operator !== '=') throw new Error('Only use the = operator for testing')

    return data.filter((e) => e[filter.column] === filter.value)
}

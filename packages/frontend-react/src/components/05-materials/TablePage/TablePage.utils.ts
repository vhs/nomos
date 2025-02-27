import type { TablePageDefaults } from './TablePage.types'

import type { BooleanRecord } from '@/types/common'
import type { FieldDefinitions, FilterDefinitions, Filters } from '@/types/query-filters'

import { type AllowedPageSizes, zAllowedPageSizes } from './TablePage.schema'

export const tablePageDefaults: TablePageDefaults = {
    searchPage: 1,
    searchPageSize: 10,
    allowedPageSizes: [10, 20, 50, 100, 1000, 10000]
}

export const getMergedFieldNames = (fields: FieldDefinitions, excludeColumns?: string[]): string[] =>
    fields
        .reduce<string[]>((collector, field) => {
            if (Array.isArray(field.field)) collector.push(...field.field)
            else collector.push(field.field)

            return collector
        }, [])
        .filter((e) => e !== 'id')
        .filter((e) => !(excludeColumns ?? []).includes(e))

export const getEnabledFieldsLabels = (fieldStates: Record<string, boolean>): string[] =>
    Object.entries(fieldStates)
        .filter(([_, v]) => v)
        .map(([k]) => k)

export const getAllowedPageSizes = (): AllowedPageSizes[] => zAllowedPageSizes.options.map((o) => o.value)

export const compileActiveFilters = (filters: FilterDefinitions, filterStates: BooleanRecord): Filters => {
    return (filters ?? []).filter((filter) => filterStates[filter.id] ?? false).map((filter) => filter.filter)
}

import type { FieldDefinitions, FilterDefinition } from './TablePage.types'

export const tablePageDefaults = {
    searchPage: 1,
    searchPageSize: 10,
    allowedPageSizes: [10, 20, 50, 100, 1000, 10000]
}

export const getFilterId = (filter: FilterDefinition): string => filter.id ?? filter.label

export const getMergedFieldNames = (fields: FieldDefinitions, excludeColumns?: string[]): string[] =>
    fields
        .reduce<string[]>((collector, field) => {
            if (Array.isArray(field.field)) collector.push(...field.field)
            else collector.push(field.field)

            return collector
        }, [])
        .filter((e) => e !== 'id')
        .filter((e) => !(excludeColumns ?? []).includes(e))

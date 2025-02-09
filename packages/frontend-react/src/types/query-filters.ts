export type QueryFilterLogicalOperators = 'and' | 'or'

export type QueryFilterValueOperators = '=' | '!=' | '>' | '<' | '>=' | '<=' | 'like' | 'is null' | 'is not null'

export interface QueryFilterObject {
    column: string
    operator: string
    value: unknown
}

export interface QueryFilterComp {
    left: QueryFilterObject | QueryFilterComp
    operator: QueryFilterLogicalOperators
    right: QueryFilterObject | QueryFilterComp | null
}

export type Filter = QueryFilterObject | QueryFilterComp

export const isQueryFilterComp = (inp?: unknown): inp is QueryFilterComp => {
    return (
        inp != null &&
        typeof inp === 'object' &&
        !Array.isArray(inp) &&
        Object.keys(inp).includes('left') &&
        Object.keys(inp).includes('operator') &&
        Object.keys(inp).includes('right')
    )
}

export const isQueryFilterObject = (inp?: unknown): inp is QueryFilterObject => {
    return (
        inp != null &&
        typeof inp === 'object' &&
        !Array.isArray(inp) &&
        Object.keys(inp).includes('column') &&
        Object.keys(inp).includes('operator') &&
        Object.keys(inp).includes('value')
    )
}

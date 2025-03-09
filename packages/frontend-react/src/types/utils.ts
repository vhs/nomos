import type { JSX } from 'react'

export type ArrayElement<T> = T extends Array<infer U> ? U : never

export type CastReactElement<K extends keyof JSX.IntrinsicElements> = JSX.IntrinsicElements[K]

export type MappedArray<T extends readonly string[]> = {
    [K in keyof T]: T[K]
}

export type OrEmptyString<T> = T | ''

export type SingleOrArray<T> = T | T[]

export type WithoutId<T> = Omit<T, 'id'>

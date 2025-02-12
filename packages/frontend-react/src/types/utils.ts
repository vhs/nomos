import type { JSX } from 'react'

export type ArrayElement<T> = T extends Array<infer U> ? U : never

export type SingleOrArray<T> = T | T[]

export type CastReactElement<K extends keyof JSX.IntrinsicElements> = JSX.IntrinsicElements[K]

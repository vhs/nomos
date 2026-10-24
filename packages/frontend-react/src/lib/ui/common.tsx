import type { ActionDispatch, Dispatch, SetStateAction } from 'react'

export const hydrateState = <T = unknown,>(value: T | undefined | null, updater: Dispatch<SetStateAction<T>>): void => {
    if (value != null) updater(value)
}

export const hydrateReducer = <T = unknown,>(value: T | undefined | null, updater: ActionDispatch<[T]>): void => {
    if (value != null) updater(value)
}

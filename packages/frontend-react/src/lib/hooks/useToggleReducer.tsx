import { type ActionDispatch, useMemo, useReducer } from 'react'

import type { BooleanRecord } from '@/types/validators/common'

export interface ResetBooleanRecordAction {
    action: 'reset'
    value?: never
}

export interface SetAllBooleanRecordAction {
    action: 'set-all'
    value?: never
}

export interface SetBooleanRecordAction {
    action: 'set'
    value: string
}

export interface ToggleBooleanRecordAction {
    action: 'toggle'
    value: string
}

export interface UnsetAllBooleanRecordAction {
    action: 'unset-all'
    value?: never
}

export interface UnsetBooleanRecordAction {
    action: 'unset'
    value: string
}

export interface UpdateDefaultsBooleanRecordAction {
    action: 'update-defaults'
    value: BooleanRecord
}

export type BooleanRecordMutationArg =
    | ResetBooleanRecordAction
    | SetAllBooleanRecordAction
    | SetBooleanRecordAction
    | ToggleBooleanRecordAction
    | UnsetAllBooleanRecordAction
    | UnsetBooleanRecordAction
    | UpdateDefaultsBooleanRecordAction

interface BooleanRecordStore {
    state: BooleanRecord
    isDirty: boolean
    defaultValues: BooleanRecord
}

export interface BooleanRecordReducerHook {
    state: BooleanRecord
    dispatch: ActionDispatch<[BooleanRecordMutationArg]>
    isDirty: boolean
}

export const booleanStateRecordStoreReducer = (
    store: BooleanRecordStore,
    ...mutations: BooleanRecordMutationArg[]
): BooleanRecordStore => {
    const updateStore = structuredClone(store)

    for (const mutation of mutations) {
        const { action, value } = mutation

        switch (action) {
            case 'reset': {
                updateStore.state = structuredClone(store.defaultValues)

                updateStore.isDirty = false

                break
            }
            case 'set-all': {
                let dirties = 0

                Object.keys(updateStore.state).forEach((e) => {
                    updateStore.state = { ...updateStore.state, [e]: true }

                    if (updateStore.state[e] !== updateStore.defaultValues[e]) dirties++
                })

                updateStore.isDirty = dirties > 0

                break
            }
            case 'set': {
                if (typeof value !== 'string') throw new Error('Invalid toggle value')

                updateStore.state = { ...updateStore.state, [value]: true }

                updateStore.isDirty = updateStore.state[value] !== updateStore.defaultValues[value]

                break
            }
            case 'toggle': {
                if (typeof value !== 'string') throw new Error('Invalid toggle value')

                updateStore.state = { ...updateStore.state, [value]: !updateStore.state[value] }

                updateStore.isDirty = updateStore.state[value] !== updateStore.defaultValues[value]

                break
            }
            case 'unset-all': {
                let dirties = 0

                Object.keys(updateStore).forEach((e) => {
                    updateStore.state = { ...updateStore.state, [e]: false }

                    if (updateStore.state[e] !== updateStore.defaultValues[e]) dirties++
                })

                updateStore.isDirty = dirties > 0

                break
            }
            case 'unset': {
                if (typeof value !== 'string') throw new Error('Invalid toggle value')

                updateStore.state = { ...updateStore.state, [value]: false }

                updateStore.isDirty = updateStore.state[value] !== updateStore.defaultValues[value]

                break
            }
            case 'update-defaults': {
                updateStore.defaultValues = value

                break
            }
            default:
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                throw new Error(`Unknown action: ${action}`)
        }
    }

    return updateStore
}

const generateInitialStore = (defaultBooleanRecord?: BooleanRecord): BooleanRecordStore => ({
    state: defaultBooleanRecord ?? {},
    isDirty: false,
    defaultValues: defaultBooleanRecord ?? {}
})

const useToggleReducer = (defaultBooleanRecord?: BooleanRecord): BooleanRecordReducerHook => {
    const [booleanRecordStore, dispatchBooleanRecord] = useReducer<BooleanRecordStore, [BooleanRecordMutationArg]>(
        booleanStateRecordStoreReducer,
        defaultBooleanRecord,
        // @ts-expect-error unexpected third arg - typedef sucks
        generateInitialStore
    )

    const reducerObj = useMemo(() => {
        const { state, isDirty } = booleanRecordStore

        return { state, dispatch: dispatchBooleanRecord, isDirty }
    }, [booleanRecordStore])

    return reducerObj
}

export default useToggleReducer

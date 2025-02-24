/* eslint-disable @typescript-eslint/no-loop-func */
import { type ActionDispatch, type Dispatch, type SetStateAction, useCallback, useReducer, useState } from 'react'

import { convertStringArrayToBooleanRecord } from '@/lib/utils'

import type { BooleanRecord } from '@/types/common'

export interface RefreshBooleanRecordAction {
    action: 'refresh'
    value: BooleanRecord
}

export interface ReplaceAllBooleanRecordAction {
    action: 'replace'
    value: string[]
}

export interface ResetBooleanRecordAction {
    action: 'reset'
    value: never
}

export interface SetAllBooleanRecordAction {
    action: 'set-all'
    value?: never
}

export interface SetBooleanRecordAction {
    action: 'set'
    value?: string
}

export interface ToggleBooleanRecordAction {
    action: 'toggle'
    value?: string
}

export interface UnsetAllBooleanRecordAction {
    action: 'unset-all'
    value?: never
}

export interface UnsetBooleanRecordAction {
    action: 'unset'
    value: string
}

export type BooleanRecordMutationArg =
    | RefreshBooleanRecordAction
    | ReplaceAllBooleanRecordAction
    | ResetBooleanRecordAction
    | SetAllBooleanRecordAction
    | SetBooleanRecordAction
    | ToggleBooleanRecordAction
    | UnsetAllBooleanRecordAction
    | UnsetBooleanRecordAction

export type BooleanRecordReducerHook = [BooleanRecord, ActionDispatch<[BooleanRecordMutationArg]>]

export const booleanStateRecordReducer = (
    state: BooleanRecord,
    ...mutations: BooleanRecordMutationArg[]
): BooleanRecord => {
    let updateState = structuredClone(state)

    for (const mutation of mutations) {
        const { action, value } = mutation

        switch (action) {
            case 'refresh':
                updateState = value
                break
            case 'replace':
                updateState = convertStringArrayToBooleanRecord(value)
                break
            case 'set-all':
                Object.keys(updateState).forEach((e) => {
                    updateState[e] = true
                })
                break
            case 'set':
                if (typeof value !== 'string') throw new Error('Invalid toggle value')
                updateState[value] = true
                break
            case 'toggle':
                if (typeof value !== 'string') throw new Error('Invalid toggle value')
                updateState[value] = !updateState[value]
                break
            case 'unset-all':
                Object.keys(updateState).forEach((e) => {
                    updateState[e] = false
                })
                break
            case 'unset':
                if (typeof value !== 'string') throw new Error('Invalid toggle value')
                updateState[value] = false
                break
            default:
                throw new Error('Unknown action')
        }
    }

    return updateState
}

const generateInitialState = (defaultBooleanRecord?: BooleanRecord): BooleanRecord => defaultBooleanRecord ?? {}

const useToggleReducer = (
    defaultBooleanRecord?: BooleanRecord
): [
    BooleanRecord,
    ActionDispatch<[BooleanRecordMutationArg]>,
    boolean,
    Dispatch<SetStateAction<BooleanRecord | undefined>>
] => {
    const [isDirty, setDirty] = useState(false)
    const [defaultState, updateDefaults] = useState<BooleanRecord | undefined>(defaultBooleanRecord)

    const [booleanRecord, dispatchBooleanRecord] = useReducer<BooleanRecord, [BooleanRecordMutationArg]>(
        booleanStateRecordReducer,
        defaultBooleanRecord,
        // @ts-expect-error unexpected third arg - typedef sucks
        generateInitialState
    )

    const dispatchBooleanRecordWrapper = useCallback(
        (m: BooleanRecordMutationArg) => {
            if (m.action === 'reset' && defaultState != null) {
                m = {
                    action: 'refresh',
                    value: defaultState
                }
                setDirty(false)
            } else {
                setDirty(true)
            }

            dispatchBooleanRecord(m)
        },
        [defaultState]
    )

    return [booleanRecord, dispatchBooleanRecordWrapper, isDirty, updateDefaults]
}

export default useToggleReducer

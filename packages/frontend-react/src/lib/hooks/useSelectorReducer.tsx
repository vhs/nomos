import { type ActionDispatch, useReducer } from 'react'

import type { PrivilegeCodes } from '@/types/common'

export interface PrivilegeCodesAddAction {
    action: 'add'
    value: string
}

export interface PrivilegeCodesRemoveAction {
    action: 'remove'
    value: string
}

export interface PrivilegeCodesReplaceAction {
    action: 'replace'
    value: PrivilegeCodes
}

export type PrivilegeCodesMutationArg =
    | PrivilegeCodesAddAction
    | PrivilegeCodesRemoveAction
    | PrivilegeCodesReplaceAction

export type PrivilegesReducerHook = [PrivilegeCodes, ActionDispatch<[PrivilegeCodesMutationArg]>]

export interface PrivilegesReducerState {
    privileges: PrivilegeCodes
}

export const privilegesReducer = (
    state: PrivilegesReducerState,
    ...mutations: PrivilegeCodesMutationArg[]
): PrivilegesReducerState => {
    const updateState = structuredClone(state)

    for (const mutation of mutations) {
        const { action, value } = mutation

        switch (action) {
            case 'add':
                if (!updateState.privileges.includes(value)) updateState.privileges.push(value)
                break
            case 'remove':
                if (updateState.privileges.includes(value))
                    updateState.privileges.splice(updateState.privileges.indexOf(value), 1)
                break
            case 'replace':
                updateState.privileges = value
                break
            default:
                throw new Error('Unknown action')
        }
    }

    return updateState
}

const generateInitialState = (defaultPrivileges?: PrivilegeCodes): PrivilegesReducerState => ({
    privileges: defaultPrivileges ?? []
})

export const usePrivilegeCodesReducer = (
    defaultPrivileges?: PrivilegeCodes
): [PrivilegesReducerState, ActionDispatch<[PrivilegeCodesMutationArg]>] => {
    const [userPrivileges, dispatchUserPrivileges] = useReducer<PrivilegesReducerState, [PrivilegeCodesMutationArg]>(
        privilegesReducer,
        generateInitialState(defaultPrivileges)
    )

    return [userPrivileges, dispatchUserPrivileges]
}

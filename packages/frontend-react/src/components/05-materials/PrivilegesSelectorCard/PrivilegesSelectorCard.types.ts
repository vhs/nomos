import type { PrivilegeCodesMutationArg, PrivilegesReducerState } from '@/lib/hooks/usePrivilegeCodesReducer'

import type { BasePrivileges } from '@/types/records'

export interface PrivilegesSelectorCardProps {
    className?: string
    onUpdate: (mutation: PrivilegeCodesMutationArg) => void
    availablePrivileges?: BasePrivileges
    value?: PrivilegesReducerState
}

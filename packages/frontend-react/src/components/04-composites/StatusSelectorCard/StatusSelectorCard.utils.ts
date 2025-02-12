import type { UserActiveStateCodes, UserActiveStateTitles } from '@/types/common'

export const statuses: Record<UserActiveStateCodes, UserActiveStateTitles> = {
    y: 'Active',
    n: 'Inactive',
    t: 'Pending',
    b: 'Banned'
}

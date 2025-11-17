import type { Meta, StoryObj } from '@storybook/react'

import useToggleReducer from '@/lib/hooks/useToggleReducer'
import { convertPrivilegesArrayToBooleanRecord } from '@/lib/utils'

import PrivilegesSelectorCard from './PrivilegesSelectorCard'

type StoryType = StoryObj<typeof PrivilegesSelectorCard>

const meta: Meta<typeof PrivilegesSelectorCard> = {
    component: ({ customPrivileges, onUpdate, selected: value, ...restProps }) => {
        const { state: privileges, dispatch: dispatchPrivileges } = useToggleReducer(
            convertPrivilegesArrayToBooleanRecord(customPrivileges, false)
        )

        return (
            <PrivilegesSelectorCard
                customPrivileges={customPrivileges}
                onUpdate={({ privilege, state }): void => {
                    dispatchPrivileges({ action: state ? 'set' : 'unset', value: privilege })
                }}
                selected={privileges}
                {...restProps}
            />
        )
    },
    title: '04-Composites/PrivilegesSelectorCard'
}

export default meta

export const Default: StoryType = {
    args: {
        customPrivileges: [
            { name: 'Privilege1', code: 'privilege1' },
            { name: 'Privilege2', code: 'privilege2' }
        ],
        onUpdate: (mutation) => {
            console.debug(mutation)
        }
    }
}

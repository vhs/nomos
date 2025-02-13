import type { Meta, StoryObj } from '@storybook/react'

import { type PrivilegeCodesMutationArg, usePrivilegeCodesReducer } from '@/lib/hooks/useSelectorReducer'

import PrivilegesSelectorCard from './PrivilegesSelectorCard'

type StoryType = StoryObj<typeof PrivilegesSelectorCard>

const meta: Meta<typeof PrivilegesSelectorCard> = {
    component: ({ availablePrivileges, onUpdate, value, ...restProps }) => {
        const [privilegesState, dispatchPrivileges] = usePrivilegeCodesReducer(
            availablePrivileges?.slice(0, 1).map((p) => p.code)
        )

        return (
            <PrivilegesSelectorCard
                onUpdate={(mutation: PrivilegeCodesMutationArg): void => {
                    dispatchPrivileges(mutation)
                }}
                availablePrivileges={availablePrivileges}
                value={privilegesState}
                {...restProps}
            />
        )
    },
    title: '05-Materials/PrivilegesSelectorCard'
}

export default meta

export const Default: StoryType = {
    args: {
        availablePrivileges: [
            { name: 'Privilege1', code: 'privilege1' },
            { name: 'Privilege2', code: 'privilege2' }
        ],
        onUpdate: (mutation) => {
            console.log(mutation)
        }
    }
}

import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { CenteredContentStorybookDecorator } from '@/lib/ui/storybook'

import type { UserActiveStateCodes } from '@/types/common'

import StatusSelectorCard from './StatusSelectorCard'

type StoryType = StoryObj<typeof StatusSelectorCard>

const meta: Meta<typeof StatusSelectorCard> = {
    component: () => {
        const [status, setStatus] = useState<UserActiveStateCodes>('t')

        return (
            <StatusSelectorCard
                onUpdate={(code: UserActiveStateCodes) => {
                    setStatus(code)
                }}
                value={status}
            />
        )
    },
    title: '04-Composites/StatusSelectorCard',
    decorators: [CenteredContentStorybookDecorator]
}

export default meta

export const Default: StoryType = {}

import type { Meta, StoryObj } from '@storybook/react'

import { CenteredContentStorybookDecorator } from '@/lib/ui/storybook'

import Pill from './Pill'

type StoryType = StoryObj<typeof Pill>

const meta: Meta<typeof Pill> = {
    component: Pill,
    title: '01-Atoms/Pill',
    decorators: [CenteredContentStorybookDecorator]
}

export default meta

export const Default: StoryType = {
    args: {
        children: 'Pill'
    }
}

import type { Meta, StoryObj } from '@storybook/react'

import { CenteredContentStorybookDecorator } from '@/lib/ui/storybook'

import CreateUserButton from './CreateUserButton'

type StoryType = StoryObj<typeof CreateUserButton>

const meta: Meta<typeof CreateUserButton> = {
    component: CreateUserButton,
    title: '01-Atoms/CreateUserButton',
    decorators: [CenteredContentStorybookDecorator]
}

export default meta

export const Default: StoryType = {
    args: {
        children: 'CreateUserButton'
    }
}

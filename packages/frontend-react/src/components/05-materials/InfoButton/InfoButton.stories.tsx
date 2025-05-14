import type { Meta, StoryObj } from '@storybook/react'

import { CenteredContentStorybookDecorator } from '@/lib/ui/storybook'

import InfoButton from './InfoButton'

type StoryType = StoryObj<typeof InfoButton>

const meta: Meta<typeof InfoButton> = {
    component: InfoButton,
    title: '05-Materials/InfoButton',
    decorators: [CenteredContentStorybookDecorator]
}

export default meta

export const Default: StoryType = {
    args: {
        title: '05-Materials/InfoButton',
        children: 'InfoButton'
    }
}

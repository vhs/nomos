import type { Meta, StoryObj } from '@storybook/react'

// import { mockHandlers } from '@/lib/mocking/handlers'

import { CenteredContentStorybookDecorator } from '@/lib/ui/storybook'

import Loading from './Loading'

type StoryType = StoryObj<typeof Loading>

const meta: Meta<typeof Loading> = {
    component: Loading,
    title: '02-Molecules/Loading',
    decorators: [CenteredContentStorybookDecorator]
}

export default meta

export const Default: StoryType = {
    args: {
        children: 'Loading'
    }
}

import type { Meta, StoryObj } from '@storybook/react'

import { CenteredContentStorybookDecorator } from '@/lib/ui/storybook/common'

import FontAwesomeIcon from './FontAwesomeIcon'

type StoryType = StoryObj<typeof FontAwesomeIcon>

const meta: Meta<typeof FontAwesomeIcon> = {
    component: FontAwesomeIcon,
    title: '01-Atoms/FontAwesomeIcon',
    decorators: [CenteredContentStorybookDecorator]
}

export default meta

export const Default: StoryType = {
    args: {
        category: 'brand',
        icon: 'facebook',
        className: 'text-blue-500',
        size: '5x'
    }
}

import type { Meta, StoryObj } from '@storybook/react'

import { CenteredContentStorybookDecorator } from '@/lib/ui/storybook'

import PrivilegeIcon from './PrivilegeIcon'

type StoryType = StoryObj<typeof PrivilegeIcon>

const meta: Meta<typeof PrivilegeIcon> = {
    component: PrivilegeIcon,
    title: '02-Molecules/PrivilegeIcon',
    decorators: [CenteredContentStorybookDecorator]
}

export default meta

export const Default: StoryType = {
    args: {
        icon: 'key'
    }
}

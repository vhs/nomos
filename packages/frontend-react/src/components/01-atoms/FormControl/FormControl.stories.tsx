import type { Meta, StoryObj } from '@storybook/react'

import { CenteredContentStorybookDecorator } from '@/lib/ui/storybook'

import FormControl from './FormControl'

type StoryType = StoryObj<typeof FormControl>

const meta: Meta<typeof FormControl> = {
    component: FormControl,
    title: '01-Atoms/FormControl',
    decorators: [CenteredContentStorybookDecorator]
}

export default meta

export const Default: StoryType = {
    args: { formType: 'text' }
}

export const PreContent: StoryType = {
    args: {
        formType: 'email',
        preContent: '@'
    }
}

export const PinInput: StoryType = {
    args: {
        formType: 'number',
        preContent: '0000'
    }
}

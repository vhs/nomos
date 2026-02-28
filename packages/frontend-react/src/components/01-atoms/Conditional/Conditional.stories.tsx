import type { JSX } from 'react'

import { CenteredContentStorybookDecorator } from '@/lib/ui/storybook/common'

import Conditional from './Conditional'

export default {
    title: '01-Atoms/Conditional',
    decorators: [CenteredContentStorybookDecorator]
}

export const Disabled = (): JSX.Element => <Conditional condition={false}>Disabled</Conditional>

Disabled.storyName = 'disabled'

export const Enabled = (): JSX.Element => <Conditional condition={true}>Enabled</Conditional>

Enabled.storyName = 'enabled'

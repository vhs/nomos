import type { Meta, StoryObj } from '@storybook/react'

import Col from '@/components/01-atoms/Col/Col'
import Row from '@/components/01-atoms/Row/Row'

import { CenteredContentStorybookDecorator } from '@/lib/ui/storybook/common'

import AccountStatusBadge from './AccountStatusBadge'

type StoryType = StoryObj<typeof AccountStatusBadge>

const meta: Meta<typeof AccountStatusBadge> = {
    component: AccountStatusBadge,
    title: '01-Atoms/AccountStatusBadge',
    decorators: [CenteredContentStorybookDecorator]
}

export default meta

export const Default: StoryType = {
    render: () => (
        <>
            <Row className='spacious'>
                <Col>
                    <AccountStatusBadge className='inline' status='Active' /> Active
                </Col>
            </Row>
            <Row className='spacious'>
                <Col>
                    <AccountStatusBadge className='inline' status='Banned' /> Banned
                </Col>
            </Row>
            <Row className='spacious'>
                <Col>
                    <AccountStatusBadge className='inline' status='Inactive' /> Inactive
                </Col>
            </Row>
            <Row className='spacious'>
                <Col>
                    <AccountStatusBadge className='inline' status='Pending' /> Pending
                </Col>
            </Row>
            <Row className='spacious'>
                <Col>
                    <AccountStatusBadge className='inline' status='Unknown' /> Unknown
                </Col>
            </Row>
        </>
    )
}

export const Active: StoryType = {
    args: {
        status: 'Active'
    }
}

export const Banned: StoryType = {
    args: {
        status: 'Banned'
    }
}

export const Inactive: StoryType = {
    args: {
        status: 'Inactive'
    }
}

export const Pending: StoryType = {
    args: {
        status: 'Pending'
    }
}

export const Unknown: StoryType = {
    args: {
        status: 'Unknown'
    }
}

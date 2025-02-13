import type { ButtonProps } from './Button.types'
import type { Meta, StoryObj } from '@storybook/react'

import Col from '@/components/01-atoms/Col/Col'
import Row from '@/components/01-atoms/Row/Row'

import { CenteredContentStorybookDecorator } from '@/lib/ui/storybook/common'

import Button from './Button'

type StoryType = StoryObj<typeof Button>

const meta: Meta<typeof Button> = {
    title: '01-Atoms/Button',
    component: Button,
    decorators: [CenteredContentStorybookDecorator<ButtonProps>]
}

export default meta

export const Default: StoryType = {
    render: () => (
        <>
            <Row className='spacious'>
                <Col>
                    <Button variant='primary'>Primary</Button>
                </Col>
            </Row>
            <Row className='spacious'>
                <Col>
                    <Button variant='secondary'>Secondary</Button>
                </Col>
            </Row>
            <Row className='spacious'>
                <Col>
                    <Button variant='success'>Success</Button>
                </Col>
            </Row>
            <Row className='spacious'>
                <Col>
                    <Button variant='warning'>Warning</Button>
                </Col>
            </Row>
            <Row className='spacious'>
                <Col>
                    <Button variant='danger'>Danger</Button>
                </Col>
            </Row>
            <Row className='spacious'>
                <Col>
                    <Button variant='info'>Info</Button>
                </Col>
            </Row>
            <Row className='spacious'>
                <Col>
                    <Button variant='light'>Light</Button>
                </Col>
            </Row>
            <Row className='spacious'>
                <Col>
                    <Button variant='dark'>Dark</Button>
                </Col>
            </Row>
            <Row className='spacious'>
                <Col>
                    <Button variant='link'>Link</Button>
                </Col>
            </Row>
        </>
    )
}

export const Primary: StoryType = { args: { variant: 'primary', children: 'Primary' } }
export const Secondary: StoryType = { args: { variant: 'secondary', children: 'Secondary' } }
export const Success: StoryType = { args: { variant: 'success', children: 'Success' } }
export const Warning: StoryType = { args: { variant: 'warning', children: 'Warning' } }
export const Danger: StoryType = { args: { variant: 'danger', children: 'Danger' } }
export const Info: StoryType = { args: { variant: 'info', children: 'Info' } }
export const Light: StoryType = { args: { variant: 'light', children: 'Light' } }
export const Dark: StoryType = { args: { variant: 'dark', children: 'Dark' } }
export const Link: StoryType = { args: { variant: 'link', children: 'Link' } }

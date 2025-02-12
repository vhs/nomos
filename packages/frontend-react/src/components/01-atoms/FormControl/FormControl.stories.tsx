import type { Meta, StoryObj } from '@storybook/react'

import Col from '../Col/Col'
import Row from '../Row/Row'

import FormControl from './FormControl'

type StoryType = StoryObj<typeof FormControl>

const meta: Meta<typeof FormControl> = {
    component: FormControl,
    title: '01-Atoms/FormControl',
    decorators: [
        (Story) => (
            <Row>
                <Col></Col>
                <Col className='basis-1/5'>
                    <Story />
                </Col>
                <Col></Col>
            </Row>
        )
    ]
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

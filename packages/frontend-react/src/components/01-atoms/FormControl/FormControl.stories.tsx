import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { CenteredContentStorybookDecorator } from '@/lib/ui/storybook'

import Col from '../Col/Col'
import Row from '../Row/Row'

import FormControl from './FormControl'

type StoryType = StoryObj<typeof FormControl>

const meta: Meta<typeof FormControl> = {
    component: FormControl,
    title: '01-Atoms/FormControl',
    decorators: [CenteredContentStorybookDecorator]
}

export default meta

export const Default: StoryType = {
    render: () => {
        const [field1, setField1] = useState('')
        const [field2, setField2] = useState('')
        const [field3, setField3] = useState('password')
        const [field4, setField4] = useState('user@example.com')
        const [field5, setField5] = useState('1234')
        const [field6, setField6] = useState('1234')
        const [field7, setField7] = useState('')
        const [field8, setField8] = useState('')

        return (
            <>
                <Row className='spacious'>
                    <Col>
                        <h2 className='text-left'>Unspecified</h2>
                    </Col>
                </Row>
                <Row className='spacious'>
                    <Col>
                        <FormControl
                            onChange={(change) => {
                                setField1(change)
                            }}
                            placeholder='field1'
                            value={field1}
                        />
                    </Col>
                </Row>

                <Row className='spacious'>
                    <Col>
                        <h2 className='text-left'>Text</h2>
                    </Col>
                </Row>
                <Row className='spacious'>
                    <Col>
                        <FormControl
                            formType='text'
                            onChange={(change) => {
                                setField2(change)
                            }}
                            placeholder='field2'
                            value={field2}
                        />
                    </Col>
                </Row>

                <Row className='spacious'>
                    <Col>
                        <h2 className='text-left'>Text with Reset</h2>
                    </Col>
                </Row>
                <Row className='spacious'>
                    <Col>
                        <FormControl
                            onChange={(change) => {
                                setField2(change)
                            }}
                            placeholder='field2'
                            reset={() => {
                                setField2('')
                            }}
                            value={field2}
                        />
                    </Col>
                </Row>

                <Row className='spacious'>
                    <Col>
                        <h2 className='text-left'>Password</h2>
                    </Col>
                </Row>
                <Row className='spacious'>
                    <Col>
                        <FormControl
                            formType='password'
                            onChange={(change) => {
                                setField3(change)
                            }}
                            placeholder='password'
                            value={field3}
                        />
                    </Col>
                </Row>

                <Row className='spacious'>
                    <Col>
                        <h2 className='text-left'>Email</h2>
                    </Col>
                </Row>
                <Row className='spacious'>
                    <Col>
                        <FormControl
                            formType='email'
                            preContent='@'
                            onChange={(change) => {
                                setField4(change)
                            }}
                            placeholder='user@example.com'
                            value={field4}
                        />
                    </Col>
                </Row>

                <Row className='spacious'>
                    <Col>
                        <h2 className='text-left'>Number</h2>
                    </Col>
                </Row>
                <Row className='spacious'>
                    <Col>
                        <FormControl
                            formType='number'
                            maxLength={4}
                            size={4}
                            onChange={(change) => {
                                setField5(change)
                            }}
                            placeholder='0000'
                            value={field5}
                        />
                    </Col>
                </Row>

                <Row className='spacious'>
                    <Col>
                        <h2 className='text-left'>Pin</h2>
                    </Col>
                </Row>
                <Row className='spacious'>
                    <Col>
                        <FormControl
                            formType='pin'
                            preContent='0000'
                            maxLength={4}
                            size={4}
                            onChange={(change) => {
                                if (/\d{1,4}/.test(change)) setField6(change)
                            }}
                            placeholder='0000'
                            value={field6}
                        />
                    </Col>
                </Row>

                <Row className='spacious'>
                    <Col>
                        <h2 className='text-left'>Dropdown</h2>
                    </Col>
                </Row>
                <Row className='spacious'>
                    <Col>
                        <FormControl
                            formType='dropdown'
                            options={['option1', 'option2', 'option3', 'option4']}
                            onChange={(change) => {
                                setField7(change)
                            }}
                            value={field7}
                        />
                    </Col>
                </Row>

                <Row className='spacious'>
                    <Col>
                        <h2 className='text-left'>Text Area</h2>
                    </Col>
                </Row>
                <Row className='spacious'>
                    <Col>
                        <FormControl
                            formType='textarea'
                            ariaPlaceholder='text area'
                            placeholder='text area'
                            onChange={(change) => {
                                setField8(change)
                            }}
                            value={field8}
                        />
                    </Col>
                </Row>
            </>
        )
    }
}

export const Normal: StoryType = {
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

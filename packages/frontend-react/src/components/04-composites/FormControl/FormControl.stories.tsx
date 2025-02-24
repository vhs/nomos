import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm, type UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

import type { Meta, StoryObj } from '@storybook/react'

import { CenteredContentStorybookDecorator } from '@/lib/ui/storybook'
import { zEmailAddress, zPasswordField, zString, zUserPin } from '@/lib/validators/common'

import Col from '../../01-atoms/Col/Col'
import FontAwesomeIcon from '../../01-atoms/FontAwesomeIcon/FontAwesomeIcon'
import Row from '../../01-atoms/Row/Row'

import FormControl from './FormControl'

type StoryType = StoryObj<typeof FormControl>

const meta: Meta<typeof FormControl> = {
    component: FormControl,
    title: '01-Atoms/FormControl',
    decorators: [CenteredContentStorybookDecorator]
}

export default meta

const FormControlStorySchema = z.object({
    field1: zString,
    field2: zString,
    field3: zString,
    field4: zString,
    field5: zPasswordField,
    field6: zEmailAddress,
    field7: zEmailAddress,
    field8: zUserPin,
    field9: zUserPin,
    field10: zUserPin,
    field11: z.union([z.literal('option1'), z.literal('option2'), z.literal('option3'), z.literal('option4')]),
    field12: zString
})

type FormControlStoryForm = z.infer<typeof FormControlStorySchema>

const FormControlStoryDefaultValues: FormControlStoryForm = {
    field1: '',
    field2: '',
    field3: '',
    field4: '',
    field5: 'password',
    field6: 'user@example.com',
    field7: 'user@example.com',
    field8: '1234',
    field9: '1234',
    field10: '1234',
    field11: 'option1',
    field12: 'text area'
}

const useStoryForm = (): UseFormReturn<FormControlStoryForm> => {
    return useForm<FormControlStoryForm>({
        resolver: zodResolver(FormControlStorySchema),
        mode: 'onChange',
        defaultValues: FormControlStoryDefaultValues
    })
}

export const Default: StoryType = {
    render: () => {
        const form = useStoryForm()

        return (
            <FormProvider {...form}>
                <Row className='spacious'>
                    <Col>
                        <h2 className='text-left'>Unspecified</h2>
                    </Col>
                </Row>
                <Row className='spacious'>
                    <Col>
                        <FormControl id='field1' placeholder='field1' />
                    </Col>
                </Row>

                <Row className='spacious'>
                    <Col>
                        <h2 className='text-left'>Disabled</h2>
                    </Col>
                </Row>
                <Row className='spacious'>
                    <Col>
                        <FormControl id='field2' disabled value={'disabled'} placeholder='field2' />
                    </Col>
                </Row>

                <Row className='spacious'>
                    <Col>
                        <h2 className='text-left'>Text</h2>
                    </Col>
                </Row>
                <Row className='spacious'>
                    <Col>
                        <FormControl id='field3' formType='text' placeholder='field3' />
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
                            id='field4'
                            placeholder='field4'
                            reset={() => {
                                // form.setValue('field4', '')
                            }}
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
                        <FormControl id='field5' formType='password' placeholder='password' />
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
                            id='field6'
                            formType='email'
                            preContent={<FontAwesomeIcon icon='at' />}
                            placeholder='user@example.com'
                        />
                    </Col>
                </Row>

                <Row className='spacious'>
                    <Col>
                        <h2 className='text-left'>Email with Info Button</h2>
                    </Col>
                </Row>
                <Row className='spacious'>
                    <Col>
                        <FormControl
                            id='field7'
                            formType='email'
                            preContent={<FontAwesomeIcon icon='at' />}
                            placeholder='user@example.com'
                            infoButton={{
                                title: 'Info Title',
                                children: 'Info Content'
                            }}
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
                        <FormControl id='field8' formType='number' maxLength={4} size={4} placeholder='0000' />
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
                            id='field9'
                            formType='pin'
                            preContent='0000'
                            maxLength={4}
                            size={4}
                            placeholder='0000'
                        />
                    </Col>
                </Row>

                <Row className='spacious'>
                    <Col>
                        <h2 className='text-left'>Pin with Info Button</h2>
                    </Col>
                </Row>
                <Row className='spacious'>
                    <Col>
                        <FormControl
                            id='field10'
                            formType='pin'
                            preContent='0000'
                            maxLength={4}
                            size={4}
                            placeholder='0000'
                            infoButton={{ title: 'Info Title', children: 'Info Content' }}
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
                            id='field11'
                            formType='dropdown'
                            options={['option1', 'option2', 'option3', 'option4']}
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
                            id='field12'
                            formType='textarea'
                            aria-placeholder='text area'
                            placeholder='text area'
                        />
                    </Col>
                </Row>
            </FormProvider>
        )
    }
}

export const Normal: StoryType = {
    args: { id: 'field3', formType: 'text' }
}

export const PinWithInfoButton: StoryType = {
    render: () => {
        const form = useStoryForm()

        return (
            <FormProvider {...form}>
                <Row>
                    <Col className='find-me text-center'>
                        <FormControl
                            id='field10'
                            formType='pin'
                            preContent='0000'
                            maxLength={4}
                            size={4}
                            placeholder='0000'
                            infoButton={{ title: 'Info Title', children: 'Info Content' }}
                        />
                    </Col>
                </Row>
            </FormProvider>
        )
    }
}

export const PreContent: StoryType = {
    args: {
        id: 'field6',
        formType: 'email',
        preContent: <FontAwesomeIcon icon='at' />
    }
}

export const PinInput: StoryType = {
    args: {
        id: 'field8',
        formType: 'number',
        preContent: '0000'
    }
}

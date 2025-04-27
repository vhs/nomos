import { useEffect, useMemo, useState, type FC } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import PacmanLoader from 'react-spinners/PacmanLoader'
import { toast } from 'react-toastify'

import type { GetInvolvedProps } from './GetInvolved.types'
import type { z } from 'zod'

import Button from '@/components/01-atoms/Button/Button'
import Col from '@/components/01-atoms/Col/Col'
import Conditional from '@/components/01-atoms/Conditional/Conditional'
import Row from '@/components/01-atoms/Row/Row'
import FormRow from '@/components/02-molecules/FormRow/FormRow'
import Loading from '@/components/02-molecules/Loading/Loading'
import Card from '@/components/04-composites/Card/Card'
import FormControl from '@/components/04-composites/FormControl/FormControl'
import BasePage from '@/components/05-materials/BasePage/BasePage'

import useAuth from '@/lib/hooks/useAuth'
import UserService2 from '@/lib/providers/UserService2'

import { GetInvolvedSchema } from './GetInvolved.guard'
import { parseSlackInviteResultStatus } from './GetInvolved.utils'

const GetInvolved: FC<GetInvolvedProps> = () => {
    const { currentUser } = useAuth()

    const [response, setResponse] = useState('')
    const [sending, setSending] = useState<boolean>(false)

    const form = useForm<z.infer<typeof GetInvolvedSchema>>({
        resolver: zodResolver(GetInvolvedSchema),
        mode: 'onChange',
        defaultValues: {
            slackInvitationAddress: currentUser?.email
        }
    })

    const errors = useMemo(() => form.formState.errors, [form.formState.errors])
    const isValid = useMemo(() => form.formState.isValid, [form.formState.isValid])

    const sendSlackInvitation = async (): Promise<void> => {
        if (!isValid) {
            toast.error('Invalid email address')
            return
        }

        setSending(true)

        const result = await UserService2.getInstance().RequestSlackInvite(form.getValues('slackInvitationAddress'))

        setSending(false)
        setResponse(parseSlackInviteResultStatus(result))
    }

    useEffect(() => {
        if (currentUser != null)
            form.setValue('slackInvitationAddress', currentUser.email, { shouldValidate: true, shouldDirty: true })
    }, [currentUser, form])

    if (currentUser == null) return <Loading />

    return (
        <BasePage title='Get Involved!'>
            <FormProvider {...form}>
                <Row>
                    <Col>
                        <p className='spacious'>Great, here&apos;s how you can help</p>
                        <h3 className='spacious'>Source Code</h3>
                        <p className='spacious'>The code for this web app (Nomos) is located on Github: </p>
                        <p className='spacious'>
                            <a href='https://github.com/vhs/nomos'>https://github.com/vhs/nomos</a>
                        </p>

                        <h3 className='spacious'>Development</h3>

                        <p className='spacious'>
                            Check the <a href='https://github.com/vhs/nomos/wiki'>Project GitHub wiki</a> for
                            instructions on how to get started. Nomos testing is done with a Vagrant file that
                            automagically sets up a test VM with the proper settings.
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h3>Slack</h3>
                        To coordinate development, get on #vhs-nomos on Slack (a kind of web-based IRC). If you would
                        like to request an invite to Slack:
                    </Col>
                </Row>
                <Row>
                    <Col className='basis-full'>
                        <Card>
                            <Card.Header>Request Slack Invitation</Card.Header>
                            <Card.Body>
                                <Conditional condition={sending}>
                                    <Row className='spacious vertical-align icon-align-center text-center'>
                                        <Col className='basis-full'>
                                            <div className='mx-auto'>
                                                <PacmanLoader />
                                            </div>
                                        </Col>
                                    </Row>
                                </Conditional>
                                <Conditional condition={!sending}>
                                    <Conditional condition={response !== ''}>
                                        <Row>
                                            <Col>{response}</Col>
                                        </Row>
                                    </Conditional>
                                    <FormRow error={errors.slackInvitationAddress}>
                                        <Col>
                                            <div className='flex flex-row'>
                                                <FormControl
                                                    className='w-available'
                                                    formKey='slackInvitationAddress'
                                                    formType='text'
                                                />
                                                <Button
                                                    className='ml-2 h-8'
                                                    onClick={() => {
                                                        void sendSlackInvitation()
                                                    }}
                                                    disabled={!isValid}
                                                >
                                                    Send
                                                </Button>
                                            </div>
                                            <div className='ml-2 h-8'>
                                                <Conditional condition={errors.slackInvitationAddress != null}>
                                                    <span className='font-bold text-warning'>
                                                        {errors.slackInvitationAddress?.message}
                                                    </span>
                                                </Conditional>
                                            </div>
                                        </Col>
                                    </FormRow>
                                </Conditional>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </FormProvider>
        </BasePage>
    )
}
export default GetInvolved

import { useMemo, type FC } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { mutate } from 'swr'

import type { RegisterGenuineCardForm } from '../MemberCards.types'
import type { RegisterGenuineCardProps } from './RegisterGenuineCard.types'

import Row from '@/components/01-atoms/Row/Row'
import Button from '@/components/02-molecules/Button/Button'
import Card from '@/components/03-particles/Card/Card'
import FormControl from '@/components/03-particles/FormControl/FormControl'

import MemberCardService2 from '@/lib/providers/MemberCardService2'

import { zRegisterGenuineCardForm } from '../MemberCards.schema'

const RegisterGenuineCard: FC<RegisterGenuineCardProps> = () => {
    const form = useForm<RegisterGenuineCardForm>({
        resolver: zodResolver(zRegisterGenuineCardForm),
        mode: 'onChange'
    })

    const errors = useMemo(() => form.formState.errors, [form.formState.errors])
    const isDirty = useMemo(() => form.formState.isDirty, [form.formState.isDirty])
    const isValid = useMemo(() => form.formState.isValid, [form.formState.isValid])

    const submitHandler = form.handleSubmit(async ({ card }): Promise<void> => {
        if (card == null) throw new Error('Invalid apiKey')

        if (!isDirty) toast.error('No changed input')
        else if (!isValid) toast.error('There are still errors in your input!')
        else
            await toast.promise(
                async (): Promise<void> => {
                    await MemberCardService2.getInstance().RegisterGenuineCard(card, '')

                    form.reset({ card })

                    await mutate('/services/v2/MemberCardService2.svc/ListGenuineCards')
                },
                {
                    error: 'Failed to register this genuine member card. Please contact your administrators',
                    pending: 'Registering genuine member card',
                    success: 'Registered genuine member card'
                }
            )
    })

    return (
        <Card data-testid='RegisterGenuineCard'>
            <Card.Header>Register Genuine Card</Card.Header>
            <Card.Body>
                <FormProvider {...form}>
                    <Row>
                        <label htmlFor='cardInput'>
                            <strong>Card Serial Number</strong>
                        </label>
                        <FormControl
                            id='cardInput'
                            formKey='card'
                            formType='text'
                            placeholder='Card Serial Number'
                            aria-label='Card Serial Number'
                            error={errors.card}
                        />
                    </Row>
                </FormProvider>
            </Card.Body>
            <Card.Footer>
                <Button
                    small
                    disabled={!isDirty || !isValid}
                    onClick={() => {
                        void submitHandler()
                    }}
                >
                    Register Genuine Card
                </Button>
            </Card.Footer>
        </Card>
    )
}

export default RegisterGenuineCard

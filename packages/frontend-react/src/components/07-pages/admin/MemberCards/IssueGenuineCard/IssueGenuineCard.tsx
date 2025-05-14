import { useMemo, type FC } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { mutate } from 'swr'

import type { IssueGenuineCardForm } from '../MemberCards.types'
import type { IssueGenuineCardProps } from './IssueGenuineCard.types'

import Row from '@/components/01-atoms/Row/Row'
import Button from '@/components/02-molecules/Button/Button'
import Card from '@/components/03-particles/Card/Card'
import FormControl from '@/components/03-particles/FormControl/FormControl'

import type { HTTPException } from '@/lib/exceptions/HTTPException'
import MemberCardService2 from '@/lib/providers/MemberCardService2'

import { zIssueGenuineCardForm } from '../MemberCards.schema'

const IssueGenuineCard: FC<IssueGenuineCardProps> = () => {
    const form = useForm<IssueGenuineCardForm>({
        resolver: zodResolver(zIssueGenuineCardForm),
        mode: 'onChange'
    })

    const errors = useMemo(() => form.formState.errors, [form.formState.errors])
    const isDirty = useMemo(() => form.formState.isDirty, [form.formState.isDirty])
    const isValid = useMemo(() => form.formState.isValid, [form.formState.isValid])

    const submitHandler = form.handleSubmit(async ({ ownerEmail, card }): Promise<void> => {
        if (card == null) throw new Error('Invalid apiKey')

        if (!isDirty) toast.error('No changed input')
        else if (!isValid) toast.error('There are still errors in your input!')
        else
            await toast.promise(
                async (): Promise<void> => {
                    await MemberCardService2.getInstance().IssueCard(ownerEmail, card)

                    form.reset({ card })

                    await mutate('/services/v2/MemberCardService2.svc/ListGenuineCards')
                },
                {
                    error: {
                        render({ data: err }: { data: HTTPException }) {
                            return `Failed to issue this genuine member card: ${err.info ?? err.message}`
                        }
                    },
                    pending: 'Issuing genuine member card',
                    success: 'Issued genuine member card'
                }
            )
    })

    return (
        <Card data-testid='IssueGenuineCard'>
            <Card.Header>Issue Genuine Card</Card.Header>
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
                    <Row>
                        <label htmlFor='ownerEmailInput'>
                            <strong>Owner Email</strong>
                        </label>
                        <FormControl
                            id='ownerEmailInput'
                            formKey='ownerEmail'
                            formType='email'
                            placeholder='Owner Email'
                            aria-label='Owner Email'
                            error={errors.ownerEmail}
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
                    Issue Genuine Card
                </Button>
            </Card.Footer>
        </Card>
    )
}

export default IssueGenuineCard

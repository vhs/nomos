import { useMemo, type FC } from 'react'

import Button from '@/components/01-atoms/Button/Button'
import Row from '@/components/01-atoms/Row/Row'
import Card from '@/components/04-composites/Card/Card'
import FormControl from '@/components/04-composites/FormControl/FormControl'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { IssueGenuineCardForm } from '../AdminMemberCards.types'
import type { IssueGenuineCardProps } from './IssueGenuineCard.types'
import { zIssueGenuineCardForm } from '../AdminMemberCards.schema'
import MemberCardService2 from '@/lib/providers/MemberCardService2'
import { toast } from 'react-toastify'
import { mutate } from 'swr'

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
                            return `Failed to issue this genuine member card: ${err.info != null ? err.info : err.message}`
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
                        <label>
                            <strong>Card Serial Number</strong>
                        </label>
                        <FormControl
                            formKey='card'
                            formType='text'
                            placeholder='Card Serial Number'
                            aria-label='Card Serial Number'
                            error={errors.card}
                        />
                    </Row>
                    <Row>
                        <label>
                            <strong>Owner Email</strong>
                        </label>
                        <FormControl
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
                <Button small disabled={!isDirty || !isValid} onClick={submitHandler}>
                    Issue Genuine Card
                </Button>
            </Card.Footer>
        </Card>
    )
}

export default IssueGenuineCard

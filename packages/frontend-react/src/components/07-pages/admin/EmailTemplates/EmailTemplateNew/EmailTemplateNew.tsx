import { useMemo, type FC } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'
import { toast } from 'react-toastify'

import type { EmailTemplateNewProps } from './EmailTemplateNew.types'

import Button from '@/components/01-atoms/Button/Button'
import Row from '@/components/01-atoms/Row/Row'
import FormCol from '@/components/02-molecules/FormCol/FormCol'
import FormControl from '@/components/04-composites/FormControl/FormControl'
import OverlayCard from '@/components/05-materials/OverlayCard/OverlayCard'
import { useTablePageContext } from '@/components/06-integrated-pages/TablePage/TablePage.context'

import EmailService2 from '@/lib/providers/EmailService2'

import { zEmailTemplateForm } from '../EmailTemplates.schema'

const EmailTemplateNew: FC<EmailTemplateNewProps> = () => {
    const { mutate } = useTablePageContext()

    const form = useForm({
        resolver: zodResolver(zEmailTemplateForm),
        mode: 'onChange',
        defaultValues: {
            name: '',
            code: '',
            subject: '',
            help: '',
            body: '',
            html: ''
        }
    })

    const errors = useMemo(() => form.formState.errors, [form.formState.errors])
    const isDirty = useMemo(() => form.formState.isDirty, [form.formState.isDirty])
    const isValid = useMemo(() => form.formState.isValid, [form.formState.isValid])

    const submitHandler = form.handleSubmit(async ({ name, code, subject, help, body, html }): Promise<void> => {
        if (!isDirty) toast.error('No changes!')
        else if (!isValid) toast.error('There are still errors in your input!')
        else
            await toast.promise(
                async (): Promise<void> => {
                    await EmailService2.getInstance().PutTemplate(name, code, subject, help, body, html)

                    form.reset({ name, code, subject, help, body, html })

                    await mutate()
                },
                {
                    pending: 'Updating email template...',
                    success: 'Email template has been updated!',
                    error: 'Failed to update email template!'
                }
            )
    })

    const resetDefaults = (): void => {
        form.reset({
            name: '',
            code: '',
            subject: '',
            help: '',
            body: '',
            html: ''
        })

        void form.trigger()
    }

    return (
        <OverlayCard
            data-testid='EmailTemplateNew'
            title={`Create Email Template`}
            actions={[
                <Button
                    key='Save Profile'
                    className='btn-success'
                    disabled={!isDirty}
                    onClick={(event) => {
                        if (!isValid) toast.error('Invalid input detected')
                        else void submitHandler(event)
                    }}
                >
                    Save Template
                </Button>,
                <Button
                    key='Reset'
                    className='btn-default'
                    disabled={!isDirty}
                    onClick={() => {
                        resetDefaults()
                    }}
                >
                    Reset
                </Button>
            ]}
            closeLabel='Close'
        >
            <FormProvider {...form}>
                <Row>
                    <FormCol error={errors.name}>
                        <label>
                            <strong>Name</strong>
                            <FormControl formKey='name' formType='text' placeholder='Name' aria-label='Name' />
                        </label>
                    </FormCol>
                </Row>
                <Row>
                    <FormCol error={errors.code}>
                        <label>
                            <strong>Code</strong>
                            <FormControl formKey='code' formType='text' placeholder='Code' aria-label='Code' />
                        </label>
                    </FormCol>
                </Row>
                <Row>
                    <FormCol error={errors.subject}>
                        <label>
                            <strong>Subject</strong>
                            <FormControl formKey='subject' formType='text' placeholder='Subject' aria-label='Subject' />
                        </label>
                    </FormCol>
                </Row>
                <Row>
                    <FormCol error={errors.name}>
                        <label>
                            <strong>Help Text</strong> (Description of this template)
                            <FormControl
                                formKey='help'
                                formType='text'
                                placeholder='Help Text'
                                aria-label='Help Text'
                            />
                        </label>
                    </FormCol>
                </Row>
                <Row>
                    <FormCol error={errors.body}>
                        <label>
                            <strong>Text Body</strong>
                            <FormControl
                                formKey='body'
                                formType='textarea'
                                placeholder='Text Body'
                                aria-label='Text Body'
                            />
                        </label>
                    </FormCol>
                </Row>
                <Row>
                    <FormCol error={errors.html}>
                        <label>
                            <strong>HTML Body</strong>
                            <FormControl
                                formKey='html'
                                formType='textarea'
                                placeholder='HTML Body'
                                aria-label='HTML Body'
                            />
                        </label>
                    </FormCol>
                </Row>
            </FormProvider>
        </OverlayCard>
    )
}

export default EmailTemplateNew

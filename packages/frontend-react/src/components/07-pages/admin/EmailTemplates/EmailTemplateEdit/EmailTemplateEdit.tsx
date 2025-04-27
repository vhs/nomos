import { useCallback, useEffect, useMemo, type FC } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useParams } from '@tanstack/react-router'
import { useForm, FormProvider } from 'react-hook-form'
import { toast } from 'react-toastify'

import type { EmailTemplateEditProps } from './EmailTemplateEdit.types'

import Button from '@/components/01-atoms/Button/Button'
import Row from '@/components/01-atoms/Row/Row'
import FormCol from '@/components/02-molecules/FormCol/FormCol'
import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'
import FormControl from '@/components/04-composites/FormControl/FormControl'
import OverlayCard from '@/components/05-materials/OverlayCard/OverlayCard'
import { useTablePageContext } from '@/components/05-materials/TablePage/TablePage.context'

import useGetTemplate from '@/lib/hooks/providers/EmailService2/useGetTemplate'
import EmailService2 from '@/lib/providers/EmailService2'

import { zEmailTemplateForm } from '../EmailTemplates.schema'

const EmailTemplateEdit: FC<EmailTemplateEditProps> = () => {
    const { mutate } = useTablePageContext()

    const templateId = useParams({
        from: '/_admin/admin/emailtemplates/$templateId',
        select: (params): number => Number(params.templateId)
    })

    const {
        data: emailTemplate,
        isLoading: isEmailTemplateLoading,
        mutate: mutateEmailTemplate
    } = useGetTemplate(templateId)

    const form = useForm({
        resolver: zodResolver(zEmailTemplateForm),
        mode: 'onChange'
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
                    await EmailService2.getInstance().UpdateTemplate(templateId, name, code, subject, help, body, html)

                    form.reset({ name, code, subject, help, body, html })

                    await mutate()
                    await mutateEmailTemplate()
                },
                {
                    pending: 'Updating email template...',
                    success: 'Email template has been updated!',
                    error: 'Failed to update email template!'
                }
            )
    })

    const resetDefaults = (): void => {
        form.reset()

        void form.trigger()
    }

    const hydrateDefaults = useCallback((): void => {
        if (emailTemplate != null && !isDirty) {
            form.reset({
                name: emailTemplate.name,
                code: emailTemplate.code,
                subject: emailTemplate.subject,
                help: emailTemplate.help,
                body: emailTemplate.body,
                html: emailTemplate.html
            })

            void form.trigger()
        }
    }, [emailTemplate, form, isDirty])

    useEffect(() => {
        hydrateDefaults()
    }, [emailTemplate, hydrateDefaults])

    if (isEmailTemplateLoading || emailTemplate == null) return <LoadingOverlay />

    return (
        <OverlayCard
            data-testid='EmailTemplateEdit'
            title={`Edit Email Template: ${emailTemplate.name}`}
            actions={[
                <Button
                    key='Save Profile'
                    className='btn-success'
                    disabled={!isDirty}
                    onClick={(event) => {
                        void submitHandler(event)
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
                                rows={5}
                                minLength={5}
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

export default EmailTemplateEdit

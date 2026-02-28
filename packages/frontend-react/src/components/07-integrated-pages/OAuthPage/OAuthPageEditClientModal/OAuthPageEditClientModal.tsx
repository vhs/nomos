import { useCallback, useEffect, useMemo, type FC } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import type { OAuthPageEditSchema } from '../OAuthPage.types'
import type { OAuthPageEditClientModalProps } from './OAuthPageEditClientModal.types'

import Row from '@/components/01-atoms/Row/Row'
import Button from '@/components/02-molecules/Button/Button'
import FormCol from '@/components/02-molecules/FormCol/FormCol'
import FormControl from '@/components/03-particles/FormControl/FormControl'
import OverlayCard from '@/components/04-composites/OverlayCard/OverlayCard'

import { useGetClientDetails } from '@/lib/hooks/providers/OAuthService2/useGetClientDetails'
import useAuth from '@/lib/hooks/useAuth'
import OAuthService2 from '@/lib/providers/OAuthService2'

import { zOAuthPageEditSchema } from '../OAuthPage.schemas'

const OAuthPageEditClientModal: FC<OAuthPageEditClientModalProps> = ({ appClientId }) => {
    const { currentUser, mutateUser } = useAuth()
    // const { scope } = useOAuthPageContext()

    const { data: appClient } = useGetClientDetails(appClientId)

    const form = useForm<OAuthPageEditSchema>({
        resolver: zodResolver(zOAuthPageEditSchema),
        mode: 'onChange',
        defaultValues: {
            name: '',
            description: '',
            url: '',
            redirecturi: '',
            enabled: false,
            secret: '',
            expires: ''
        }
    })

    const errors = useMemo(() => form.formState.errors, [form.formState.errors])
    const isDirty = useMemo(() => form.formState.isDirty, [form.formState.isDirty])
    const isValid = useMemo(() => form.formState.isValid, [form.formState.isValid])

    const hydrateDefaults = useCallback((): void => {
        form.reset({
            name: appClient?.name ?? '',
            description: appClient?.description ?? '',
            url: appClient?.url ?? '',
            redirecturi: appClient?.redirecturi ?? '',
            enabled: appClient?.enabled ?? false,
            secret: appClient?.secret ?? '',
            expires: appClient?.expires != null ? new Date(appClient?.expires).toISOString().slice(0, 16) : ''
        })
    }, [
        appClient?.description,
        appClient?.enabled,
        appClient?.expires,
        appClient?.name,
        appClient?.redirecturi,
        appClient?.secret,
        appClient?.url,
        form
    ])

    const resetDefaults = (): void => {
        form.reset()
    }

    useEffect(() => {
        hydrateDefaults()
    }, [appClient, hydrateDefaults])

    const submitHandler = form.handleSubmit(
        async ({ name, description, url, redirecturi, enabled, expires }): Promise<void> => {
            if (appClient == null) throw new Error('Invalid app client')

            if (!isDirty) toast.error('No changes')
            else if (!isValid) toast.error('Input errors found')
            else
                await toast.promise(
                    async (): Promise<void> => {
                        await OAuthService2.getInstance().UpdateClient(appClientId, name, description, url, redirecturi)
                        await OAuthService2.getInstance().EnableClient(appClientId, enabled)

                        if (currentUser?.hasPermission('administrator') ?? false)
                            await OAuthService2.getInstance().UpdateClientExpiry(appClientId, expires.toLocaleString())

                        form.reset({ name, description, url, redirecturi, expires })

                        await mutateUser()
                    },
                    {
                        error: 'Failed to update this client. Please contact your administrators',
                        pending: 'Updating client',
                        success: 'Updated client'
                    }
                )
        }
    )

    if (appClientId == null) return null

    return (
        <div data-testid='OAuthEditModal'>
            <FormProvider {...form}>
                <OverlayCard
                    title='Edit OAuth Client'
                    actions={[
                        <Button
                            key='Save & Close'
                            variant='success'
                            disabled={isValid && !isDirty}
                            onClick={() => {
                                void submitHandler()
                            }}
                        >
                            Save & Close
                        </Button>,
                        <Button
                            key='Reset'
                            className='btn-default'
                            onClick={() => {
                                resetDefaults()
                            }}
                            disabled={isValid && !isDirty}
                        >
                            Reset
                        </Button>
                    ]}
                >
                    <Row>
                        <FormCol error={errors.name}>
                            <label>
                                Name
                                <FormControl
                                    formKey='name'
                                    formType='text'
                                    placeholder='Name'
                                    aria-placeholder='Name'
                                />
                            </label>
                        </FormCol>
                    </Row>
                    <Row>
                        <FormCol error={errors.description}>
                            <label>
                                Description
                                <FormControl
                                    formKey='description'
                                    formType='text'
                                    placeholder='Description'
                                    aria-placeholder='Description'
                                />
                            </label>
                        </FormCol>
                    </Row>
                    <Row>
                        <FormCol error={errors.url}>
                            <label>
                                URL
                                <FormControl formKey='url' formType='url' placeholder='URL' aria-placeholder='URL' />
                            </label>
                        </FormCol>
                    </Row>
                    <Row>
                        <FormCol error={errors.redirecturi}>
                            <label>
                                Redirect URI
                                <FormControl
                                    formKey='redirecturi'
                                    formType='url'
                                    placeholder='Redirect URI'
                                    aria-placeholder='Redirect URI'
                                />
                            </label>
                        </FormCol>
                    </Row>
                </OverlayCard>
            </FormProvider>
        </div>
    )
}

export default OAuthPageEditClientModal

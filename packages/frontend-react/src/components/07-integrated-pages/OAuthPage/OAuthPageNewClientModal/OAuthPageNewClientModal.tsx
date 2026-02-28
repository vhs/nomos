import { useMemo, type FC } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'
import { toast } from 'react-toastify'
import { mutate } from 'swr'

import type { OAuthPageNewClientModalProps } from './OAuthPageNewClientModal.types'
import type { OAuthPageEditSchema } from '../OAuthPage.types'

import Row from '@/components/01-atoms/Row/Row'
import Button from '@/components/02-molecules/Button/Button'
import FormCol from '@/components/02-molecules/FormCol/FormCol'
import FormControl from '@/components/03-particles/FormControl/FormControl'
import OverlayCard from '@/components/04-composites/OverlayCard/OverlayCard'

import useAuth from '@/lib/hooks/useAuth'
import OAuthService2 from '@/lib/providers/OAuthService2'

import { useOAuthPageContext } from '../OAuthPage.context'
import { zOAuthPageEditSchema } from '../OAuthPage.schemas'

const OAuthPageNewClientModal: FC<OAuthPageNewClientModalProps> = () => {
    const { currentUser } = useAuth()
    const { scope } = useOAuthPageContext()

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

    const resetDefaults = (): void => {
        form.reset()
    }

    const submitHandler = form.handleSubmit(
        async ({ name, description, url, redirecturi, enabled, expires }): Promise<void> => {
            if (!isDirty) toast.error('No changes')
            else if (!isValid) toast.error('Input errors found')
            else
                await toast.promise(
                    async (): Promise<void> => {
                        const appClient = await OAuthService2.getInstance().RegisterClient(
                            name,
                            description,
                            url,
                            redirecturi
                        )

                        if (appClient == null || typeof appClient === 'string')
                            throw new Error(`Unexpected error registering client: ${appClient}`)

                        await OAuthService2.getInstance().EnableClient(appClient.id, enabled)

                        if (currentUser?.hasPermission('administrator') ?? false)
                            await OAuthService2.getInstance().UpdateClientExpiry(appClient.id, expires.toLocaleString())

                        form.reset({ name, description, url, redirecturi, expires })

                        await mutate(
                            scope === 'user'
                                ? `/services/v2/OAuthService2.svc/CountUserClients`
                                : `/services/v2/OAuthService2.svc/CountClients`
                        )
                        await mutate(
                            scope === 'user'
                                ? `/services/v2/OAuthService2.svc/ListUserClients`
                                : `/services/v2/OAuthService2.svc/ListClients`
                        )
                    },
                    {
                        error: 'Failed to update this client. Please contact your administrators',
                        pending: 'Updating client',
                        success: 'Updated client'
                    }
                )
        }
    )

    return (
        <div data-testid='OAuthPageNewClientModal'>
            <FormProvider {...form}>
                <OverlayCard
                    title='New OAuth Client'
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

export default OAuthPageNewClientModal

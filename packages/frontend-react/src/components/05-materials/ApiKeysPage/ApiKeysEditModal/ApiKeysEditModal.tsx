import { useCallback, useEffect, useMemo, type FC } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { mutate } from 'swr'

import type { ApiKeysEditModalProps } from './ApiKeysEditModal.types'
import type { ApiKeysEditSchema } from '../ApiKeysPage.types'

import Button from '@/components/01-atoms/Button/Button'
import Col from '@/components/01-atoms/Col/Col'
import Row from '@/components/01-atoms/Row/Row'
import Card from '@/components/04-composites/Card/Card'
import FormControl from '@/components/04-composites/FormControl/FormControl'
import OverlayCard from '@/components/05-materials/OverlayCard/OverlayCard'
import PrivilegesSelectorCard from '@/components/05-materials/PrivilegesSelectorCard/PrivilegesSelectorCard'
import { backendCurrentUserUrl } from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider.utils'

import useGetApiKey from '@/lib/hooks/providers/ApiKeyService2/useGetApiKey'
import useAuth from '@/lib/hooks/useAuth'
import useToggleReducer from '@/lib/hooks/useToggleReducer'
import ApiKeyService2 from '@/lib/providers/ApiKeyService2'
import { getEnabledStateRecordKeys, mergePrivilegesArrayToBooleanRecord } from '@/lib/utils'

import { useApiKeysPageContext } from '../ApiKeysPage.context'
import { zApiKeysEditSchema } from '../ApiKeysPage.schemas'

const ApiKeysEditModal: FC<ApiKeysEditModalProps> = ({ keyId }) => {
    const { currentUser } = useAuth()
    const { availablePrivileges, scope } = useApiKeysPageContext()

    const { data: apiKey } = useGetApiKey(keyId)

    const form = useForm<ApiKeysEditSchema>({
        resolver: zodResolver(zApiKeysEditSchema),
        mode: 'onChange',
        defaultValues: {
            key: apiKey?.key ?? '',
            notes: apiKey?.notes ?? '',
            expiry: apiKey?.expires != null ? new Date(apiKey?.expires).toISOString().slice(0, 16) : ''
        }
    })

    const errors = useMemo(() => form.formState.errors, [form.formState.errors])
    const isDirty = useMemo(() => form.formState.isDirty, [form.formState.isDirty])
    const isValid = useMemo(() => form.formState.isValid, [form.formState.isValid])

    const {
        state: privileges,
        dispatch: dispatchPrivileges,
        isDirty: dirtyPrivileges
    } = useToggleReducer(mergePrivilegesArrayToBooleanRecord(availablePrivileges, apiKey?.privileges))

    const hydrateDefaults = useCallback((): void => {
        form.reset({
            key: apiKey?.key ?? '',
            notes: apiKey?.notes ?? '',
            expiry: apiKey?.expires != null ? new Date(apiKey?.expires).toISOString().slice(0, 16) : ''
        })
        dispatchPrivileges({
            action: 'update-defaults',
            value: mergePrivilegesArrayToBooleanRecord(availablePrivileges, apiKey?.privileges)
        })
        dispatchPrivileges({
            action: 'reset'
        })
    }, [apiKey?.expires, apiKey?.key, apiKey?.notes, apiKey?.privileges, availablePrivileges, dispatchPrivileges, form])

    const resetDefaults = (): void => {
        form.reset()
        dispatchPrivileges({
            action: 'reset'
        })
    }

    useEffect(() => {
        hydrateDefaults()
    }, [availablePrivileges, hydrateDefaults])

    const submitHandler = form.handleSubmit(async (): Promise<void> => {
        if (apiKey == null) throw new Error('Invalid apiKey')

        await toast.promise(
            async (): Promise<void> => {
                const { notes, expiry } = form.getValues()

                if (isDirty && Object.keys(form.formState.dirtyFields).filter((f) => f !== 'privileges').length > 0) {
                    await ApiKeyService2.getInstance().UpdateApiKey(
                        apiKey.id,
                        notes,
                        expiry.toString() === '' ? null : expiry.toString()
                    )

                    scope === 'system'
                        ? await mutate('/services/v2/ApiKeyService2.svc/GetSystemApiKeys')
                        : await mutate(`/services/v2/ApiKeyService2.svc/GetUserAPIKeys?userid=${currentUser?.id}`)

                    scope === 'system'
                        ? await mutate('/services/v2/VirtualService1.svc/GetScopedKeys?scope=system')
                        : await mutate(
                              `/services/v2/VirtualService1.svc/GetScopedKeys?scope=user&id=${currentUser?.id}`
                          )

                    form.reset({ notes, expiry })
                }

                if (dirtyPrivileges) {
                    await ApiKeyService2.getInstance().PutApiKeyPrivileges(
                        apiKey.id,
                        getEnabledStateRecordKeys(privileges)
                    )

                    dispatchPrivileges({
                        action: 'update-defaults',
                        value: privileges
                    })
                    dispatchPrivileges({
                        action: 'reset'
                    })
                }

                await mutate(backendCurrentUserUrl)
            },
            {
                error: 'Failed to update this API key. Please contact your administrators',
                pending: 'Updating API key',
                success: 'Updated API key'
            }
        )
    })

    if (keyId == null) return null

    return (
        <div data-testid='ApiKeysEditModal'>
            <FormProvider {...form}>
                <OverlayCard
                    title='Edit API Key'
                    actions={[
                        <Button
                            key='Save & Close'
                            variant='success'
                            disabled={isValid && !isDirty && !dirtyPrivileges}
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
                            disabled={isValid && !isDirty && !dirtyPrivileges}
                        >
                            Reset
                        </Button>
                    ]}
                >
                    <Row>
                        <Col>
                            <FormControl formKey='key' formType='text' readOnly disabled />
                        </Col>
                    </Row>

                    <Row>
                        <Col className='basis-full md:basis-1/2'>
                            <Row>
                                <Col>
                                    <Card error={errors.notes != null}>
                                        <Card.Header>Notes</Card.Header>
                                        <Card.Body>
                                            <FormControl formKey='notes' formType='textarea' />
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Card error={errors.expiry != null}>
                                        <Card.Header>Expiry</Card.Header>
                                        <Card.Body>
                                            <FormControl
                                                formKey='expiry'
                                                aria-label='Date and time'
                                                formType='datetime-local'
                                            />
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                        <Col className='basis-full md:basis-1/2'>
                            <Row>
                                <Col>
                                    <PrivilegesSelectorCard
                                        customPrivileges={availablePrivileges}
                                        onUpdate={({ privilege, state }): void => {
                                            dispatchPrivileges({
                                                action: state ? 'set' : 'unset',
                                                value: privilege
                                            })
                                        }}
                                        selected={privileges}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </OverlayCard>
            </FormProvider>
        </div>
    )
}

export default ApiKeysEditModal

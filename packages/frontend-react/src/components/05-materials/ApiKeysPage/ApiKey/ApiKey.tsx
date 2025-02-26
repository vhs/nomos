import { useCallback, useEffect, useState, type FC } from 'react'

import { PencilSquareIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { zodResolver } from '@hookform/resolvers/zod'
import { clsx } from 'clsx'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { mutate } from 'swr'

import type { ApiKeyEditForm, ApiKeyProps } from './ApiKey.types'

import Button from '@/components/01-atoms/Button/Button'
import Col from '@/components/01-atoms/Col/Col'
import Popover from '@/components/01-atoms/Popover/Popover'
import Row from '@/components/01-atoms/Row/Row'
import ConditionalTableCell from '@/components/02-molecules/ConditionalTableCell/ConditionalTableCell'
import Card from '@/components/04-composites/Card/Card'
import FormControl from '@/components/04-composites/FormControl/FormControl'
import OverlayCard from '@/components/05-materials/OverlayCard/OverlayCard'
import PrivilegesSelectorCard from '@/components/05-materials/PrivilegesSelectorCard/PrivilegesSelectorCard'
import { backendCurrentUserUrl } from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider.utils'

import useAuth from '@/lib/hooks/useAuth'
import useToggleReducer from '@/lib/hooks/useToggleReducer'
import ApiKeyService2 from '@/lib/providers/ApiKeyService2'
import { convertPrivilegesArrayToBooleanRecord, getEnabledStateRecordKeys, mergeBooleanRecord } from '@/lib/utils'

import styles from './ApiKey.module.css'
import { ApiKeyEditSchema } from './ApiKey.schema'

const ApiKey: FC<ApiKeyProps> = ({ apiKey, availablePrivileges, scope }) => {
    const { currentUser } = useAuth()

    const form = useForm<ApiKeyEditForm>({
        resolver: zodResolver(ApiKeyEditSchema),
        mode: 'onChange',
        defaultValues: {
            key: apiKey.key,
            notes: apiKey.notes ?? '',
            expiry: apiKey.expires != null ? new Date(apiKey.expires).toISOString().slice(0, 16) : ''
        }
    })

    const {
        state: privileges,
        dispatch: dispatchPrivileges,
        isDirty: dirtyPrivileges
    } = useToggleReducer(
        mergeBooleanRecord(
            convertPrivilegesArrayToBooleanRecord(availablePrivileges, false),
            convertPrivilegesArrayToBooleanRecord(apiKey.privileges)
        )
    )

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)

    const closeDeleteModal = (): void => {
        setShowDeleteModal(false)
    }

    const openDeleteModal = (): void => {
        setShowDeleteModal(true)
    }

    const closeEditModal = (): void => {
        setShowEditModal(false)
    }

    const openEditModal = (): void => {
        setShowEditModal(true)
    }

    const deleteAPIKey = async (): Promise<void> => {
        toast.success('Deleting key')
        await ApiKeyService2.getInstance().DeleteApiKey(apiKey.id)
        closeDeleteModal()
        scope === 'system'
            ? await mutate('/services/v2/ApiKeyService2.svc/GetSystemApiKeys')
            : await mutate(`/services/v2/ApiKeyService2.svc/GetUserAPIKeys?userid=${currentUser?.id}`)
    }

    const hydrateDefaults = useCallback((): void => {
        form.reset({
            key: apiKey.key,
            notes: apiKey.notes ?? '',
            expiry: apiKey.expires != null ? new Date(apiKey.expires).toISOString().slice(0, 16) : ''
        })
        dispatchPrivileges({
            action: 'update-defaults',
            value: mergeBooleanRecord(
                convertPrivilegesArrayToBooleanRecord(availablePrivileges, false),
                convertPrivilegesArrayToBooleanRecord(apiKey.privileges, true)
            )
        })
        dispatchPrivileges({
            action: 'reset'
        })
    }, [apiKey.expires, apiKey.key, apiKey.notes, apiKey.privileges, availablePrivileges, dispatchPrivileges, form])

    const resetDefaults = (): void => {
        form.reset({
            key: apiKey.key,
            notes: apiKey.notes ?? '',
            expiry: apiKey.expires != null ? new Date(apiKey.expires).toISOString().slice(0, 16) : ''
        })
        dispatchPrivileges({
            action: 'reset'
        })
    }

    useEffect(() => {
        hydrateDefaults()
    }, [availablePrivileges, hydrateDefaults])

    const submitHandler = form.handleSubmit(async (): Promise<void> => {
        await toast.promise(
            async (): Promise<void> => {
                const { notes, expiry } = form.getValues()

                if (
                    form.formState.isDirty &&
                    Object.keys(form.formState.dirtyFields).filter((f) => f !== 'privileges').length > 0
                ) {
                    await ApiKeyService2.getInstance().UpdateApiKey(apiKey.id, notes, expiry.toString())
                    scope === 'system'
                        ? await mutate('/services/v2/ApiKeyService2.svc/GetSystemApiKeys')
                        : await mutate(`/services/v2/ApiKeyService2.svc/GetUserAPIKeys?userid=${currentUser?.id}`)
                }

                if (dirtyPrivileges) {
                    await ApiKeyService2.getInstance().PutApiKeyPrivileges(
                        apiKey.id,
                        getEnabledStateRecordKeys(privileges)
                    )
                }

                await mutate(backendCurrentUserUrl)

                closeEditModal()
            },
            {
                error: 'Failed to update this API key. Please contact your administrators',
                pending: 'Updating API key',
                success: 'Updated API key'
            }
        )
    })

    return (
        <>
            <FormProvider {...form}>
                <tr className='data-row'>
                    <ConditionalTableCell
                        condition={'key' in apiKey}
                        className={clsx([styles.DataField])}
                        onClick={openEditModal}
                        onKeyUp={openEditModal}
                    >
                        <Popover content={apiKey.key} popover={apiKey.key} />
                    </ConditionalTableCell>
                    <ConditionalTableCell className={styles.DataField} condition={'notes' in apiKey}>
                        {apiKey.notes}
                    </ConditionalTableCell>
                    <ConditionalTableCell className={styles.DataField} condition={'created' in apiKey}>
                        {apiKey.created?.toLocaleString()}
                    </ConditionalTableCell>
                    <ConditionalTableCell className={styles.DataField} condition={'expires' in apiKey}>
                        {apiKey.expires?.toLocaleString()}
                    </ConditionalTableCell>
                    <td className={styles.DataField}>
                        <Button variant='primary' className='btn-circle h-10 w-10 text-white' onClick={openEditModal}>
                            <PencilSquareIcon className='h-4 w-4' />
                        </Button>
                        <Button variant='danger' className='btn-circle mx-auto' onClick={openDeleteModal}>
                            <XMarkIcon className='h-4 w-4 font-bold' />
                        </Button>
                        <OverlayCard
                            show={showDeleteModal}
                            title='Confirm Delete'
                            actions={[
                                <Button
                                    key='Delete'
                                    variant='primary'
                                    onClick={() => {
                                        void deleteAPIKey()
                                    }}
                                >
                                    Delete
                                </Button>
                            ]}
                            onClose={() => {
                                closeDeleteModal()
                                return false
                            }}
                        >
                            Are you sure you want to delete this API Key?
                        </OverlayCard>

                        <OverlayCard
                            show={showEditModal}
                            title='Edit API Key'
                            actions={[
                                <Button
                                    key='Save & Close'
                                    variant='success'
                                    disabled={!form.formState.isDirty}
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
                                    disabled={!form.formState.isDirty}
                                >
                                    Reset
                                </Button>
                            ]}
                            onClose={() => {
                                closeEditModal()
                                return false
                            }}
                        >
                            <Row className='spacious'>
                                <Col>
                                    <FormControl id='key' formType='text' readOnly value={apiKey.key} disabled />
                                </Col>
                            </Row>

                            <Row className='spacious'>
                                <Col className='basis-full md:basis-1/2'>
                                    <Row className='spacious'>
                                        <Col>
                                            <Card>
                                                <Card.Header>Notes</Card.Header>
                                                <Card.Body>
                                                    <FormControl id='notes' formType='text' />
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                    <Row className='spacious'>
                                        <Col>
                                            <Card>
                                                <Card.Header>Expiry</Card.Header>
                                                <Card.Body>
                                                    <FormControl
                                                        id='expiry'
                                                        aria-label='Date and time'
                                                        formType='datetime-local'
                                                    />
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col className='basis-full md:basis-1/2'>
                                    <Row className='spacious'>
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
                    </td>
                </tr>
            </FormProvider>
        </>
    )
}

export default ApiKey

import { useEffect, useState, type FC, type MouseEvent } from 'react'

import { PencilSquareIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { clsx } from 'clsx'
import { toast } from 'react-toastify'
import { mutate } from 'swr'

import type { ApiKeyProps } from './ApiKey.types'

import Button from '@/components/01-atoms/Button/Button'
import Col from '@/components/01-atoms/Col/Col'
import Conditional from '@/components/01-atoms/Conditional/Conditional'
import FormControl from '@/components/01-atoms/FormControl/FormControl'
import Popover from '@/components/01-atoms/Popover/Popover'
import Row from '@/components/01-atoms/Row/Row'
import ConditionalTableCell from '@/components/02-molecules/ConditionalTableCell/ConditionalTableCell'
import Card from '@/components/04-composites/Card'
import OverlayCard from '@/components/05-materials/OverlayCard/OverlayCard'
import PrivilegesSelectorCard from '@/components/05-materials/PrivilegesSelectorCard/PrivilegesSelectorCard'
import { backendCurrentUserUrl } from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider.utils'

import useAuth from '@/lib/hooks/useAuth'
import { usePrivilegeCodesReducer, type PrivilegeCodesMutationArg } from '@/lib/hooks/usePrivilegeCodesReducer'
import ApiKeyService2 from '@/lib/providers/ApiKeyService2'

import styles from './ApiKey.module.css'

const ApiKey: FC<ApiKeyProps> = ({ apiKey, availablePrivileges, scope }) => {
    const { currentUser } = useAuth()

    const [dirty, setDirty] = useState(false)

    const [keyPrivileges, dispatchKeyPrivileges] = usePrivilegeCodesReducer(apiKey.privileges?.map((p) => p.code))
    const [keyNotes, setKeyNotes] = useState<string>(apiKey.notes ?? '')
    const [keyExpiry, setKeyExpiry] = useState<string>(
        apiKey.expires != null ? new Date(apiKey.expires).toISOString().slice(0, 16) : ''
    )

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [dirtyPrivileges, setDirtyPrivileges] = useState(false)

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

    const hydrateDefaults = (): void => {
        setKeyNotes(apiKey.notes ?? '')
        setKeyExpiry((apiKey.expires != null ? new Date(apiKey.expires) : new Date()).toISOString().slice(0, 16))
        dispatchKeyPrivileges({ action: 'replace', value: (apiKey.privileges ?? []).map((p) => p.code) })
        setDirty(false)
        setDirtyPrivileges(false)
    }

    const updateAPIKey = async (): Promise<void> => {
        if (dirty) {
            await ApiKeyService2.getInstance().UpdateApiKey(apiKey.id, keyNotes, keyExpiry !== '' ? keyExpiry : '')
            scope === 'system'
                ? await mutate('/services/v2/ApiKeyService2.svc/GetSystemApiKeys')
                : await mutate(`/services/v2/ApiKeyService2.svc/GetUserAPIKeys?userid=${currentUser?.id}`)

            setDirty(false)
        }
    }

    const updatePrivileges = async (): Promise<void> => {
        if (dirtyPrivileges) {
            await ApiKeyService2.getInstance().PutApiKeyPrivileges(apiKey.id, keyPrivileges.privileges)
            setDirtyPrivileges(false)
        }
    }

    const submitHandler = async (event: MouseEvent<HTMLButtonElement>): Promise<void> => {
        event.preventDefault()

        await toast.promise(
            async (): Promise<void> => {
                await updatePrivileges()
                await updateAPIKey()
                await mutate(backendCurrentUserUrl)

                closeEditModal()
            },
            {
                error: 'Failed to update this API key. Please contact your administrators',
                pending: 'Updating API key',
                success: 'Updated API key'
            }
        )
    }

    useEffect(() => {
        dispatchKeyPrivileges({ action: 'replace', value: (apiKey.privileges ?? []).map((p) => p.code) })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <tr className='data-row'>
                <ConditionalTableCell
                    condition={'key' in apiKey}
                    className={clsx(['max-w-[6rem] md:max-w-[unset]', styles.DataField])}
                    onClick={openEditModal}
                    onKeyUp={openEditModal}
                >
                    <Popover content={apiKey.key} popover={apiKey.key} />
                </ConditionalTableCell>
                <ConditionalTableCell className={styles.DataField} condition={'notes' in apiKey}>
                    {apiKey.notes}
                </ConditionalTableCell>
                <ConditionalTableCell className={styles.DataField} condition={'created' in apiKey}>
                    {apiKey.created.toLocaleString()}
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
                    <Conditional condition={showDeleteModal}>
                        <OverlayCard
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
                    </Conditional>

                    <Conditional condition={showEditModal}>
                        <OverlayCard
                            title='Edit API Key'
                            actions={[
                                <Button
                                    key='Save & Close'
                                    variant='success'
                                    disabled={!(dirty || dirtyPrivileges)}
                                    onClick={(event) => {
                                        void submitHandler(event)
                                    }}
                                >
                                    Save & Close
                                </Button>,
                                <Button
                                    key='Reset'
                                    className='btn-default'
                                    onClick={() => {
                                        hydrateDefaults()
                                        setDirty(false)
                                    }}
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
                                    <FormControl formType='text' readOnly value={apiKey.key} disabled />
                                </Col>
                            </Row>

                            <Row className='spacious'>
                                <Col className='basis-full md:basis-1/2'>
                                    <Row className='spacious'>
                                        <Col>
                                            <Card>
                                                <Card.Header>Notes</Card.Header>
                                                <Card.Body>
                                                    <FormControl
                                                        formType='text'
                                                        value={keyNotes}
                                                        onChange={(value) => {
                                                            setKeyNotes(value)
                                                            setDirty(true)
                                                        }}
                                                    />
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
                                                        aria-label='Date and time'
                                                        formType='datetime-local'
                                                        value={keyExpiry}
                                                        onChange={(value) => {
                                                            setKeyExpiry(value)
                                                            setDirty(true)
                                                        }}
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
                                                availablePrivileges={availablePrivileges}
                                                onUpdate={(mutation: PrivilegeCodesMutationArg): void => {
                                                    dispatchKeyPrivileges(mutation)
                                                    setDirtyPrivileges(true)
                                                }}
                                                value={keyPrivileges}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </OverlayCard>
                    </Conditional>
                </td>
            </tr>
        </>
    )
}

export default ApiKey

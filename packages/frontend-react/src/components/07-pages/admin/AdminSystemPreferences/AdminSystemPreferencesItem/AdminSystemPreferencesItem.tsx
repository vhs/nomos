import { useCallback, useEffect, useMemo, useState, type FC, type MouseEvent } from 'react'

import { toast } from 'react-toastify'
import { z } from 'zod'

import type { AdminSystemPreferencesItemProps } from './AdminSystemPreferencesItem.types'

import Button from '@/components/01-atoms/Button/Button'
import Col from '@/components/01-atoms/Col/Col'
import Conditional from '@/components/01-atoms/Conditional/Conditional'
import FontAwesomeIcon from '@/components/01-atoms/FontAwesomeIcon/FontAwesomeIcon'
import FormControl from '@/components/01-atoms/FormControl/FormControl'
import Row from '@/components/01-atoms/Row/Row'
import TableActionsCell from '@/components/01-atoms/TableActionsCell/TableActionsCell'
import Toggle from '@/components/01-atoms/Toggle/Toggle'
import ConditionalTableCell from '@/components/02-molecules/ConditionalTableCell/ConditionalTableCell'
import Card from '@/components/04-composites/Card'
import OverlayCard from '@/components/05-materials/OverlayCard/OverlayCard'
import PrivilegesSelectorCard from '@/components/05-materials/PrivilegesSelectorCard/PrivilegesSelectorCard'
import { useTablePageContext } from '@/components/05-materials/TablePage/TablePage.context'

import { useGetAllPrivileges } from '@/lib/hooks/providers/PrivilegeService2/useGetAllPrivileges'
import useFormDirty from '@/lib/hooks/useFormDirty'
import useFormErrors from '@/lib/hooks/useFormErrors'
import { usePrivilegeCodesReducer, type PrivilegeCodesMutationArg } from '@/lib/hooks/usePrivilegeCodesReducer'
import PreferenceService2 from '@/lib/providers/PreferenceService2'

import type { BasePrivileges } from '@/types/records'

import { AdminSystemPreferencesItemFields } from './AdminSystemPreferencesItem.utils'

const AdminSystemPreferencesItem: FC<AdminSystemPreferencesItemProps> = ({ data }) => {
    const { mutate } = useTablePageContext()

    const { data: systemPrivileges } = useGetAllPrivileges()

    const availablePrivileges: BasePrivileges = useMemo(() => {
        return Array.isArray(systemPrivileges)
            ? (systemPrivileges
                  .filter(Boolean)
                  .map((p) => {
                      if (typeof p !== 'string')
                          return {
                              code: p.code,
                              name: p.name
                          }
                      else return null
                  })
                  .filter((p) => p != null) as BasePrivileges)
            : []
    }, [systemPrivileges])

    const [key, setKey] = useState(data.key ?? '')
    const [value, setValue] = useState(data.value ?? '')
    const [enabled, setEnabled] = useState(data.enabled)
    const [notes, setNotes] = useState(data.notes ?? '')
    const [settingAccessPrivileges, dispatchSettingAccessPrivileges] = usePrivilegeCodesReducer(
        Object.values(data.privileges ?? {}).map((p) => p.code)
    )

    const [errorStates, catchError, clearErrors] = useFormErrors(...AdminSystemPreferencesItemFields)
    const [dirtyStates, handleDirty, clearDirty] = useFormDirty(...AdminSystemPreferencesItemFields)
    const [dirtyPrivileges, setDirtyPrivileges] = useState(false)

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

    const deleteSystemPreference = async (): Promise<void> => {
        await toast
            .promise(
                async (): Promise<void> => {
                    await PreferenceService2.getInstance().DeleteSystemPreference(data.key.toString())

                    await mutate()
                },
                {
                    error: 'Failed to update this API key. Please contact your administrators',
                    pending: 'Deleting API key',
                    success: 'Deleted API key'
                }
            )
            .then(() => {
                closeDeleteModal()
            })
    }

    const resetFields = useCallback((): void => {
        setKey(data?.key ?? '')
        setValue(data?.value)
        setEnabled(data?.enabled)
        setNotes(data?.notes ?? '')
        dispatchSettingAccessPrivileges({
            action: 'replace',
            value: Object.values(data.privileges ?? {}).map((p) => p.code)
        })
        clearDirty()
        clearErrors()
    }, [clearDirty, clearErrors, data, dispatchSettingAccessPrivileges])

    const submitHandler = async (event: MouseEvent<HTMLButtonElement>): Promise<void> => {
        event.preventDefault()

        if (!Object.values(dirtyStates).some(Boolean) && !dirtyPrivileges) return

        if (Object.values(errorStates).some(Boolean)) {
            toast.error('You have errors in your form. Please fix these first.')
            return
        }

        await toast
            .promise(
                async (): Promise<void> => {
                    if (Object.values(dirtyStates).some(Boolean))
                        await PreferenceService2.getInstance().UpdateSystemPreference(
                            data.id,
                            key,
                            value,
                            enabled,
                            notes ?? ''
                        )
                    if (dirtyPrivileges)
                        await PreferenceService2.getInstance().PutSystemPreferencePrivileges(
                            data.id,
                            settingAccessPrivileges.privileges
                        )

                    await mutate()
                },
                {
                    error: 'Failed to update this API key. Please contact your administrators',
                    pending: 'Updating API key',
                    success: 'Updated API key'
                }
            )
            .then(async () => {
                closeEditModal()
            })
    }

    useEffect(() => {
        if (
            data != null &&
            data.key !== key &&
            data.value !== value &&
            data.enabled !== enabled &&
            data.notes !== notes
        )
            resetFields()
    }, [enabled, key, notes, resetFields, data, value])

    return (
        <tr data-testid='AdminSystemPreferencesItem'>
            <ConditionalTableCell key={'key'} condition={'key' in data}>
                {String(data.key)}
            </ConditionalTableCell>
            <ConditionalTableCell key={'value'} condition={'value' in data}>
                {String(data.value)}
            </ConditionalTableCell>
            <ConditionalTableCell key={'enabled'} condition={'enabled' in data}>
                {String(data.enabled ? 'Yes' : 'No')}
            </ConditionalTableCell>
            <ConditionalTableCell key={'notes'} condition={'notes' in data}>
                {String(data.notes)}
            </ConditionalTableCell>
            <TableActionsCell>
                <Button className='btn-circle' onClick={openEditModal}>
                    <FontAwesomeIcon icon='edit' />
                </Button>
                <Button variant='danger' className='btn-circle' onClick={openDeleteModal}>
                    <FontAwesomeIcon icon='times' />
                </Button>
                <Conditional condition={showDeleteModal}>
                    <OverlayCard
                        title='Confirm Delete'
                        actions={[
                            <Button
                                key='Delete'
                                variant='primary'
                                onClick={() => {
                                    void deleteSystemPreference()
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
                                disabled={!(Object.values(dirtyStates).some(Boolean) || dirtyPrivileges)}
                                onClick={(event) => {
                                    void submitHandler(event)
                                }}
                            >
                                Save & Close
                            </Button>,
                            <Button
                                key='Reset'
                                className='btn-default'
                                disabled={!(Object.values(dirtyStates).some(Boolean) || dirtyPrivileges)}
                                onClick={() => {
                                    resetFields()
                                    clearDirty()
                                }}
                            >
                                Reset
                            </Button>
                        ]}
                        onClose={() => {
                            closeEditModal()
                            resetFields()
                            clearDirty()

                            return false
                        }}
                    >
                        <Row className='spacious'>
                            <Col>
                                <FormControl
                                    formType='text'
                                    error={errorStates.key}
                                    value={key}
                                    onChange={(value) => {
                                        setKey(value)
                                        handleDirty('key', value.trim() !== data.key.trim())
                                        catchError(
                                            'key',
                                            typeof value === 'string',
                                            z.string().min(2).safeParse(value).success
                                        )
                                    }}
                                />
                            </Col>
                        </Row>

                        <Row className='spacious'>
                            <Col className='basis-full md:basis-1/2'>
                                <Row className='spacious'>
                                    <Col>
                                        <Card>
                                            <Card.Header>Value</Card.Header>
                                            <Card.Body>
                                                <FormControl
                                                    formType='text'
                                                    error={errorStates.value}
                                                    value={value ?? ''}
                                                    onChange={(value) => {
                                                        setValue(value)
                                                        handleDirty('value', value !== data.value)
                                                        catchError(
                                                            'value',
                                                            typeof value === 'string',
                                                            z.string().min(1).safeParse(value).success
                                                        )
                                                    }}
                                                />
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                                <Row className='spacious'>
                                    <Col>
                                        <Card>
                                            <Card.Header>Enabled</Card.Header>
                                            <Card.Body>
                                                <Toggle
                                                    checked={enabled}
                                                    onChange={(checked) => {
                                                        setEnabled(checked)
                                                        handleDirty('enabled', checked !== data.enabled)
                                                    }}
                                                >
                                                    Enabled
                                                </Toggle>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                                <Row className='spacious'>
                                    <Col>
                                        <Card>
                                            <Card.Header>Notes</Card.Header>
                                            <Card.Body>
                                                <FormControl
                                                    formType='textarea'
                                                    error={errorStates.notes}
                                                    value={notes ?? ''}
                                                    onChange={(value) => {
                                                        setNotes(value)
                                                        handleDirty('notes', value !== data.notes)
                                                        catchError(
                                                            'notes',
                                                            typeof value === 'string',
                                                            z.string().min(2).safeParse(value).success
                                                        )
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
                                                dispatchSettingAccessPrivileges(mutation)
                                                setDirtyPrivileges(true)
                                            }}
                                            value={settingAccessPrivileges}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </OverlayCard>
                </Conditional>
            </TableActionsCell>
        </tr>
    )
}

export default AdminSystemPreferencesItem

import { useCallback, useEffect, useMemo, useState, type FC, type MouseEvent } from 'react'

import { toast } from 'react-toastify'

import type { CreateSystemPreferenceProps } from './CreateSystemPreference.types'

import Button from '@/components/01-atoms/Button/Button'
import Col from '@/components/01-atoms/Col/Col'
import Conditional from '@/components/01-atoms/Conditional/Conditional'
import FormControl from '@/components/01-atoms/FormControl/FormControl'
import Row from '@/components/01-atoms/Row/Row'
import Toggle from '@/components/01-atoms/Toggle/Toggle'
import OverlayCard from '@/components/05-materials/OverlayCard/OverlayCard'
import PrivilegesSelectorCard from '@/components/05-materials/PrivilegesSelectorCard/PrivilegesSelectorCard'
import { useTablePageContext } from '@/components/05-materials/TablePage/TablePage.context'
import { AdminSystemPreferencesItemFields } from '@/components/07-pages/admin/AdminSystemPreferences/item/AdminSystemPreferencesItem.utils'

import { useGetAllPrivileges } from '@/lib/hooks/providers/PrivilegeService2/useGetAllPrivileges'
import useFormDirty from '@/lib/hooks/useFormDirty'
import useFormErrors from '@/lib/hooks/useFormErrors'
import { usePrivilegeCodesReducer, type PrivilegeCodesMutationArg } from '@/lib/hooks/usePrivilegeCodesReducer'
import PreferenceService2 from '@/lib/providers/PreferenceService2'

import type { BasePrivileges } from '@/types/records'

import Card from '../Card'

const CreateSystemPreference: FC<CreateSystemPreferenceProps> = () => {
    const { mutate } = useTablePageContext()

    const { data: systemPrivileges } = useGetAllPrivileges()

    const availablePrivileges: BasePrivileges = useMemo(() => {
        return [...(systemPrivileges ?? [])]
            .filter(Boolean)
            .map((p) => {
                if (typeof p !== 'string')
                    return {
                        code: p.code,
                        name: p.name
                    }
                else return null
            })
            .filter((p) => p != null) as BasePrivileges
    }, [systemPrivileges])

    const [showModal, setShowModal] = useState<boolean>(false)

    const openModal = (): void => {
        setShowModal(true)
    }

    const closeModal = (): void => {
        setShowModal(false)
    }

    const [key, setKey] = useState('')
    const [value, setValue] = useState('')
    const [enabled, setEnabled] = useState(false)
    const [notes, setNotes] = useState('')
    const [settingAccessPrivileges, dispatchSettingAccessPrivileges] = usePrivilegeCodesReducer([])

    const [errorStates, catchError, clearErrors] = useFormErrors(...AdminSystemPreferencesItemFields)
    const [dirtyStates, handleDirty, clearDirty] = useFormDirty(...AdminSystemPreferencesItemFields)
    const [dirtyPrivileges, setDirtyPrivileges] = useState(false)

    const resetFields = useCallback((): void => {
        setKey('')
        setValue('')
        setEnabled(false)
        setNotes('')
        dispatchSettingAccessPrivileges({
            action: 'replace',
            value: []
        })
        clearDirty()
        clearErrors()
    }, [clearDirty, clearErrors, dispatchSettingAccessPrivileges])

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
                    const newPreference = await PreferenceService2.getInstance().PutSystemPreference(
                        key,
                        value,
                        enabled,
                        notes
                    )

                    if (newPreference == null || typeof newPreference !== 'object')
                        throw new Error('Failed to create new system preference')

                    if (dirtyPrivileges)
                        await PreferenceService2.getInstance().PutSystemPreferencePrivileges(
                            newPreference.id,
                            settingAccessPrivileges.privileges
                        )
                },
                {
                    error: 'Failed to update this API key. Please contact your administrators',
                    pending: 'Creating API key',
                    success: 'Created API key'
                }
            )
            .then(async () => {
                resetFields()
                closeModal()
            })
    }

    useEffect(() => {
        if (!showModal) {
            console.debug('calling mutate')
            void mutate()
        }
    })

    return (
        <div className='' data-testid='CreateSystemPreference'>
            <Button
                variant='warning'
                onClick={() => {
                    openModal()
                }}
            >
                Create System Preference
            </Button>
            <Conditional condition={showModal}>
                <OverlayCard
                    title='Create System Preference'
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
                            }}
                        >
                            Reset
                        </Button>
                    ]}
                    onClose={() => {
                        closeModal()
                        resetFields()
                        clearDirty()

                        return false
                    }}
                >
                    <Row className='spacious'>
                        <Col>
                            <Card>
                                <Card.Header>Key</Card.Header>
                                <Card.Body>
                                    <FormControl
                                        formType='text'
                                        aria-placeholder='Key'
                                        placeholder='Key'
                                        error={errorStates.key}
                                        value={key}
                                        onChange={(value) => {
                                            setKey(value)
                                            handleDirty('key', true)
                                            catchError('key', typeof value === 'string')
                                        }}
                                    />
                                </Card.Body>
                            </Card>
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
                                                aria-placeholder='Value'
                                                placeholder='Value'
                                                error={errorStates.value}
                                                value={value ?? ''}
                                                onChange={(value) => {
                                                    setValue(value)
                                                    handleDirty('value', true)
                                                    catchError('value', typeof value === 'string')
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
                                                    handleDirty('enabled', true)
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
                                                aria-placeholder='Notes'
                                                placeholder='Notes'
                                                error={errorStates.notes}
                                                value={notes ?? ''}
                                                onChange={(value) => {
                                                    setNotes(value)
                                                    handleDirty('notes', true)
                                                    catchError('notes', typeof value === 'string')
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
        </div>
    )
}

export default CreateSystemPreference

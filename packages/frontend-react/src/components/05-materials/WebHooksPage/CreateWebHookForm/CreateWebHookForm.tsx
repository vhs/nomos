import { useCallback, useEffect, useMemo, useState, type FC, type MouseEvent } from 'react'

import { toast } from 'react-toastify'

import type { CreateWebHookFormProps } from './CreateWebHookForm.types'

import Button from '@/components/01-atoms/Button/Button'
import Col from '@/components/01-atoms/Col/Col'
import Conditional from '@/components/01-atoms/Conditional/Conditional'
import FormControl from '@/components/01-atoms/FormControl/FormControl'
import Row from '@/components/01-atoms/Row/Row'
import Toggle from '@/components/01-atoms/Toggle/Toggle'

import { useGetAllPrivileges } from '@/lib/hooks/providers/PrivilegeService2/useGetAllPrivileges'
import useFormDirty from '@/lib/hooks/useFormDirty'
import useFormErrors from '@/lib/hooks/useFormErrors'
import { usePrivilegeCodesReducer, type PrivilegeCodesMutationArg } from '@/lib/hooks/usePrivilegeCodesReducer'
import EventService2 from '@/lib/providers/EventService2'
import PreferenceService2 from '@/lib/providers/PreferenceService2'
import WebHookService2 from '@/lib/providers/WebHookService2'
import { zHTTPMethods, zUrl } from '@/lib/validators/common'

import type { BasePrivileges } from '@/types/records'

import OverlayCard from '../../OverlayCard/OverlayCard'
import PrivilegesSelectorCard from '../../PrivilegesSelectorCard/PrivilegesSelectorCard'
import { useTablePageContext } from '../../TablePage/TablePage.context'
import { webhookFields } from '../WebHooksPage.utils'

const CreateWebHookForm: FC<CreateWebHookFormProps> = () => {
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

    const [name, setName] = useState('')
    const [method, setMethod] = useState('')
    const [url, setUrl] = useState('')
    const [description, setDescription] = useState('')
    const [translation, setTranslation] = useState('')
    const [headers, setHeaders] = useState('')
    const [eventid, setEventId] = useState<null | number>(null)
    const [enabled, setEnabled] = useState(false)

    const [settingAccessPrivileges, dispatchSettingAccessPrivileges] = usePrivilegeCodesReducer([])

    const [errorStates, catchError, clearErrors] = useFormErrors(...Object.values(webhookFields).map((f) => f.title))
    const [dirtyStates, handleDirty, clearDirty] = useFormDirty(...Object.values(webhookFields).map((f) => f.title))
    const [dirtyPrivileges, setDirtyPrivileges] = useState(false)

    const resetFields = useCallback((): void => {
        setName('')
        setMethod('')
        setUrl('')
        setDescription('')
        setTranslation('')
        setHeaders('')
        setEventId(null)

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

        if (Object.values(errorStates).some(Boolean) || eventid == null) {
            toast.error('You have errors in your form. Please fix these first.')
            return
        }

        await toast
            .promise(
                async (): Promise<void> => {
                    const newPreference = await WebHookService2.getInstance().CreateHook(
                        name,
                        description,
                        enabled,
                        url,
                        translation,
                        headers,
                        method,
                        eventid
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
                    error: 'Failed to create this web hook. Please contact your administrators',
                    pending: 'Creating web hook',
                    success: 'Created web hook'
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

    useEffect(() => {
        void EventService2.getInstance()
            .GetAccessibleEvents()
            .then((response) => {
                console.debug('EventService2.getInstance().GetAccessibleEvents => response:', response)
            })
        void EventService2.getInstance()
            .GetDomainDefinitions()
            .then((response) => {
                console.debug('EventService2.getInstance().GetDomainDefinitions => response:', response)
            })
        void EventService2.getInstance()
            .GetEventTypes()
            .then((response) => {
                console.debug('EventService2.getInstance().GetEventTypes => response:', response)
            })
    }, [])

    return (
        <div className='' data-testid='CreateWebHookForm'>
            <Button
                variant='warning'
                onClick={() => {
                    openModal()
                }}
            >
                Create Web Hook
            </Button>
            <Conditional condition={showModal}>
                <OverlayCard
                    title='Create Web Hook'
                    actions={[
                        <Button
                            key='Create & Close'
                            variant='success'
                            disabled={!(Object.values(dirtyStates).some(Boolean) || dirtyPrivileges)}
                            onClick={(event) => {
                                void submitHandler(event)
                            }}
                        >
                            Create & Close
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
                            <label htmlFor='name'>
                                <strong>Name</strong>
                                <FormControl
                                    formType='text'
                                    id='name'
                                    ariaPlaceholder='Name'
                                    placeholder='Name'
                                    error={errorStates.name}
                                    value={name}
                                    onChange={(value) => {
                                        setName(value)
                                        handleDirty('name', true)
                                        catchError('name', typeof value === 'string')
                                    }}
                                />
                            </label>
                        </Col>
                    </Row>

                    <Row className='spacious flex-wrap'>
                        <Col className='basis-full lg:basis-1/6'>
                            <label htmlFor='method'>
                                <strong>Method</strong>
                                <FormControl
                                    id='method'
                                    ariaPlaceholder='Method'
                                    formType='dropdown'
                                    options={zHTTPMethods.options.map((m) => m.value)}
                                    error={errorStates.method}
                                    value={method}
                                    onChange={(value) => {
                                        setMethod(value.toUpperCase())
                                        handleDirty('method', true)
                                        catchError('method', zHTTPMethods.safeParse(value.toUpperCase()).success)
                                    }}
                                />
                            </label>
                        </Col>

                        <Col className='basis-full lg:basis-5/6'>
                            <label htmlFor='url'>
                                <strong>URL</strong>
                                <FormControl
                                    id='url'
                                    formType='url'
                                    ariaPlaceholder='URL'
                                    placeholder='URL'
                                    error={errorStates.url}
                                    value={url}
                                    onChange={(value) => {
                                        setName(value)
                                        handleDirty('url', true)
                                        catchError('url', zUrl.safeParse(value).success)
                                    }}
                                />
                            </label>
                        </Col>
                    </Row>

                    <Row className='spacious'>
                        <Col>
                            <label htmlFor='description'>
                                <strong>Description</strong>
                                <FormControl
                                    id='description'
                                    formType='text'
                                    ariaPlaceholder='Description'
                                    placeholder='Description'
                                    error={errorStates.description}
                                    value={description}
                                    onChange={(value) => {
                                        setDescription(value)
                                        handleDirty('description', true)
                                        catchError('description', typeof value === 'string')
                                    }}
                                />
                            </label>
                        </Col>
                    </Row>

                    <Row className='spacious'>
                        <Col>
                            <label htmlFor='translation'>
                                <strong>Translation</strong>
                                <FormControl
                                    id='translation'
                                    formType='text'
                                    ariaPlaceholder='Translation'
                                    placeholder='Translation'
                                    error={errorStates.translation}
                                    value={translation}
                                    onChange={(value) => {
                                        setTranslation(value)
                                        handleDirty('translation', true)
                                        catchError('translation', typeof value === 'string')
                                    }}
                                />
                            </label>
                        </Col>
                    </Row>

                    <Row className='spacious'>
                        <Col>
                            <label htmlFor='headers'>
                                <strong>Headers</strong>
                                <FormControl
                                    id='headers'
                                    formType='textarea'
                                    ariaPlaceholder='Headers'
                                    placeholder='Headers'
                                    error={errorStates.headers}
                                    value={headers}
                                    onChange={(value) => {
                                        setHeaders(value)
                                        handleDirty('headers', true)
                                        catchError('headers', typeof value === 'string')
                                    }}
                                    rows={5}
                                />
                            </label>
                        </Col>
                    </Row>

                    <Row className='spacious'>
                        <Col>
                            <label htmlFor='enabled'>
                                <strong>Enabled</strong>
                                <Toggle
                                    id='enabled'
                                    checked={enabled}
                                    onChange={(checked) => {
                                        setEnabled(checked)
                                    }}
                                >
                                    Enabled
                                </Toggle>
                            </label>
                        </Col>
                    </Row>

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
                </OverlayCard>
            </Conditional>
        </div>
    )
}

export default CreateWebHookForm

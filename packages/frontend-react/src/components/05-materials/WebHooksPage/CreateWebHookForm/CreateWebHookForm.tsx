import { type FC, type MouseEvent, useMemo, useState, useCallback, useEffect } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'
import { toast } from 'react-toastify'

import type { CreateWebHookFormProps, CreateWebHookFormTypes } from './CreateWebHookForm.types'

import Button from '@/components/01-atoms/Button/Button'
import Col from '@/components/01-atoms/Col/Col'
import Row from '@/components/01-atoms/Row/Row'
import Toggle from '@/components/01-atoms/Toggle/Toggle'
import FormCol from '@/components/02-molecules/FormCol/FormCol'
import FormControl from '@/components/04-composites/FormControl/FormControl'
import OverlayCard from '@/components/05-materials/OverlayCard/OverlayCard'
import PrivilegesSelectorCard from '@/components/05-materials/PrivilegesSelectorCard/PrivilegesSelectorCard'
import { useTablePageContext } from '@/components/05-materials/TablePage/TablePage.context'

import useGetAllPrivileges from '@/lib/hooks/providers/PrivilegeService2/useGetAllPrivileges'
import useToggleReducer from '@/lib/hooks/useToggleReducer'
import EventService2 from '@/lib/providers/EventService2'
import PreferenceService2 from '@/lib/providers/PreferenceService2'
import WebHookService2 from '@/lib/providers/WebHookService2'
import { convertPrivilegesArrayToBooleanRecord, getEnabledStateRecordKeys } from '@/lib/utils'
import { zHTTPMethod } from '@/lib/validators/common'

import type { BasePrivileges } from '@/types/records'

import { CreateWebHookFormSchema } from './CreateWebHookForm.schema'
import { CreateWebHookDefaultValues } from './CreateWebHookForm.utils'

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

    const form = useForm<CreateWebHookFormTypes>({
        resolver: zodResolver(CreateWebHookFormSchema),
        mode: 'onChange',
        defaultValues: CreateWebHookDefaultValues
    })

    const enabled = form.watch('enabled')

    const {
        state: privileges,
        dispatch: dispatchPrivileges,
        isDirty: isPrivilegesDirty
    } = useToggleReducer(convertPrivilegesArrayToBooleanRecord(availablePrivileges))

    const resetFields = useCallback((): void => {
        form.reset(CreateWebHookDefaultValues)
    }, [form])

    const submitHandler = async (event: MouseEvent<HTMLButtonElement>): Promise<void> => {
        event.preventDefault()

        if (!form.formState.isDirty) return

        const { name, description, enabled, url, translation, headers, method, eventId } = form.getValues()

        if (!form.formState.isValid || typeof eventId !== 'number') {
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
                        eventId
                    )

                    if (newPreference == null || typeof newPreference !== 'object')
                        throw new Error('Failed to create new system preference')

                    if (isPrivilegesDirty)
                        await PreferenceService2.getInstance().PutSystemPreferencePrivileges(
                            newPreference.id,
                            getEnabledStateRecordKeys(privileges)
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
        <div data-testid='CreateWebHookForm'>
            <Button
                variant='warning'
                onClick={() => {
                    openModal()
                }}
            >
                Create Web Hook
            </Button>
            <FormProvider {...form}>
                <OverlayCard
                    show={showModal}
                    title='Create Web Hook'
                    actions={[
                        <Button
                            key='Create & Close'
                            variant='success'
                            disabled={!form.formState.isDirty}
                            onClick={(event) => {
                                void submitHandler(event)
                            }}
                        >
                            Create & Close
                        </Button>,
                        <Button
                            key='Reset'
                            className='btn-default'
                            disabled={!form.formState.isDirty}
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

                        return false
                    }}
                >
                    <Row className='spacious'>
                        <FormCol error={form.formState.errors.name != null}>
                            <label htmlFor='name'>
                                <strong>Name</strong>
                                <FormControl
                                    id='name'
                                    formType='text'
                                    aria-placeholder='Name'
                                    placeholder='Name'
                                    error={form.formState.errors.name != null}
                                />
                            </label>
                        </FormCol>
                    </Row>

                    <Row className='spacious'>
                        <FormCol className='basis-full lg:basis-1/6' error={form.formState.errors.method != null}>
                            <label htmlFor='method'>
                                <strong>Method</strong>
                                <FormControl
                                    id='method'
                                    aria-placeholder='Method'
                                    formType='dropdown'
                                    options={zHTTPMethod.options.map((m) => m.value)}
                                    error={form.formState.errors.method != null}
                                />
                            </label>
                        </FormCol>

                        <FormCol className='basis-full lg:basis-5/6' error={form.formState.errors.url != null}>
                            <label htmlFor='url'>
                                <strong>URL</strong>
                                <FormControl
                                    id='url'
                                    formType='url'
                                    aria-placeholder='URL'
                                    placeholder='URL'
                                    error={form.formState.errors.url != null}
                                />
                            </label>
                        </FormCol>
                    </Row>

                    <Row className='spacious'>
                        <FormCol error={form.formState.errors.description != null}>
                            <label htmlFor='description'>
                                <strong>Description</strong>
                                <FormControl
                                    id='description'
                                    formType='text'
                                    aria-placeholder='Description'
                                    placeholder='Description'
                                    error={form.formState.errors.description != null}
                                />
                            </label>
                        </FormCol>
                    </Row>

                    <Row className='spacious'>
                        <FormCol error={form.formState.errors.translation != null}>
                            <label htmlFor='translation'>
                                <strong>Translation</strong>
                                <FormControl
                                    id='translation'
                                    formType='text'
                                    aria-placeholder='Translation'
                                    placeholder='Translation'
                                    error={form.formState.errors.translation != null}
                                />
                            </label>
                        </FormCol>
                    </Row>

                    <Row className='spacious'>
                        <FormCol error={form.formState.errors.headers != null}>
                            <label htmlFor='headers'>
                                <strong>Headers</strong>
                                <FormControl
                                    id='headers'
                                    formType='textarea'
                                    aria-placeholder='Headers'
                                    placeholder='Headers'
                                    error={form.formState.errors.headers != null}
                                    rows={5}
                                />
                            </label>
                        </FormCol>
                    </Row>

                    <Row className='spacious'>
                        <Col>
                            <label htmlFor='enabled'>
                                <strong>Enabled</strong>
                                <Toggle
                                    id='enabled'
                                    checked={enabled}
                                    onChange={(checked) => {
                                        form.setValue('enabled', checked, { shouldValidate: true, shouldDirty: true })
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
                </OverlayCard>
            </FormProvider>
        </div>
    )
}

export default CreateWebHookForm

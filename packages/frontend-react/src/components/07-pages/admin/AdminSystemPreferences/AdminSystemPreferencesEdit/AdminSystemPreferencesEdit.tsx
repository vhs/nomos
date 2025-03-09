import { useCallback, useEffect, useMemo, type FC, type MouseEvent } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useParams, useRouter } from '@tanstack/react-router'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import type { AdminSystemPreferencesEditProps, SystemPreferenceSchema } from './AdminSystemPreferencesEdit.types'

import Button from '@/components/01-atoms/Button/Button'
import Col from '@/components/01-atoms/Col/Col'
import Row from '@/components/01-atoms/Row/Row'
import Toggle from '@/components/01-atoms/Toggle/Toggle'
import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'
import Card from '@/components/04-composites/Card/Card'
import FormControl from '@/components/04-composites/FormControl/FormControl'
import OverlayCard from '@/components/05-materials/OverlayCard/OverlayCard'
import PrivilegesSelectorCard from '@/components/05-materials/PrivilegesSelectorCard/PrivilegesSelectorCard'
import { useTablePageContext } from '@/components/05-materials/TablePage/TablePage.context'

import useGetSystemPreference from '@/lib/hooks/providers/PreferenceService2/useGetSystemPreference'
import useGetAllPrivileges from '@/lib/hooks/providers/PrivilegeService2/useGetAllPrivileges'
import useToggleReducer from '@/lib/hooks/useToggleReducer'
import PreferenceService2 from '@/lib/providers/PreferenceService2'
import { getEnabledStateRecordKeys, mergePrivilegesArrayToBooleanRecord } from '@/lib/utils'

import type { SystemPreference } from '@/types/validators/records'

import { zSystemPreferenceSchema } from '../AdminSystemPreferences.schema'
import { SystemPreferenceDefaultValues } from '../AdminSystemPreferences.utils'

const AdminSystemPreferencesEdit: FC<AdminSystemPreferencesEditProps> = () => {
    const { mutate } = useTablePageContext()
    const router = useRouter()

    const systemPreferenceId = useParams({
        from: '/_admin/admin/systempreferences/$preferenceId',
        select: ({ preferenceId }): string => preferenceId
    })

    const {
        data: systemPreference,
        isLoading,
        mutate: mutateSystemPreference
    } = useGetSystemPreference(systemPreferenceId)

    const { data: allPrivileges } = useGetAllPrivileges()

    const form = useForm<SystemPreferenceSchema>({
        resolver: zodResolver(zSystemPreferenceSchema),
        mode: 'onChange',
        defaultValues: SystemPreferenceDefaultValues
    })

    const enabled = form.watch('enabled')

    const errors = useMemo(() => form.formState.errors, [form.formState.errors])
    const isDirty = useMemo(() => form.formState.isDirty, [form.formState.isDirty])
    const isValid = useMemo(() => form.formState.isValid, [form.formState.isValid])

    const {
        state: privileges,
        dispatch: dispatchPrivileges,
        isDirty: isPrivilegesDirty
    } = useToggleReducer(mergePrivilegesArrayToBooleanRecord(allPrivileges, systemPreference?.privileges))

    const resetFields = useCallback(
        (systemPreference?: SystemPreference): void => {
            const data: SystemPreferenceSchema =
                systemPreference != null
                    ? {
                          key: systemPreference.key,
                          value: systemPreference.value,
                          enabled: Boolean(systemPreference.enabled),
                          notes: systemPreference.notes ?? ''
                      }
                    : SystemPreferenceDefaultValues

            form.reset(data)

            dispatchPrivileges({
                action: 'update-defaults',
                value: mergePrivilegesArrayToBooleanRecord(allPrivileges, systemPreference?.privileges)
            })
        },
        [allPrivileges, dispatchPrivileges, form]
    )

    const submitHandler = async (event: MouseEvent<HTMLButtonElement>): Promise<void> => {
        event.preventDefault()

        if (systemPreference == null) {
            toast.error('Missing system preference information')
            return
        }

        if (!isDirty) return

        if (!isValid) {
            toast.error('You have errors in your form. Please fix these first.')
            return
        }

        const { key, value, enabled, notes } = form.getValues()

        await toast
            .promise(
                async (): Promise<void> => {
                    if (isDirty)
                        await PreferenceService2.getInstance().UpdateSystemPreference(
                            systemPreference.id,
                            key,
                            value,
                            enabled,
                            notes ?? ''
                        )
                    if (isPrivilegesDirty)
                        await PreferenceService2.getInstance().PutSystemPreferencePrivileges(
                            systemPreference.id,
                            getEnabledStateRecordKeys(privileges)
                        )

                    await mutate()
                    await mutateSystemPreference()
                },
                {
                    error: 'Failed to update this System Preference. Please contact your administrators',
                    pending: 'Updating System Preference',
                    success: 'Updated System Preference'
                }
            )
            .then(() => {
                void mutate()

                void router.navigate({ to: '/admin/systempreferences' })
            })
    }

    useEffect(() => {
        if (systemPreference != null) resetFields(systemPreference)
    }, [resetFields, systemPreference])

    if (isLoading || systemPreference == null) return <LoadingOverlay />

    return (
        <FormProvider {...form}>
            <OverlayCard
                title='Edit System Preference'
                actions={[
                    <Button
                        key='Save & Close'
                        variant='success'
                        disabled={!isDirty && !isPrivilegesDirty}
                        onClick={(event) => {
                            void submitHandler(event)
                        }}
                    >
                        Save & Close
                    </Button>,
                    <Button
                        key='Reset'
                        className='btn-default'
                        disabled={!isDirty && !isPrivilegesDirty}
                        onClick={() => {
                            resetFields(systemPreference)
                        }}
                    >
                        Reset
                    </Button>
                ]}
                onClose={() => {
                    resetFields(systemPreference)

                    return true
                }}
            >
                <Row className='spacious'>
                    <Col>
                        <Card error={errors.key != null}>
                            <Card.Header>Code</Card.Header>
                            <Card.Body>
                                <FormControl formKey='key' formType='text' error={errors.key != null} />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row className='spacious'>
                    <Col className='basis-full md:basis-1/2'>
                        <Row className='spacious'>
                            <Col>
                                <Card error={errors.value != null}>
                                    <Card.Header>Value</Card.Header>
                                    <Card.Body>
                                        <FormControl formKey='value' formType='text' error={errors.value != null} />
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
                                            id='enabled'
                                            checked={enabled}
                                            onChange={(checked) => {
                                                form.setValue('enabled', checked, {
                                                    shouldValidate: true,
                                                    shouldDirty: true
                                                })
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
                                <Card error={errors.notes != null}>
                                    <Card.Header>Notes</Card.Header>
                                    <Card.Body>
                                        <FormControl formKey='notes' formType='textarea' error={errors.notes != null} />
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                    <Col className='basis-full md:basis-1/2'>
                        <Row className='spacious'>
                            <Col>
                                <PrivilegesSelectorCard
                                    title='Accessible by Roles'
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
    )
}

export default AdminSystemPreferencesEdit

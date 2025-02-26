import { useCallback, useMemo, type FC, type MouseEvent } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from '@tanstack/react-router'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import type { AdminSystemPreferencesNewForm, AdminSystemPreferencesNewProps } from './AdminSystemPreferencesNew.types'

import Button from '@/components/01-atoms/Button/Button'
import Col from '@/components/01-atoms/Col/Col'
import Row from '@/components/01-atoms/Row/Row'
import Toggle from '@/components/01-atoms/Toggle/Toggle'
import Card from '@/components/04-composites/Card/Card'
import FormControl from '@/components/04-composites/FormControl/FormControl'
import OverlayCard from '@/components/05-materials/OverlayCard/OverlayCard'
import PrivilegesSelectorCard from '@/components/05-materials/PrivilegesSelectorCard/PrivilegesSelectorCard'
import { useTablePageContext } from '@/components/05-materials/TablePage/TablePage.context'

import useGetAllPrivileges from '@/lib/hooks/providers/PrivilegeService2/useGetAllPrivileges'
import useToggleReducer from '@/lib/hooks/useToggleReducer'
import PreferenceService2 from '@/lib/providers/PreferenceService2'
import { convertPrivilegesArrayToBooleanRecord, getEnabledStateRecordKeys } from '@/lib/utils'

import type { BasePrivileges } from '@/types/records'

import { AdminSystemPreferencesNewSchema } from './AdminSystemPreferencesNew.schema'
import { AdminSystemPreferencesNewDefaultValues } from './AdminSystemPreferencesNew.utils'

const AdminSystemPreferencesNew: FC<AdminSystemPreferencesNewProps> = () => {
    const { mutate } = useTablePageContext()
    const router = useRouter()

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

    const form = useForm<AdminSystemPreferencesNewForm>({
        resolver: zodResolver(AdminSystemPreferencesNewSchema),
        mode: 'onChange',
        defaultValues: AdminSystemPreferencesNewDefaultValues
    })

    const enabled = form.watch('enabled')

    const isValid = useMemo(() => form.formState.isValid, [form.formState.isValid])
    const errors = useMemo(() => form.formState.errors, [form.formState.errors])

    const {
        state: privileges,
        dispatch: dispatchPrivileges,
        isDirty: isPrivilegesDirty
    } = useToggleReducer(convertPrivilegesArrayToBooleanRecord(availablePrivileges, false))

    const resetFields = useCallback((): void => {
        form.reset(AdminSystemPreferencesNewDefaultValues)
    }, [form])

    const submitHandler = async (event: MouseEvent<HTMLButtonElement>): Promise<void> => {
        event.preventDefault()

        if (!form.formState.isDirty) return

        if (!isValid) {
            toast.error('You have errors in your form. Please fix these first.')
            console.error(errors)
            return
        }

        const { key, value, enabled, notes } = form.getValues()

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

                    if (isPrivilegesDirty)
                        await PreferenceService2.getInstance().PutSystemPreferencePrivileges(
                            newPreference.id,
                            getEnabledStateRecordKeys(privileges)
                        )
                },
                {
                    error: 'Failed to update this system preference. Please contact your administrators',
                    pending: 'Creating system preference',
                    success: 'Created system preference'
                }
            )
            .then(async () => {
                resetFields()
                void mutate()

                void router.navigate({ to: '/admin/systempreferences' })
            })
    }

    return (
        <FormProvider {...form}>
            <OverlayCard
                title='Create System Preference'
                actions={[
                    <Button
                        key='Save & Close'
                        variant='success'
                        disabled={!form.formState.isDirty}
                        onClick={(event) => {
                            void submitHandler(event)
                        }}
                    >
                        Save & Close
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
                    resetFields()

                    void router.navigate({ to: '/admin/systempreferences' })

                    return false
                }}
            >
                <Row className='spacious'>
                    <Col>
                        <Card>
                            <Card.Header>Key</Card.Header>
                            <Card.Body>
                                <FormControl
                                    id='key'
                                    formType='text'
                                    aria-placeholder='Key'
                                    placeholder='Key'
                                    error={form.formState.errors.key != null}
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
                                            id='value'
                                            formType='text'
                                            aria-placeholder='Value'
                                            placeholder='Value'
                                            error={form.formState.errors.value != null}
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
                                <Card>
                                    <Card.Header>Notes</Card.Header>
                                    <Card.Body>
                                        <FormControl
                                            id='notes'
                                            formType='textarea'
                                            aria-placeholder='Notes'
                                            placeholder='Notes'
                                            error={form.formState.errors.notes != null}
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
        </FormProvider>
    )
}

export default AdminSystemPreferencesNew

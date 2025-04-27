import { useCallback, useEffect, useMemo, type FC } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useParams } from '@tanstack/react-router'
import { useForm, FormProvider } from 'react-hook-form'
import { toast } from 'react-toastify'

import type { PrivilegesEditProps } from './PrivilegesEdit.types'
import type { AdminPrivilegeItemSchema } from '../Privileges.types'

import Button from '@/components/01-atoms/Button/Button'
import Col from '@/components/01-atoms/Col/Col'
import Popover from '@/components/01-atoms/Popover/Popover'
import Row from '@/components/01-atoms/Row/Row'
import Toggle from '@/components/01-atoms/Toggle/Toggle'
import FormCol from '@/components/02-molecules/FormCol/FormCol'
import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'
import FormControl from '@/components/04-composites/FormControl/FormControl'
import OverlayCard from '@/components/05-materials/OverlayCard/OverlayCard'
import { useTablePageContext } from '@/components/05-materials/TablePage/TablePage.context'

import { isString } from '@/lib/guards/common'
import useGetPrivilege from '@/lib/hooks/providers/PrivilegeService2/useGetPrivilege'
import PrivilegeService2 from '@/lib/providers/PrivilegeService2'
import { checkValidIcon } from '@/lib/ui/fontawesome'

import { zAdminPrivilegeItemSchema } from '../Privileges.schema'

const PrivilegesEdit: FC<PrivilegesEditProps> = () => {
    const { mutate } = useTablePageContext()

    const privilegeId = useParams({
        from: '/_admin/admin/privileges/$privilegeId',
        select: ({ privilegeId }): number => Number(privilegeId)
    })

    const { data: privilege, isLoading, mutate: mutatePrivilege } = useGetPrivilege(privilegeId)

    const form = useForm<AdminPrivilegeItemSchema>({
        resolver: zodResolver(zAdminPrivilegeItemSchema),
        mode: 'onChange',
        defaultValues: privilege
    })

    const enabled = form.watch('enabled')
    const icon = form.watch('icon')

    const errors = useMemo(() => form.formState.errors, [form.formState.errors])
    const isDirty = useMemo(() => form.formState.isDirty, [form.formState.isDirty])
    const isValid = useMemo(() => form.formState.isValid, [form.formState.isValid])

    const submitHandler = form.handleSubmit(async ({ name, description, icon, enabled }): Promise<void> => {
        await toast.promise(
            async (): Promise<void> => {
                if (form.formState.dirtyFields.name != null)
                    await PrivilegeService2.getInstance().UpdatePrivilegeName(privilegeId, name)
                if (form.formState.dirtyFields.description != null && isString(description))
                    await PrivilegeService2.getInstance().UpdatePrivilegeDescription(privilegeId, description)
                if (form.formState.dirtyFields.icon != null && isString(icon))
                    await PrivilegeService2.getInstance().UpdatePrivilegeIcon(privilegeId, icon)
                if (form.formState.dirtyFields.enabled != null)
                    await PrivilegeService2.getInstance().UpdatePrivilegeEnabled(privilegeId, enabled)

                await mutatePrivilege()
                await mutate()
            },
            {
                pending: 'Updating privilege',
                success: 'Privilege updated',
                error: 'An unknown error occured. Please notify your administrators!'
            }
        )
    })

    const hydrateDefaults = useCallback((): void => {
        form.reset(privilege)
    }, [privilege, form])

    useEffect(() => {
        hydrateDefaults()
    }, [hydrateDefaults, privilege])

    if (isLoading || privilege == null) return <LoadingOverlay />

    return (
        <OverlayCard
            title={`Edit Privilege - ${privilege.name} (${privilege.code})`}
            closeLabel='Close'
            actions={[
                <Button
                    key='Save'
                    variant='success'
                    className='btn-success'
                    disabled={!isDirty || !isValid}
                    onClick={(event) => {
                        void submitHandler(event)
                    }}
                >
                    Save
                </Button>,
                <Button
                    key='Reset'
                    variant='primary'
                    disabled={!isDirty}
                    onClick={() => {
                        hydrateDefaults()
                    }}
                >
                    Reset
                </Button>
            ]}
        >
            <FormProvider {...form}>
                <Row>
                    <FormCol error={errors.name}>
                        <label htmlFor='name'>
                            <strong>Name</strong>
                            <FormControl formKey='name' formType='text' />
                        </label>
                    </FormCol>
                </Row>

                <Row>
                    <FormCol error={errors.description}>
                        <label htmlFor='description'>
                            <strong>Description</strong>
                            <FormControl formKey='description' formType='text' />
                        </label>
                    </FormCol>
                </Row>

                <Row>
                    <FormCol error={errors.icon}>
                        <label htmlFor='icon'>
                            <div className='inline'>
                                <Popover
                                    className='inline'
                                    content={<strong>Icon</strong>}
                                    popover={'This is the FontAwesome icon name.'}
                                />{' '}
                            </div>

                            <FormControl
                                formKey='icon'
                                formType='text'
                                className={!checkValidIcon(icon) ? 'border-orange-500' : undefined}
                                errorMessage={errors.icon?.message}
                            />
                        </label>
                    </FormCol>
                </Row>

                <Row>
                    <FormCol error={errors.enabled}>
                        <Toggle
                            checked={enabled}
                            onChange={(change) => {
                                form.setValue('enabled', change, {
                                    shouldValidate: true,
                                    shouldDirty: true
                                })
                            }}
                        >
                            Enabled
                        </Toggle>
                    </FormCol>
                </Row>

                <Row>
                    <Col></Col>
                </Row>
            </FormProvider>
        </OverlayCard>
    )
}

export default PrivilegesEdit

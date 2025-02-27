import { useCallback, useEffect, useMemo, useState, type FC, type MouseEvent } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import useSWR from 'swr'

import type { AdminPrivilegesItemProps } from './AdminPrivilegesItem.types'
import type { AdminPrivilegeItemForm } from '../AdminPrivileges.types'

import Button from '@/components/01-atoms/Button/Button'
import Col from '@/components/01-atoms/Col/Col'
import Conditional from '@/components/01-atoms/Conditional/Conditional'
import FontAwesomeIcon from '@/components/01-atoms/FontAwesomeIcon/FontAwesomeIcon'
import Popover from '@/components/01-atoms/Popover/Popover'
import Row from '@/components/01-atoms/Row/Row'
import TablePageRow from '@/components/01-atoms/TablePageRow/TablePageRow'
import Toggle from '@/components/01-atoms/Toggle/Toggle'
import ConditionalTableCell from '@/components/02-molecules/ConditionalTableCell/ConditionalTableCell'
import FormCol from '@/components/02-molecules/FormCol/FormCol'
import PrivilegeIcon from '@/components/02-molecules/PrivilegeIcon/PrivilegeIcon'
import FormControl from '@/components/04-composites/FormControl/FormControl'
import OverlayCard from '@/components/05-materials/OverlayCard/OverlayCard'
import { useTablePageContext } from '@/components/05-materials/TablePage/TablePage.context'

import PrivilegeService2 from '@/lib/providers/PrivilegeService2'
import { checkValidIcon } from '@/lib/ui/fontawesome'
import { isString } from '@/lib/validators/guards'

import type { Privilege } from '@/types/records'

import { AdminPrivilegeItemSchema } from '../AdminPrivileges.schema'

const AdminPrivilegesItem: FC<AdminPrivilegesItemProps> = ({ data }) => {
    const { mutate } = useTablePageContext()

    const privilegeId = Number(data.id)

    const privilegeUrl = useMemo(
        () => `/services/v2/PrivilegeService2.svc/GetPrivilege?id=${privilegeId}`,
        [privilegeId]
    )

    const { data: privilege, isLoading, mutate: mutatePrivilege } = useSWR<Privilege>(privilegeUrl)

    const form = useForm<AdminPrivilegeItemForm>({
        resolver: zodResolver(AdminPrivilegeItemSchema),
        mode: 'onChange',
        defaultValues: data
    })

    const enabled = form.watch('enabled')
    const icon = form.watch('icon')

    const [showModal, setShowModal] = useState<boolean>(false)

    const submitHandler = async (event: MouseEvent<HTMLButtonElement>): Promise<void> => {
        event.preventDefault()

        if (privilege == null) {
            toast.error('Missing privilege information')
            return
        }

        if (!form.formState.isDirty) {
            toast.warn('No changes detected!')
            return
        }

        if (!form.formState.isValid) {
            toast.error(`Please fix the errors before continuing`)
            return
        }

        const loadingToastId = toast.loading('Updating privilege')

        const { name, description, icon, enabled } = form.getValues()

        try {
            if (form.formState.dirtyFields.name != null)
                await PrivilegeService2.getInstance().UpdatePrivilegeName(privilegeId, name)
            if (form.formState.dirtyFields.description != null && isString(description))
                await PrivilegeService2.getInstance().UpdatePrivilegeDescription(privilegeId, description)
            if (form.formState.dirtyFields.icon != null && isString(icon))
                await PrivilegeService2.getInstance().UpdatePrivilegeIcon(privilegeId, icon)
            if (form.formState.dirtyFields.enabled != null)
                await PrivilegeService2.getInstance().UpdatePrivilegeEnabled(privilegeId, enabled)

            toast.update(loadingToastId, {
                render: 'Privilege updated',
                type: 'success',
                isLoading: false,
                autoClose: 5000
            })

            await mutatePrivilege()
            await mutate()
        } catch (err) {
            toast.update(loadingToastId, {
                render: 'An unknown error occured. Please notify your administrators!',
                type: 'error',
                isLoading: false,
                autoClose: 5000
            })
            console.error(err)
        }
    }

    const togglePrivilegeEnabled = async (): Promise<void> => {
        const newEnabledStatus = !(privilege?.enabled ?? false)

        const toastId = toast.loading(
            `Updating ${privilege?.name} status to ${newEnabledStatus ? 'enabled' : 'disabled'}`
        )

        try {
            await PrivilegeService2.getInstance().UpdatePrivilegeEnabled(privilegeId, newEnabledStatus)
            toast.update(toastId, { render: `Refreshing privilege`, type: 'success', isLoading: true })
            await mutatePrivilege()
            toast.update(toastId, {
                render: `Updated ${privilege?.name} status`,
                type: 'success',
                isLoading: false,
                autoClose: 3000
            })
        } catch (err) {
            console.error(err)
            toast.update(toastId, {
                render: `Failed to update ${privilege?.name} status`,
                type: 'error',
                isLoading: false,
                autoClose: 3000
            })
        }
    }

    const hydrateDefaults = useCallback((): void => {
        form.reset(data)
    }, [data, form])

    useEffect(() => {
        hydrateDefaults()
    }, [hydrateDefaults, privilege])

    if (isLoading || privilege == null)
        return (
            <tr>
                {Object.keys(data).map((field) => (
                    <td key={field}>&nbsp;</td>
                ))}
            </tr>
        )

    return (
        <>
            <TablePageRow data-testid='AdminPrivilegesItem'>
                <ConditionalTableCell condition={'name' in data}>{privilege?.name}</ConditionalTableCell>
                <ConditionalTableCell condition={'code' in data}>{privilege?.code}</ConditionalTableCell>
                <ConditionalTableCell condition={'description' in data}>{privilege?.description}</ConditionalTableCell>
                <ConditionalTableCell condition={'icon' in data}>
                    <Popover
                        content={
                            <PrivilegeIcon
                                className={
                                    !isString(privilege?.icon) && !checkValidIcon(privilege?.icon)
                                        ? 'text-red-500'
                                        : undefined
                                }
                                icon={privilege?.icon}
                                size='xl'
                            />
                        }
                        popover={isString(privilege?.icon) ? privilege?.icon.toString() : 'Not set'}
                    />
                </ConditionalTableCell>
                <ConditionalTableCell condition={'enabled' in data}>
                    <Toggle
                        checked={privilege?.enabled}
                        onChange={() => {
                            void togglePrivilegeEnabled()
                        }}
                    />
                </ConditionalTableCell>
                <td className='max-w-16'>
                    <Button
                        className='mx-1 h-10 w-10 rounded-3xl'
                        onClick={() => {
                            setShowModal(true)
                        }}
                    >
                        <FontAwesomeIcon icon='edit' />
                    </Button>
                    <Button className='mx-1 h-10 w-10 rounded-3xl' variant='danger'>
                        <FontAwesomeIcon icon='times' />
                    </Button>
                    <Conditional condition={showModal}>
                        <FormProvider {...form}>
                            <OverlayCard
                                title={`Edit Privilege - ${privilege.name} (${privilege.code})`}
                                onClose={() => {
                                    setShowModal(false)
                                    return false
                                }}
                                closeLabel='Close'
                                actions={[
                                    <Button
                                        key='Save'
                                        variant='success'
                                        className='btn-success'
                                        disabled={!form.formState.isDirty}
                                        onClick={(event) => {
                                            void submitHandler(event)
                                        }}
                                    >
                                        Save
                                    </Button>,
                                    <Button
                                        key='Reset'
                                        variant='primary'
                                        disabled={!form.formState.isDirty}
                                        onClick={() => {
                                            hydrateDefaults()
                                        }}
                                    >
                                        Reset
                                    </Button>
                                ]}
                            >
                                <Row className='spacious'>
                                    <FormCol error={form.formState.errors.name != null}>
                                        <label htmlFor='name'>
                                            <strong>Name</strong>
                                            <FormControl formKey='name' formType='text' />
                                        </label>
                                    </FormCol>
                                </Row>

                                <Row className='spacious'>
                                    <FormCol error={form.formState.errors.description != null}>
                                        <label htmlFor='description'>
                                            <strong>Description</strong>
                                            <FormControl formKey='description' formType='text' />
                                        </label>
                                    </FormCol>
                                </Row>

                                <Row className='spacious'>
                                    <FormCol error={form.formState.errors.icon != null}>
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
                                                errorMessage={form.formState.errors.icon?.message}
                                            />
                                        </label>
                                    </FormCol>
                                </Row>

                                <Row className='spacious'>
                                    <FormCol error={form.formState.errors.enabled != null}>
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

                                <Row className='spacious'>
                                    <Col></Col>
                                </Row>
                            </OverlayCard>
                        </FormProvider>
                    </Conditional>
                </td>
            </TablePageRow>
        </>
    )
}

export default AdminPrivilegesItem

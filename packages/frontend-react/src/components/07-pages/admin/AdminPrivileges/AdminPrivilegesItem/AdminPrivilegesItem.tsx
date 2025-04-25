import { useCallback, useEffect, useMemo, type FC } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import useSWR from 'swr'

import type { AdminPrivilegeItemSchema, AdminPrivilegesItemProps } from './AdminPrivilegesItem.types'

import Button from '@/components/01-atoms/Button/Button'
import FontAwesomeIcon from '@/components/01-atoms/FontAwesomeIcon/FontAwesomeIcon'
import Popover from '@/components/01-atoms/Popover/Popover'
import TableActionsCell from '@/components/01-atoms/TableActionsCell/TableActionsCell'
import TablePageRow from '@/components/01-atoms/TablePageRow/TablePageRow'
import Toggle from '@/components/01-atoms/Toggle/Toggle'
import PrivilegeIcon from '@/components/02-molecules/PrivilegeIcon/PrivilegeIcon'
import TableDataCell from '@/components/02-molecules/TableDataCell/TableDataCell'

import { isString } from '@/lib/guards/common'
import PrivilegeService2 from '@/lib/providers/PrivilegeService2'
import { checkValidIcon } from '@/lib/ui/fontawesome'

import type { Privilege } from '@/types/validators/records'

import { zAdminPrivilegeItemSchema } from '../AdminPrivileges.schema'

const AdminPrivilegesItem: FC<AdminPrivilegesItemProps> = ({ fields, data }) => {
    const router = useRouter()

    const privilegeId = Number(data.id)

    const privilegeUrl = useMemo(
        () => `/services/v2/PrivilegeService2.svc/GetPrivilege?id=${privilegeId}`,
        [privilegeId]
    )

    const { data: privilege, isLoading, mutate: mutatePrivilege } = useSWR<Privilege>(privilegeUrl)

    const form = useForm<AdminPrivilegeItemSchema>({
        resolver: zodResolver(zAdminPrivilegeItemSchema),
        mode: 'onChange',
        defaultValues: data
    })

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
            <TablePageRow>
                {Object.keys(data).map((field) => (
                    <TableDataCell key={field}>&nbsp;</TableDataCell>
                ))}
            </TablePageRow>
        )

    return (
        <>
            <TablePageRow data-testid='AdminPrivilegesItem'>
                <TableDataCell condition={fields.Name}>{privilege?.name}</TableDataCell>
                <TableDataCell condition={fields.Code}>{privilege?.code}</TableDataCell>
                <TableDataCell condition={fields.Description}>{privilege?.description}</TableDataCell>
                <TableDataCell condition={fields.Icon}>
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
                </TableDataCell>
                <TableDataCell condition={fields.Enabled}>
                    <Toggle
                        checked={privilege?.enabled}
                        onChange={() => {
                            void togglePrivilegeEnabled()
                        }}
                    />
                </TableDataCell>
                <TableActionsCell className='max-w-16'>
                    <Button
                        className='mx-1 h-10 w-10 rounded-3xl'
                        onClick={() => {
                            void router.navigate({
                                to: `/admin/privileges/$privilegeId`,
                                params: {
                                    privilegeId: privilegeId.toString()
                                }
                            })
                        }}
                    >
                        <FontAwesomeIcon icon='edit' />
                    </Button>
                    <Button className='mx-1 h-10 w-10 rounded-3xl' variant='danger'>
                        <FontAwesomeIcon icon='times' />
                    </Button>
                </TableActionsCell>
            </TablePageRow>
        </>
    )
}

export default AdminPrivilegesItem

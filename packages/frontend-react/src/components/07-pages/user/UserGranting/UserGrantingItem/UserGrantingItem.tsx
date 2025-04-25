import { useMemo, useState, type FC } from 'react'

import { PencilSquareIcon } from '@heroicons/react/24/solid'
import { toast } from 'react-toastify'

import type { UserGrantingItemProps } from './UserGrantingItem.types'

import Button from '@/components/01-atoms/Button/Button'
import TablePageRow from '@/components/01-atoms/TablePageRow/TablePageRow'
import TableDataCell from '@/components/02-molecules/TableDataCell/TableDataCell'
import OverlayCard from '@/components/05-materials/OverlayCard/OverlayCard'
import PrivilegesSelectorCard from '@/components/05-materials/PrivilegesSelectorCard/PrivilegesSelectorCard'

import { isStrings, isStringStringRecord } from '@/lib/guards/common'
import useGetUserGrantablePrivileges from '@/lib/hooks/providers/UserService2/useGetUserGrantablePrivileges'
import UserService2 from '@/lib/providers/UserService2'
import { convertPrivilegesArrayToBooleanRecord } from '@/lib/utils'

import type { PrivilegeMutation } from '@/types/common'

const UserGrantingItem: FC<UserGrantingItemProps> = ({ user, grantablePrivileges }) => {
    const { id, username, fname, lname, email } = user

    const [showModal, setShowModal] = useState(false)

    const { data: userGrantablePrivileges, mutate: mutateUserGrantablePrivileges } = useGetUserGrantablePrivileges(
        user.id
    )

    const activeUserPrivileges = useMemo(() => {
        const basePrivileges = convertPrivilegesArrayToBooleanRecord(grantablePrivileges, false)

        if (userGrantablePrivileges != null) {
            if (isStrings(userGrantablePrivileges) && !isStringStringRecord(userGrantablePrivileges))
                Object.values(userGrantablePrivileges).forEach((code) => {
                    basePrivileges[code as string] = true
                })
            else if (isStringStringRecord(userGrantablePrivileges))
                Object.values(userGrantablePrivileges).forEach((code) => {
                    basePrivileges[code] = false
                })
        }

        return basePrivileges
    }, [grantablePrivileges, userGrantablePrivileges])

    const togglePrivilege = async (mutation: PrivilegeMutation): Promise<void> => {
        const { privilege: privilegeCode, state } = mutation

        await toast.promise(
            async (): Promise<void> => {
                if (state) {
                    await UserService2.getInstance().GrantPrivilege(id, privilegeCode)
                } else {
                    await UserService2.getInstance().RevokePrivilege(id, privilegeCode)
                }

                await mutateUserGrantablePrivileges()
            },
            {
                error: 'An unknown error occured! Please notify your administrators',
                pending: 'Updating user privileges!',
                success: {
                    autoClose: 1500,
                    render: 'Updated user privileges!'
                }
            }
        )
    }

    return (
        <>
            <TablePageRow data-testid='UserGrantingItem'>
                <TableDataCell className='text-center'>{username}</TableDataCell>
                <TableDataCell className='text-center'>
                    {fname} {lname}
                </TableDataCell>
                <TableDataCell className='text-center'>{email}</TableDataCell>
                <TableDataCell className='text-center'>
                    <Button
                        variant='primary'
                        className='btn-circle h-10 w-10 text-white'
                        onClick={() => {
                            setShowModal(true)
                        }}
                    >
                        <PencilSquareIcon className='h-4 w-4' />
                    </Button>
                </TableDataCell>
            </TablePageRow>
            <OverlayCard
                title={`Grant Privileges for ${fname} ${lname}`}
                show={showModal}
                onClose={() => {
                    setShowModal(false)
                    return false
                }}
            >
                <PrivilegesSelectorCard
                    customPrivileges={grantablePrivileges}
                    onUpdate={(mutation) => {
                        void togglePrivilege(mutation)
                    }}
                    selected={activeUserPrivileges}
                />
            </OverlayCard>
        </>
    )
}

export default UserGrantingItem

import { useMemo, useState, type FC } from 'react'

import { PencilSquareIcon } from '@heroicons/react/24/solid'
import { toast } from 'react-toastify'

import type { UserGrantingItemProps } from './UserGrantingItem.types'

import Button from '@/components/01-atoms/Button/Button'
import OverlayCard from '@/components/05-materials/OverlayCard/OverlayCard'
import PrivilegesSelectorCard from '@/components/05-materials/PrivilegesSelectorCard/PrivilegesSelectorCard'

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
        const basePrivileges = convertPrivilegesArrayToBooleanRecord(grantablePrivileges, true)

        if (userGrantablePrivileges != null)
            Object.values(userGrantablePrivileges).forEach((code) => {
                basePrivileges[code] = false
            })

        return basePrivileges
    }, [grantablePrivileges, userGrantablePrivileges])

    console.debug('UserGrantingItem - activeUserPrivileges:', activeUserPrivileges)

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
            <tr data-testid='UserGrantingItem'>
                <td className='text-center'>{username}</td>
                <td className='text-center'>
                    {fname} {lname}
                </td>
                <td className='text-center'>{email}</td>
                <td className='text-center'>
                    <Button
                        variant='primary'
                        className='btn-circle h-10 w-10 text-white'
                        onClick={() => {
                            setShowModal(true)
                        }}
                    >
                        <PencilSquareIcon className='h-4 w-4' />
                    </Button>
                </td>
            </tr>
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

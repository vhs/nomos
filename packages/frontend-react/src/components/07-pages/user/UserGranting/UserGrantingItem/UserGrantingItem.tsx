import { useMemo, useState, type FC } from 'react'

import { PencilSquareIcon } from '@heroicons/react/24/solid'
import { toast } from 'react-toastify'

import type { UserGrantingItemProps } from './UserGrantingItem.types'

import Button from '@/components/01-atoms/Button/Button'
import OverlayCard from '@/components/05-materials/OverlayCard/OverlayCard'
import PrivilegesSelectorCard from '@/components/05-materials/PrivilegesSelectorCard/PrivilegesSelectorCard'

import useGetUserPrivileges from '@/lib/hooks/providers/PrivilegeService2/useGetUserPrivileges'
import UserService2 from '@/lib/providers/UserService2'

import type { PrivilegeMutation } from '@/types/common'

const UserGrantingItem: FC<UserGrantingItemProps> = ({ user, availableGrants }) => {
    const { id, username, fname, lname, email } = user

    const { data: grantUserPrivileges, mutate } = useGetUserPrivileges(user.id)

    const [showModal, setShowModal] = useState(false)

    const activeUserPrivileges = useMemo(() => {
        const grantablePrivileges = Object.values(availableGrants).map((p) => p.code)
        const userPrivileges = (grantUserPrivileges ?? []).map((p) => p.code)

        return grantablePrivileges.reduce<Record<string, boolean>>((c, e) => {
            c[e] = userPrivileges.includes(e)

            return c
        }, {})
    }, [availableGrants, grantUserPrivileges])

    const togglePrivilege = async (mutation: PrivilegeMutation): Promise<void> => {
        const { privilege, state } = mutation

        await toast.promise(
            async (): Promise<void> => {
                if (state) {
                    await UserService2.getInstance().GrantPrivilege(id, privilege)
                } else {
                    await UserService2.getInstance().RevokePrivilege(id, privilege)
                }

                await mutate()
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
                    customPrivileges={availableGrants}
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

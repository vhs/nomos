import type { FC } from 'react'

import { Outlet } from '@tanstack/react-router'

import type { AdminUsersProps } from './AdminUsers.types'

import CreateUserButton from '@/components/01-atoms/CreateUserButton/CreateUserButton'
import TablePage from '@/components/05-materials/TablePage/TablePage'
import AdminUserItem from '@/components/07-pages/admin/AdminUsers/AdminUserItem/AdminUserItem'

import { AdminUserFields, PrimaryAdminUserFilters, SecondaryAdminUserFilters } from './AdminUsers.utils'

const AdminUsers: FC<AdminUsersProps> = () => {
    return (
        <>
            <TablePage
                title={'Users'}
                label={'user'}
                serviceEndpoint={'UserService2'}
                baseServiceMethod={'Users'}
                fields={AdminUserFields}
                // @ts-expect-error This is fucky. Technical term.
                component={AdminUserItem}
                order={['created desc']}
                filters={PrimaryAdminUserFilters}
                secondaryFilters={SecondaryAdminUserFilters}
                actions={[<CreateUserButton key='CreateUserButton' />]}
                unsafeSearchColumns={['active', 'cash']}
            >
                <Outlet />
            </TablePage>
        </>
    )
}

export default AdminUsers

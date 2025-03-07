import type { FC } from 'react'

import type { AdminUsersProps } from './AdminUsers.types'

import CreateUserButton from '@/components/01-atoms/CreateUserButton/CreateUserButton'
import TablePage from '@/components/05-materials/TablePage/TablePage'
import AdminUsersItem from '@/components/07-pages/admin/AdminUsers/AdminUsersItem/AdminUsersItem'

import { AdminUsersTablePageSchema } from './AdminUsers.schema'
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
                schema={AdminUsersTablePageSchema}
                // @ts-expect-error This is fucky. Technical term.
                component={AdminUsersItem}
                order={['created desc']}
                primaryFilters={PrimaryAdminUserFilters}
                secondaryFilters={SecondaryAdminUserFilters}
                actions={[<CreateUserButton key='CreateUserButton' />]}
                unsafeSearchColumns={['active', 'cash']}
            />
        </>
    )
}

export default AdminUsers

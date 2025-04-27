import type { FC } from 'react'

import type { UsersProps } from './Users.types'

import CreateUserButton from '@/components/01-atoms/CreateUserButton/CreateUserButton'
import TablePage from '@/components/05-materials/TablePage/TablePage'
import UsersItem from '@/components/07-pages/admin/Users/UsersItem/UsersItem'

import { zAdminUsersTablePageSchema } from './Users.schema'
import { AdminUserFields, PrimaryAdminUserFilters, SecondaryAdminUserFilters } from './Users.utils'

const Users: FC<UsersProps> = () => {
    return (
        <>
            <TablePage
                title={'Users'}
                label={'user'}
                serviceEndpoint={'UserService2'}
                baseServiceMethod={'Users'}
                fields={AdminUserFields}
                // @ts-expect-error This is fucky. Technical term.
                schema={zAdminUsersTablePageSchema}
                // @ts-expect-error This is fucky. Technical term.
                component={UsersItem}
                order={['created desc']}
                primaryFilters={PrimaryAdminUserFilters}
                secondaryFilters={SecondaryAdminUserFilters}
                actions={[<CreateUserButton key='CreateUserButton' />]}
                unsafeSearchColumns={['active', 'cash']}
            />
        </>
    )
}

export default Users

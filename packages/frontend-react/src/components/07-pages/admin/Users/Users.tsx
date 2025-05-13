import type { FC } from 'react'

import type { UsersProps } from './Users.types'

import TablePage from '@/components/06-integrated-pages/TablePage/TablePage'

import CreateUserButton from './CreateUserButton/CreateUserButton'
import { zAdminUsersTablePageSchema } from './Users.schema'
import { AdminUserFields, PrimaryAdminUserFilters, SecondaryAdminUserFilters } from './Users.utils'
import UsersItem from './UsersItem/UsersItem'

const Users: FC<UsersProps> = () => {
    return (
        <>
            <TablePage
                title={'Users'}
                label={'user'}
                serviceEndpoint={'UserService2'}
                baseServiceMethod={'Users'}
                fields={AdminUserFields}
                // TODO fix this
                // @ts-expect-error This is fucky. Technical term.
                schema={zAdminUsersTablePageSchema}
                // TODO fix this
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

import type { FC } from 'react'

import { Outlet } from '@tanstack/react-router'

import type { AdminMembershipsProps } from './AdminMemberships.types'

import TablePage from '@/components/05-materials/TablePage/TablePage'

import { AdminMembershipFields, AdminMembershipFilters } from './AdminMemberships.utils'
import AdminMembershipsItem from './AdminMembershipsItem/AdminMembershipsItem'

const AdminMemberships: FC<AdminMembershipsProps> = () => (
    <>
        <TablePage
            title={'Memberships'}
            label={'membership'}
            serviceEndpoint={'MembershipService2'}
            baseServiceMethod={'Memberships'}
            fields={AdminMembershipFields}
            primaryFilters={AdminMembershipFilters}
            order={'title'}
            // @ts-expect-error This is fucky. Technical term.
            component={AdminMembershipsItem}
        >
            <Outlet />
        </TablePage>
    </>
)

export default AdminMemberships

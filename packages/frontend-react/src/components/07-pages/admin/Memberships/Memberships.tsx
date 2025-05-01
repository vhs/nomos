import type { FC } from 'react'

import type { MembershipsProps } from './Memberships.types'

import TablePage from '@/components/05-materials/TablePage/TablePage'

import { AdminMembershipFields, AdminMembershipFilters } from './Memberships.utils'
import MembershipsItem from './MembershipsItem/MembershipsItem'

const Memberships: FC<MembershipsProps> = () => (
    <>
        <TablePage
            title={'Memberships'}
            label={'membership'}
            serviceEndpoint={'MembershipService2'}
            baseServiceMethod={'Memberships'}
            fields={AdminMembershipFields}
            primaryFilters={AdminMembershipFilters}
            order={'title'}
            // TODO fix this
            // @ts-expect-error This is fucky. Technical term.
            component={MembershipsItem}
        />
    </>
)

export default Memberships

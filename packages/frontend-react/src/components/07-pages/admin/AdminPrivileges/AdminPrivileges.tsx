import type { FC } from 'react'

import type { AdminPrivilegesProps } from './AdminPrivileges.types'

import TablePage from '@/components/05-materials/TablePage/TablePage'

import { AdminPrivilegesFields } from './AdminPrivileges.utils'
import AdminPrivilegesItem from './AdminPrivilegesItem/AdminPrivilegesItem'

const AdminPrivileges: FC<AdminPrivilegesProps> = () => (
    <div data-testid='AdminPrivileges'>
        <TablePage
            title={'Privileges'}
            label={'privilege'}
            serviceEndpoint={'PrivilegeService2'}
            baseServiceMethod={'Privileges'}
            fields={AdminPrivilegesFields}
            order={'name'}
            // @ts-expect-error This is fucky. Technical term.
            component={AdminPrivilegesItem}
        />
    </div>
)

export default AdminPrivileges

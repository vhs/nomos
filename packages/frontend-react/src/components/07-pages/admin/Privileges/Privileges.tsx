import type { FC } from 'react'

import type { PrivilegesProps } from './Privileges.types'

import TablePage from '@/components/05-materials/TablePage/TablePage'

import { PrivilegesFields } from './Privileges.utils'
import PrivilegesItem from './PrivilegesItem/PrivilegesItem'

const Privileges: FC<PrivilegesProps> = () => (
    <div data-testid='Privileges'>
        <TablePage
            title={'Privileges'}
            label={'privilege'}
            serviceEndpoint={'PrivilegeService2'}
            baseServiceMethod={'Privileges'}
            fields={PrivilegesFields}
            order={'name'}
            // @ts-expect-error This is fucky. Technical term.
            component={PrivilegesItem}
        />
    </div>
)

export default Privileges

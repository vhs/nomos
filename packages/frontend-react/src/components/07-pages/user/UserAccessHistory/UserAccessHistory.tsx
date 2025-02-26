import type { FC } from 'react'

import type { UserAccessHistoryProps } from './UserAccessHistory.types'

import TablePage from '@/components/05-materials/TablePage/TablePage'

import { UserAccessHistoryFields, UserAccessHistoryFilters } from './UserAccessHistory.utils'
import UserAccessHistoryItem from './UserAccessHistoryItem/UserAccessHistoryItem'

const UserAccessHistory: FC<UserAccessHistoryProps> = () => {
    return (
        <div data-testid='UserAccessHistory'>
            <TablePage
                title={'Access History'}
                label={'Access item'}
                serviceEndpoint={'AuthService2'}
                baseServiceMethod={'AccessLog'}
                user={true}
                fields={UserAccessHistoryFields}
                // @ts-expect-error This is fucky. Technical term.
                component={UserAccessHistoryItem}
                order={['time desc']}
                primaryFilters={UserAccessHistoryFilters}
            />
        </div>
    )
}

export default UserAccessHistory

import type { FC } from 'react'

import type { AccessHistoryProps } from './AccessHistory.types'

import TablePage from '@/components/05-materials/TablePage/TablePage'

import { AccessHistoryFields, AccessHistoryFilters } from './AccessHistory.utils'
import AccessHistoryItem from './AccessHistoryItem/AccessHistoryItem'

const AccessHistory: FC<AccessHistoryProps> = () => {
    return (
        <div data-testid='AccessHistory'>
            <TablePage
                title={'Access History'}
                label={'Access item'}
                serviceEndpoint={'AuthService2'}
                baseServiceMethod={'AccessLog'}
                user={true}
                fields={AccessHistoryFields}
                // @ts-expect-error This is fucky. Technical term.
                component={AccessHistoryItem}
                order={['time desc']}
                primaryFilters={AccessHistoryFilters}
            />
        </div>
    )
}

export default AccessHistory

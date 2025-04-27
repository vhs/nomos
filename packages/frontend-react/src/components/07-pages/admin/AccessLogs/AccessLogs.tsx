import type { FC } from 'react'

import type { AccessLogsProps } from './AccessLogs.types'

import TablePage from '@/components/05-materials/TablePage/TablePage'

import { AccessLogsFields, AccessLogsFilters } from './AccessLogs.utils'
import AccessLogsItem from './AccessLogsItem/AccessLogsItem'

const AccessLogs: FC<AccessLogsProps> = () => (
    <div data-testid='AccessLogs'>
        <TablePage
            title={'Access Logs'}
            label={'Access item'}
            serviceEndpoint={'AuthService2'}
            baseServiceMethod={'AccessLog'}
            fields={AccessLogsFields}
            // @ts-expect-error This is fucky. Technical term.
            component={AccessLogsItem}
            order={['time desc']}
            primaryFilters={AccessLogsFilters}
        />
    </div>
)

export default AccessLogs

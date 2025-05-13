import type { FC } from 'react'

import type { AccessLogsProps } from './AccessLogs.types'

import TablePage from '@/components/06-integrated-pages/TablePage/TablePage'

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
            // TODO fix this
            // @ts-expect-error This is fucky. Technical term.
            component={AccessLogsItem}
            order={['time desc']}
            primaryFilters={AccessLogsFilters}
        />
    </div>
)

export default AccessLogs

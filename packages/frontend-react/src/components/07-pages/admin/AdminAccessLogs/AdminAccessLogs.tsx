import type { FC } from 'react'

import type { AdminAccessLogsProps } from './AdminAccessLogs.types'

import TablePage from '@/components/05-materials/TablePage/TablePage'

import { AdminAccessLogsFields, AdminAccessLogsFilters } from './AdminAccessLogs.utils'
import AdminAccessLogsItem from './AdminAccessLogsItem/AdminAccessLogsItem'

const AdminAccessLogs: FC<AdminAccessLogsProps> = () => (
    <div data-testid='AdminAccessLogs'>
        <TablePage
            title={'Access Logs'}
            label={'Access item'}
            serviceEndpoint={'AuthService2'}
            baseServiceMethod={'AccessLog'}
            fields={AdminAccessLogsFields}
            // @ts-expect-error This is fucky. Technical term.
            component={AdminAccessLogsItem}
            order={['time desc']}
            filters={AdminAccessLogsFilters}
        />
    </div>
)

export default AdminAccessLogs

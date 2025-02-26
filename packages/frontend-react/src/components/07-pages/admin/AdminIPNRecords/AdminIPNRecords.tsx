import type { FC } from 'react'

import type { AdminIPNRecordsProps } from './AdminIPNRecords.types'

import TablePage from '@/components/05-materials/TablePage/TablePage'

import { AdminIPNRecordsFields, AdminIPNRecordsFilters } from './AdminIPNRecords.utils'
import AdminIPNRecordsItem from './AdminIPNRecordsItem/AdminIPNRecordsItem'

const AdminIPNRecords: FC<AdminIPNRecordsProps> = () => (
    <TablePage
        data-testid='AdminIPNRecords'
        title='IPN Records'
        label={'record'}
        serviceEndpoint={'IpnService2'}
        baseServiceMethod={'Records'}
        fields={AdminIPNRecordsFields}
        primaryFilters={AdminIPNRecordsFilters}
        order={'created desc'}
        // @ts-expect-error This is fucky. Technical term.
        component={AdminIPNRecordsItem}
    />
)

export default AdminIPNRecords

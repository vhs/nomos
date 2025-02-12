import type { FC } from 'react'

import type { AdminStripeRecordsProps } from './AdminStripeRecords.types'

import TablePage from '@/components/05-materials/TablePage/TablePage'

import { AdminStripeRecordsFields, AdminStripeRecordsFilters } from './AdminStripeRecords.utils'
import AdminStripeRecordsItem from './AdminStripeRecordsItem/AdminStripeRecordsItem'

const AdminStripeRecords: FC<AdminStripeRecordsProps> = () => (
    <TablePage
        data-testid='AdminStripeRecords'
        title='Stripe Records'
        label={''}
        serviceEndpoint={'StripeEventService2'}
        baseServiceMethod={'Records'}
        fields={AdminStripeRecordsFields}
        filters={AdminStripeRecordsFilters}
        order={'created desc'}
        // @ts-expect-error This is fucky. Technical term.
        component={AdminStripeRecordsItem}
    />
)

export default AdminStripeRecords

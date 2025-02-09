import type { FC } from 'react'

import type { AdminPaymentsProps } from './AdminPayments.types'

import TablePage from '@/components/05-materials/TablePage/TablePage'

import { AdminPaymentsFields } from './AdminPayments.utils'
import AdminPayPalPaymentItem from './AdminPayPalPaymentItem/AdminPayPalPaymentItem'

const AdminPayments: FC<AdminPaymentsProps> = () => (
    <div data-testid='AdminPayments'>
        <TablePage
            title={'Payments'}
            label={'transaction'}
            serviceEndpoint={'IpnService2'}
            baseServiceMethod={'Records'}
            fields={AdminPaymentsFields}
            order={'created desc'}
            // @ts-expect-error This is fucky. Technical term.
            component={AdminPayPalPaymentItem}
        />
    </div>
)

export default AdminPayments

import type { FC } from 'react'

import type { PaymentsProps } from './Payments.types'

import TablePage from '@/components/05-materials/TablePage/TablePage'

import { PaymentsFields } from './Payments.utils'
import PayPalPaymentItem from './PayPalPaymentItem/PayPalPaymentItem'

const Payments: FC<PaymentsProps> = () => (
    <div data-testid='Payments'>
        <TablePage
            title={'Payments'}
            label={'transaction'}
            serviceEndpoint={'IpnService2'}
            baseServiceMethod={'Records'}
            fields={PaymentsFields}
            order={'created desc'}
            // @ts-expect-error This is fucky. Technical term.
            component={PayPalPaymentItem}
        />
    </div>
)

export default Payments

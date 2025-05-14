import type { FC } from 'react'

import type { StripeRecordsProps } from './StripeRecords.types'

import TablePage from '@/components/05-materials/TablePage/TablePage'

import { StripeRecordsFields, StripeRecordsFilters } from './StripeRecords.utils'
import StripeRecordsItem from './StripeRecordsItem/StripeRecordsItem'

const StripeRecords: FC<StripeRecordsProps> = () => (
    <TablePage
        data-testid='StripeRecords'
        title='Stripe Records'
        label={''}
        serviceEndpoint={'StripeEventService2'}
        baseServiceMethod={'Records'}
        fields={StripeRecordsFields}
        primaryFilters={StripeRecordsFilters}
        order={'created desc'}
        // TODO fix this
        // @ts-expect-error This is fucky. Technical term.
        component={StripeRecordsItem}
    />
)

export default StripeRecords

import type { FC } from 'react'

import type { IPNRecordsProps } from './IPNRecords.types'

import TablePage from '@/components/06-integrated-pages/TablePage/TablePage'

import { IPNRecordsFields, IPNRecordsFilters } from './IPNRecords.utils'
import IPNRecordsItem from './IPNRecordsItem/IPNRecordsItem'

const IPNRecords: FC<IPNRecordsProps> = () => (
    <TablePage
        data-testid='IPNRecords'
        title='IPN Records'
        label={'record'}
        serviceEndpoint={'IpnService2'}
        baseServiceMethod={'Records'}
        fields={IPNRecordsFields}
        primaryFilters={IPNRecordsFilters}
        order={'created desc'}
        // TODO fix this
        // @ts-expect-error This is fucky. Technical term.
        component={IPNRecordsItem}
    />
)

export default IPNRecords

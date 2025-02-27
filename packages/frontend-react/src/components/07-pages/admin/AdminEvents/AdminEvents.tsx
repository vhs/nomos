import type { FC } from 'react'

import type { AdminEventsProps } from './AdminEvents.types'

import TablePage from '@/components/05-materials/TablePage/TablePage'

import { AdminEventsFields } from './AdminEvents.utils'
import AdminEventsItem from './AdminEventsItem/AdminEventsItem'

const AdminEvents: FC<AdminEventsProps> = () => (
    <TablePage
        data-testid='AdminEvents'
        title='Events'
        label={'event'}
        serviceEndpoint={'EventService2'}
        baseServiceMethod={'Events'}
        fields={AdminEventsFields}
        order={'domain'}
        // @ts-expect-error This is fucky. Technical term.
        component={AdminEventsItem}
    />
)

export default AdminEvents

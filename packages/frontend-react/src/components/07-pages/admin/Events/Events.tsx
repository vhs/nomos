import type { FC } from 'react'

import type { EventsProps } from './Events.types'

import TablePage from '@/components/05-materials/TablePage/TablePage'

import { EventsFields } from './Events.utils'
import EventsItem from './EventsItem/EventsItem'

const Events: FC<EventsProps> = () => (
    <TablePage
        data-testid='Events'
        title='Events'
        label={'event'}
        serviceEndpoint={'EventService2'}
        baseServiceMethod={'Events'}
        fields={EventsFields}
        order={'domain'}
        // TODO fix this
        // @ts-expect-error This is fucky. Technical term.
        component={EventsItem}
    />
)

export default Events

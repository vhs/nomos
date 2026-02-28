import { lazy, Suspense, type JSX } from 'react'

import type { EventsItemProps } from './EventsItem.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const EventsItemLazy = lazy(async () => await import('./EventsItem'))

const EventsItem = (props: JSX.IntrinsicAttributes & EventsItemProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <EventsItemLazy {...props} />
    </Suspense>
)

export default EventsItem

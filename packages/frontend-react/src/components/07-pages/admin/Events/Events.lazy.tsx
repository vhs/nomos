import { lazy, Suspense, type JSX } from 'react'

import type { EventsProps } from './Events.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const EventsLazy = lazy(async () => await import('./Events'))

const Events = (props: JSX.IntrinsicAttributes & EventsProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <EventsLazy {...props} />
    </Suspense>
)

export default Events

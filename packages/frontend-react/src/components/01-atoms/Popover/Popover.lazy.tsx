import { lazy, Suspense, type JSX } from 'react'

import type { PopoverProps } from './Popover.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const LazyPopover = lazy(async () => await import('./Popover'))

const Popover = (props: JSX.IntrinsicAttributes & PopoverProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyPopover {...props} />
    </Suspense>
)

export default Popover

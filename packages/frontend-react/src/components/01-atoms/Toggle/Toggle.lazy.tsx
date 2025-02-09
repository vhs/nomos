import { lazy, Suspense, type JSX } from 'react'

import type { ToggleProps } from './Toggle.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyToggle = lazy(async () => await import('./Toggle'))

const Toggle = (props: JSX.IntrinsicAttributes & ToggleProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyToggle {...props} />
    </Suspense>
)

export default Toggle

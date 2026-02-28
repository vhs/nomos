import { lazy, Suspense, type JSX } from 'react'

import type { InputGroupProps } from './InputGroup.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const LazyInputGroup = lazy(async () => await import('./InputGroup'))

const InputGroup = (props: JSX.IntrinsicAttributes & InputGroupProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyInputGroup {...props} />
    </Suspense>
)

export default InputGroup

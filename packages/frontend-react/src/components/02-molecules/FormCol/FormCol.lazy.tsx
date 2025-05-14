import { lazy, Suspense, type JSX } from 'react'

import type { FormColProps } from './FormCol.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const LazyFormCol = lazy(async () => await import('./FormCol'))

const FormCol = (props: JSX.IntrinsicAttributes & FormColProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyFormCol {...props} />
    </Suspense>
)

export default FormCol

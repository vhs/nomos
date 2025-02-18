import { lazy, Suspense, type JSX } from 'react'

import type { FormControlContainerProps } from './FormControlContainer.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyFormControlContainer = lazy(async () => await import('./FormControlContainer'))

const FormControlContainer = (props: JSX.IntrinsicAttributes & FormControlContainerProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyFormControlContainer {...props} />
    </Suspense>
)

export default FormControlContainer

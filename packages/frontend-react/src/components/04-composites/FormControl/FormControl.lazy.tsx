import { lazy, Suspense, type JSX } from 'react'

import type { FormControlProps } from './FormControl.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyFormControl = lazy(async () => await import('./FormControl'))

const FormControl = (props: JSX.IntrinsicAttributes & FormControlProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyFormControl {...props} />
    </Suspense>
)

export default FormControl

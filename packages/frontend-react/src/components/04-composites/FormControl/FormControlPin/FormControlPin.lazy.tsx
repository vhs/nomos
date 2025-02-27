import { lazy, Suspense, type JSX } from 'react'

import type { FormControlPinProps } from '../FormControl.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyFormControlPin = lazy(async () => await import('./FormControlPin'))

const FormControlPin = (props: JSX.IntrinsicAttributes & FormControlPinProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyFormControlPin {...props} />
    </Suspense>
)

export default FormControlPin

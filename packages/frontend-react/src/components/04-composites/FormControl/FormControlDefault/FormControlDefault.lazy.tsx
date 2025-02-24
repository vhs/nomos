import { lazy, Suspense, type JSX } from 'react'

import type { FormControlDefaultProps } from '../FormControl.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyFormControlDefault = lazy(async () => await import('./FormControlDefault'))

const FormControlDefault = (props: JSX.IntrinsicAttributes & FormControlDefaultProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyFormControlDefault {...props} />
    </Suspense>
)

export default FormControlDefault

import { lazy, Suspense, type JSX } from 'react'

import type { FormControlTextAreaProps } from '../FormControl.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const LazyFormControlTextArea = lazy(async () => await import('./FormControlTextArea'))

const FormControlTextArea = (props: JSX.IntrinsicAttributes & FormControlTextAreaProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyFormControlTextArea {...props} />
    </Suspense>
)

export default FormControlTextArea

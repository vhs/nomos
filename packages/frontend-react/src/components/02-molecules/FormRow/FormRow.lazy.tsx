import { lazy, Suspense, type JSX } from 'react'

import type { FormRowProps } from './FormRow.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyFormRow = lazy(async () => await import('./FormRow'))

const FormRow = (props: JSX.IntrinsicAttributes & FormRowProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyFormRow {...props} />
    </Suspense>
)

export default FormRow

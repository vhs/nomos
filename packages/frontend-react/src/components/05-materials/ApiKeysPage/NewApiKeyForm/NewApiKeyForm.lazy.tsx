import { lazy, Suspense, type JSX } from 'react'

import type { NewApiKeyFormProps } from './NewApiKeyForm.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyNewApiKeyForm = lazy(async () => await import('./NewApiKeyForm'))

const NewApiKeyForm = (props: JSX.IntrinsicAttributes & NewApiKeyFormProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyNewApiKeyForm {...props} />
    </Suspense>
)

export default NewApiKeyForm

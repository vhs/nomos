import { lazy, Suspense, type JSX } from 'react'

import type { CreateWebHookFormProps } from './CreateWebHookForm.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyCreateWebHookForm = lazy(async () => await import('./CreateWebHookForm'))

const CreateWebHookForm = (props: JSX.IntrinsicAttributes & CreateWebHookFormProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyCreateWebHookForm {...props} />
    </Suspense>
)

export default CreateWebHookForm

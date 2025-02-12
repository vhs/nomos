import { lazy, Suspense, type JSX } from 'react'

import type { CreateSystemPreferenceProps } from './CreateSystemPreference.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyCreateSystemPreference = lazy(async () => await import('./CreateSystemPreference'))

const CreateSystemPreference = (props: JSX.IntrinsicAttributes & CreateSystemPreferenceProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyCreateSystemPreference {...props} />
    </Suspense>
)

export default CreateSystemPreference

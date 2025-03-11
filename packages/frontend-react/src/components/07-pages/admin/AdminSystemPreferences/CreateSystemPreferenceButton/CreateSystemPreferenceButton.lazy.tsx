import { lazy, Suspense, type JSX } from 'react'

import type { CreateSystemPreferenceButtonProps } from './CreateSystemPreferenceButton.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyCreateSystemPreferenceButton = lazy(async () => await import('./CreateSystemPreferenceButton'))

const CreateSystemPreferenceButton = (
    props: JSX.IntrinsicAttributes & CreateSystemPreferenceButtonProps
): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyCreateSystemPreferenceButton {...props} />
    </Suspense>
)

export default CreateSystemPreferenceButton

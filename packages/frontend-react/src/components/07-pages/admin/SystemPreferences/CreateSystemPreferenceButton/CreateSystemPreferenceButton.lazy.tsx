import { lazy, Suspense, type JSX } from 'react'

import type { CreateSystemPreferenceButtonProps } from './CreateSystemPreferenceButton.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const CreateSystemPreferenceButtonLazy = lazy(async () => await import('./CreateSystemPreferenceButton'))

const CreateSystemPreferenceButton = (
    props: JSX.IntrinsicAttributes & CreateSystemPreferenceButtonProps
): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <CreateSystemPreferenceButtonLazy {...props} />
    </Suspense>
)

export default CreateSystemPreferenceButton

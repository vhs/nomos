import { lazy, Suspense, type JSX } from 'react'

import type { EnabledCheckMarkProps } from './EnabledCheckMark.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const LazyEnabledCheckMark = lazy(async () => await import('./EnabledCheckMark'))

const EnabledCheckMark = (props: JSX.IntrinsicAttributes & EnabledCheckMarkProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyEnabledCheckMark {...props} />
    </Suspense>
)

export default EnabledCheckMark

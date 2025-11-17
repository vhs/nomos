import { lazy, Suspense, type JSX } from 'react'

import type { AccessHistoryProps } from './AccessHistory.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const AccessHistoryLazy = lazy(async () => await import('./AccessHistory'))

const AccessHistory = (props: JSX.IntrinsicAttributes & AccessHistoryProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <AccessHistoryLazy {...props} />
    </Suspense>
)

export default AccessHistory

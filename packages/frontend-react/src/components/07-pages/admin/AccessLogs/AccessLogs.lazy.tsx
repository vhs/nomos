import { lazy, Suspense, type JSX } from 'react'

import type { AccessLogsProps } from './AccessLogs.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const AccessLogsLazy = lazy(async () => await import('./AccessLogs'))

const AccessLogs = (props: JSX.IntrinsicAttributes & AccessLogsProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <AccessLogsLazy {...props} />
    </Suspense>
)

export default AccessLogs

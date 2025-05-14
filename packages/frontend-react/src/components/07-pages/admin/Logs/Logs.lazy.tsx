import { lazy, Suspense, type JSX } from 'react'

import type { LogsProps } from './Logs.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const LogsLazy = lazy(async () => await import('./Logs'))

const Logs = (props: JSX.IntrinsicAttributes & LogsProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LogsLazy {...props} />
    </Suspense>
)

export default Logs

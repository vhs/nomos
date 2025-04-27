import { lazy, Suspense, type JSX } from 'react'

import type { DatabaseBackupProps } from './DatabaseBackup.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const DatabaseBackupLazy = lazy(async () => await import('./DatabaseBackup'))

const DatabaseBackup = (props: JSX.IntrinsicAttributes & DatabaseBackupProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <DatabaseBackupLazy {...props} />
    </Suspense>
)

export default DatabaseBackup

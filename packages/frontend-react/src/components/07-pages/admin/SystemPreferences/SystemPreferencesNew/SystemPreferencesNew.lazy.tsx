import { lazy, Suspense, type JSX } from 'react'

import type { SystemPreferencesNewProps } from './SystemPreferencesNew.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const SystemPreferencesNewLazy = lazy(async () => await import('./SystemPreferencesNew'))

const SystemPreferencesNew = (props: JSX.IntrinsicAttributes & SystemPreferencesNewProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <SystemPreferencesNewLazy {...props} />
    </Suspense>
)

export default SystemPreferencesNew

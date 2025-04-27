import { lazy, Suspense, type JSX } from 'react'

import type { SystemPreferencesProps } from './SystemPreferences.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const SystemPreferencesLazy = lazy(async () => await import('./SystemPreferences'))

const SystemPreferences = (props: JSX.IntrinsicAttributes & SystemPreferencesProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <SystemPreferencesLazy {...props} />
    </Suspense>
)

export default SystemPreferences

import { lazy, Suspense, type JSX } from 'react'

import type { SystemPreferencesEditProps } from './SystemPreferencesEdit.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const SystemPreferencesEditLazy = lazy(async () => await import('./SystemPreferencesEdit'))

const SystemPreferencesEdit = (props: JSX.IntrinsicAttributes & SystemPreferencesEditProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <SystemPreferencesEditLazy {...props} />
    </Suspense>
)

export default SystemPreferencesEdit

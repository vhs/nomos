import { lazy, Suspense, type JSX } from 'react'

import type { SystemPreferencesItemProps } from './SystemPreferencesItem.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const SystemPreferencesItemLazy = lazy(async () => await import('./SystemPreferencesItem'))

const SystemPreferencesItem = (props: JSX.IntrinsicAttributes & SystemPreferencesItemProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <SystemPreferencesItemLazy {...props} />
    </Suspense>
)

export default SystemPreferencesItem

import { lazy, Suspense, type JSX } from 'react'

import type { AccessLogsItemProps } from './AccessLogsItem.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const AccessLogsItemLazy = lazy(async () => await import('./AccessLogsItem'))

const AccessLogsItem = (props: JSX.IntrinsicAttributes & AccessLogsItemProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <AccessLogsItemLazy {...props} />
    </Suspense>
)

export default AccessLogsItem

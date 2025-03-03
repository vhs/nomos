import { lazy, Suspense, type JSX } from 'react'

import type { ApiKeysListItemProps } from './ApiKeysListItem.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyApiKeysListItem = lazy(async () => await import('./ApiKeysListItem'))

const ApiKeysListItem = (props: JSX.IntrinsicAttributes & ApiKeysListItemProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyApiKeysListItem {...props} />
    </Suspense>
)

export default ApiKeysListItem

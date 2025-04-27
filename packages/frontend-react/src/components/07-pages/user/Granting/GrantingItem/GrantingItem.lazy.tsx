import { lazy, Suspense, type JSX } from 'react'

import type { GrantingItemProps } from './GrantingItem.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const GrantingItemLazy = lazy(async () => await import('./GrantingItem'))

const GrantingItem = (props: JSX.IntrinsicAttributes & GrantingItemProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <GrantingItemLazy {...props} />
    </Suspense>
)

export default GrantingItem

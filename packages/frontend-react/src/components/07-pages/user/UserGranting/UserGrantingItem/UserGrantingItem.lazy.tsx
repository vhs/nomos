import { lazy, Suspense, type JSX } from 'react'

import type { UserGrantingItemProps } from './UserGrantingItem.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const UserGrantingItemLazy = lazy(async () => await import('./UserGrantingItem'))

const UserGrantingItem = (props: JSX.IntrinsicAttributes & UserGrantingItemProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <UserGrantingItemLazy {...props} />
    </Suspense>
)

export default UserGrantingItem

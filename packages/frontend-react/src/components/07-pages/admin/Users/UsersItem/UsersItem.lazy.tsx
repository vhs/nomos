import { lazy, Suspense, type JSX } from 'react'

import type { UsersItemProps } from './UsersItem.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const UsersItemLazy = lazy(async () => await import('./UsersItem'))

const UsersItem = (props: JSX.IntrinsicAttributes & UsersItemProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <UsersItemLazy {...props} />
    </Suspense>
)

export default UsersItem

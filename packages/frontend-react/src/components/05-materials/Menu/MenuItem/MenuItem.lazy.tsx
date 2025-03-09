import { lazy, Suspense, type JSX } from 'react'

import type { MenuItemProps } from './MenuItem.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyMenuItem = lazy(async () => await import('./MenuItem'))

const MenuItem = (props: JSX.IntrinsicAttributes & MenuItemProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyMenuItem {...props} />
    </Suspense>
)

export default MenuItem

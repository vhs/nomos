import { lazy, Suspense, type JSX } from 'react'

import type { UserMenuProps } from './Menu.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyMenu = lazy(async () => await import('./Menu'))

const Menu = (props: JSX.IntrinsicAttributes & UserMenuProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyMenu {...props} />
    </Suspense>
)

export default Menu

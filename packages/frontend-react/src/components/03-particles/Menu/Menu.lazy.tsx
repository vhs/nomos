import { lazy, Suspense, type JSX } from 'react'

import type { MenuProps } from './Menu.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const LazyMenu = lazy(async () => await import('./Menu'))

const Menu = (props: JSX.IntrinsicAttributes & MenuProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyMenu {...props} />
    </Suspense>
)

export default Menu

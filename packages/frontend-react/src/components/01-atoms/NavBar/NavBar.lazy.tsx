import { lazy, Suspense, type JSX } from 'react'

import type { NavBarProps } from './NavBar.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const LazyNavBar = lazy(async () => await import('./NavBar'))

const NavBar = (props: JSX.IntrinsicAttributes & NavBarProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyNavBar {...props} />
    </Suspense>
)

export default NavBar

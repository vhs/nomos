import { lazy, Suspense, type JSX } from 'react'

import type { MobileMenuProps } from './MobileMenu.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyMobileMenu = lazy(async () => await import('./MobileMenu'))

const MobileMenu = (props: JSX.IntrinsicAttributes & MobileMenuProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyMobileMenu {...props} />
    </Suspense>
)

export default MobileMenu

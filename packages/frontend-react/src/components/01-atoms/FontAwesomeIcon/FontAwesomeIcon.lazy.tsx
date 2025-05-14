import { lazy, Suspense, type JSX } from 'react'

import type { FontAwesomeIconProps } from './FontAwesomeIcon.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const LazyFontAwesomeIcon = lazy(async () => await import('./FontAwesomeIcon'))

const FontAwesomeIcon = (props: JSX.IntrinsicAttributes & FontAwesomeIconProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyFontAwesomeIcon {...props} />
    </Suspense>
)

export default FontAwesomeIcon

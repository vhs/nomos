import { lazy, Suspense, type JSX } from 'react'

import type { ButtonProps } from './Button.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const LazyButton = lazy(async () => await import('./Button'))

const Button = (props: JSX.IntrinsicAttributes & ButtonProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyButton {...props} />
    </Suspense>
)

export default Button

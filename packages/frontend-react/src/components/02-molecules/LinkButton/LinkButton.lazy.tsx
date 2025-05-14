import { lazy, Suspense, type JSX } from 'react'

import type { LinkButtonProps } from './LinkButton.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const LazyLinkButton = lazy(async () => await import('./LinkButton'))

const LinkButton = (props: JSX.IntrinsicAttributes & LinkButtonProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyLinkButton {...props} />
    </Suspense>
)

export default LinkButton

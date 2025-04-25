import { lazy, Suspense, type JSX } from 'react'

import type { OAuthPageNewClientButtonProps } from './OAuthPageNewClientButton.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyOAuthPageNewClientButton = lazy(async () => await import('./OAuthPageNewClientButton'))

const OAuthPageNewClientButton = (props: JSX.IntrinsicAttributes & OAuthPageNewClientButtonProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyOAuthPageNewClientButton {...props} />
    </Suspense>
)

export default OAuthPageNewClientButton

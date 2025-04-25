import { lazy, Suspense, type JSX } from 'react'

import type { OAuthPageNewClientModalProps } from './OAuthPageNewClientModal.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyOAuthPageNewClientModal = lazy(async () => await import('./OAuthPageNewClientModal'))

const OAuthPageNewClientModal = (props: JSX.IntrinsicAttributes & OAuthPageNewClientModalProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyOAuthPageNewClientModal {...props} />
    </Suspense>
)

export default OAuthPageNewClientModal

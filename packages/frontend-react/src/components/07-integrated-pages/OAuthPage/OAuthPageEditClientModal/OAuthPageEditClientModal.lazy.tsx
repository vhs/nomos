import { lazy, Suspense, type JSX } from 'react'

import type { OAuthPageEditClientModalProps } from './OAuthPageEditClientModal.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const LazyOAuthPageEditClientModal = lazy(async () => await import('./OAuthPageEditClientModal'))

const OAuthPageEditClientModal = (props: JSX.IntrinsicAttributes & OAuthPageEditClientModalProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyOAuthPageEditClientModal {...props} />
    </Suspense>
)

export default OAuthPageEditClientModal

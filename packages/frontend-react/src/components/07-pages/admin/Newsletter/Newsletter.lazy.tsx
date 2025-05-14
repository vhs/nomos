import { lazy, Suspense, type JSX } from 'react'

import type { NewsletterProps } from './Newsletter.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const NewsletterLazy = lazy(async () => await import('./Newsletter'))

const Newsletter = (props: JSX.IntrinsicAttributes & NewsletterProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <NewsletterLazy {...props} />
    </Suspense>
)

export default Newsletter

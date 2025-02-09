import { lazy, Suspense, type JSX } from 'react'

import type { BasePageProps } from './BasePage.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyBasePage = lazy(async () => await import('./BasePage'))

const BasePage = (props: JSX.IntrinsicAttributes & BasePageProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyBasePage {...props} />
    </Suspense>
)

export default BasePage

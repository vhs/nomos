import { lazy, Suspense, type JSX } from 'react'

import type { ApiKeysProps } from './ApiKeys.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const ApiKeysLazy = lazy(async () => await import('./ApiKeys'))

const ApiKeys = (props: JSX.IntrinsicAttributes & ApiKeysProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <ApiKeysLazy {...props} />
    </Suspense>
)

export default ApiKeys

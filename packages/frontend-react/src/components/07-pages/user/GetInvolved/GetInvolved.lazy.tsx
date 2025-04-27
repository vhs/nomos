import { lazy, Suspense, type JSX } from 'react'

import type { GetInvolvedProps } from './GetInvolved.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const GetInvolvedLazy = lazy(async () => await import('./GetInvolved'))

const GetInvolved = (props: JSX.IntrinsicAttributes & GetInvolvedProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <GetInvolvedLazy {...props} />
    </Suspense>
)

export default GetInvolved

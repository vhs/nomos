import { lazy, Suspense, type JSX } from 'react'

import type { IssueGenuineCardProps } from './IssueGenuineCard.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const IssueGenuineCardLazy = lazy(async () => await import('./IssueGenuineCard'))

const IssueGenuineCard = (props: JSX.IntrinsicAttributes & IssueGenuineCardProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <IssueGenuineCardLazy {...props} />
    </Suspense>
)

export default IssueGenuineCard

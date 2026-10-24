import { lazy, Suspense, type JSX } from 'react'

import type { UserTemplateNameItemProps } from './UserTemplateNameItem.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const LazyUserTemplateNameItem = lazy(async () => await import('./UserTemplateNameItem'))

const UserTemplateNameItem = (props: JSX.IntrinsicAttributes & UserTemplateNameItemProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyUserTemplateNameItem {...props} />
    </Suspense>
)

export default UserTemplateNameItem

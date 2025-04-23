import { lazy, Suspense, type JSX } from 'react'

import type { EmailTemplateItemProps } from './EmailTemplateItem.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyEmailTemplateItem = lazy(async () => await import('./EmailTemplateItem'))

const EmailTemplateItem = (props: JSX.IntrinsicAttributes & EmailTemplateItemProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyEmailTemplateItem {...props} />
    </Suspense>
)

export default EmailTemplateItem

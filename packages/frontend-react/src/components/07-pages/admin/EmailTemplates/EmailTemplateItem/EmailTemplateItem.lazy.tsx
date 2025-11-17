import { lazy, Suspense, type JSX } from 'react'

import type { EmailTemplateItemProps } from './EmailTemplateItem.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const EmailTemplateItemLazy = lazy(async () => await import('./EmailTemplateItem'))

const EmailTemplateItem = (props: JSX.IntrinsicAttributes & EmailTemplateItemProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <EmailTemplateItemLazy {...props} />
    </Suspense>
)

export default EmailTemplateItem

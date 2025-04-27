import { lazy, Suspense, type JSX } from 'react'

import type { EmailTemplateCreateProps } from './EmailTemplateCreate.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const EmailTemplateCreateLazy = lazy(async () => await import('./EmailTemplateCreate'))

const EmailTemplateCreate = (props: JSX.IntrinsicAttributes & EmailTemplateCreateProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <EmailTemplateCreateLazy {...props} />
    </Suspense>
)

export default EmailTemplateCreate

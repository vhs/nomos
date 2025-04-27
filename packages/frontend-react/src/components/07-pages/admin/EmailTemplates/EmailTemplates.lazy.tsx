import { lazy, Suspense, type JSX } from 'react'

import type { EmailTemplatesProps } from './EmailTemplates.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const EmailTemplatesLazy = lazy(async () => await import('./EmailTemplates'))

const EmailTemplates = (props: JSX.IntrinsicAttributes & EmailTemplatesProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <EmailTemplatesLazy {...props} />
    </Suspense>
)

export default EmailTemplates

import { lazy, Suspense, type JSX } from 'react'

import type { EmailTemplateNewProps } from './EmailTemplateNew.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const EmailTemplateNewLazy = lazy(async () => await import('./EmailTemplateNew'))

const EmailTemplateNew = (props: JSX.IntrinsicAttributes & EmailTemplateNewProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <EmailTemplateNewLazy {...props} />
    </Suspense>
)

export default EmailTemplateNew

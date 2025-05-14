import { lazy, Suspense, type JSX } from 'react'

import type { EmailTemplateEditProps } from './EmailTemplateEdit.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const EmailTemplateEditLazy = lazy(async () => await import('./EmailTemplateEdit'))

const EmailTemplateEdit = (props: JSX.IntrinsicAttributes & EmailTemplateEditProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <EmailTemplateEditLazy {...props} />
    </Suspense>
)

export default EmailTemplateEdit

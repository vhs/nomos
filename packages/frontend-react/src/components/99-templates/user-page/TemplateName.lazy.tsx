import { lazy, Suspense, type JSX } from 'react'

import type { TemplateNameProps } from './TemplateName.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const LazyTemplateName = lazy(async () => await import('./TemplateName'))

const TemplateName = (props: JSX.IntrinsicAttributes & TemplateNameProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyTemplateName {...props} />
    </Suspense>
)

export default TemplateName

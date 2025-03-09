import { lazy, Suspense, type JSX } from 'react'

import type { FormControlDropdownProps } from '../FormControl.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyFormControlDropdown = lazy(async () => await import('./FormControlDropdown'))

const FormControlDropdown = (props: JSX.IntrinsicAttributes & FormControlDropdownProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyFormControlDropdown {...props} />
    </Suspense>
)

export default FormControlDropdown

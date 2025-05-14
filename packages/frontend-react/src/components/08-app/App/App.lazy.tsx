import { lazy, Suspense, type JSX } from 'react'

import type { AppProps } from './App.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const LazyApp = lazy(async () => await import('./App'))

const App = (props: JSX.IntrinsicAttributes & AppProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyApp {...props} />
    </Suspense>
)

export default App

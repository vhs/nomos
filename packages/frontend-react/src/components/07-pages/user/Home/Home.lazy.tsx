import { lazy, Suspense, type JSX } from 'react'

import type { HomeProps } from './Home.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const HomeLazy = lazy(async () => await import('./Home'))

const Home = (props: JSX.IntrinsicAttributes & HomeProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <HomeLazy {...props} />
    </Suspense>
)

export default Home

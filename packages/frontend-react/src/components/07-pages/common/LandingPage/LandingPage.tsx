import type { FC } from 'react'

import type { LandingPageProps } from './LandingPage.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const LandingPage: FC<LandingPageProps> = () => <LoadingOverlay show={true} />

export default LandingPage

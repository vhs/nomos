import type { FC } from 'react'

import type { LandingPageProps } from './LandingPage.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LandingPage: FC<LandingPageProps> = () => <LoadingOverlay show={true} />

export default LandingPage

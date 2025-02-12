import { useContext } from 'react'

import { AuthenticationContext } from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider.context'
import type { AuthenticationContextProps } from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider.types'

export default function useAuth(): AuthenticationContextProps {
    const context = useContext(AuthenticationContext)

    if (context == null) {
        throw new Error('useAuth must be used within an AuthProvider')
    }

    return context
}

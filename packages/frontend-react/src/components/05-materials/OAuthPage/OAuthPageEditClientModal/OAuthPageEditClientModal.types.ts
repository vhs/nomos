import type { ReactNode } from 'react'

import type { AppClient } from '@/types/validators/records'

export interface OAuthPageEditClientModalProps {
    children?: ReactNode
    appClientId: AppClient['id']
}

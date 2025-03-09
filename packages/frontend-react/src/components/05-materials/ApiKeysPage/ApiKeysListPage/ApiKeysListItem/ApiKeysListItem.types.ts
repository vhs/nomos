import type { ReactNode } from 'react'

import type { Key } from '@/types/validators/records'

export interface ApiKeysListItemProps {
    children?: ReactNode
    apiKey: Key
}

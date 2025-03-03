import type { ReactNode } from 'react'

import type { Key } from '@/types/records'

export interface ApiKeysEditModalProps {
    children?: ReactNode
    keyId: Key['id']
}

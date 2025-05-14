import type { ReactNode } from 'react'

import type { Key } from '@/types/validators/records'

export interface ApiKeysEditModalProps {
    children?: ReactNode
    keyId: Key['id']
}

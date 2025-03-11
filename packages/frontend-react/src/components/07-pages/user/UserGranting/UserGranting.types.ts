import type { ReactNode } from 'react'

import type { zUserGrantingSchema } from './UserGranting.schema'
import type { z } from 'zod'

export interface UserGrantingProps {
    children?: ReactNode
}

export type UserGrantingSchema = z.infer<typeof zUserGrantingSchema>

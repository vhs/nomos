import type { ReactNode } from 'react'

import type { zUserGrantingSchema } from './Granting.schema'
import type { z } from 'zod'

export interface GrantingProps {
    children?: ReactNode
}

export type GrantingSchema = z.infer<typeof zUserGrantingSchema>

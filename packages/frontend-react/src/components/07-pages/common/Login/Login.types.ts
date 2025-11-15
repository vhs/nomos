import type { ReactNode } from 'react'

import type { zLoginSchema } from './Login.schema'
import type { z } from 'zod'

export interface LoginProps {
    children?: ReactNode
}

export type LoginSchema = z.infer<typeof zLoginSchema>

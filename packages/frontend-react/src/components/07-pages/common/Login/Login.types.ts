import type { ReactNode } from 'react'

import type { LoginSchema } from './Login.schema'
import type { z } from 'zod'

export interface LoginProps {
    children?: ReactNode
}

export type LoginForm = z.infer<typeof LoginSchema>

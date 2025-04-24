import type { zAdminMembershipsSchema } from './AdminMemberships.schema'
import type { z } from 'zod'

import type { TablePageItemComponent } from '@/types/ui'
import type { Membership } from '@/types/validators/records'

export interface AdminMembershipsProps extends TablePageItemComponent<Membership> {}

export type AdminMembershipsSchema = z.infer<typeof zAdminMembershipsSchema>

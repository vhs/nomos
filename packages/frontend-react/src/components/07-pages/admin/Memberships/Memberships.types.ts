import type { zAdminMembershipsSchema } from './Memberships.schema'
import type { z } from 'zod'

import type { TablePageItemComponent } from '@/types/ui'
import type { Membership } from '@/types/validators/records'

export interface MembershipsProps extends TablePageItemComponent<Membership> {}

export type MembershipsSchema = z.infer<typeof zAdminMembershipsSchema>

import type { TablePageItemComponent } from '@/types/ui'
import type { Privilege } from '@/types/validators/records'

export interface PrivilegesItemProps extends TablePageItemComponent<Privilege> {}

export type * from '../Privileges.types'

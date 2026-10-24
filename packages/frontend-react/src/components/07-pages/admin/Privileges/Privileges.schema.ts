import { zPrivilege } from '@/lib/validators/records'

export const zAdminPrivilegeItemSchema = zPrivilege.omit({ id: true })

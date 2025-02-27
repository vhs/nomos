import { zPrivilege } from '@/lib/validators/records'

export const AdminPrivilegeItemSchema = zPrivilege.omit({ id: true })

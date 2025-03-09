import type { AdminPrivilegeItemSchema } from './AdminPrivileges.types'

export const AdminPrivilegesFields = [
    {
        title: 'Name',
        field: 'name'
    },
    {
        title: 'Code',
        field: 'code'
    },
    {
        title: 'Description',
        field: 'description'
    },
    {
        title: 'Icon',
        field: 'icon'
    },
    {
        title: 'Enabled',
        field: 'enabled'
    }
]

export const AdminPrivilegeItemDefaultValues: AdminPrivilegeItemSchema = {
    name: '',
    code: '',
    enabled: false
}

import type { GrantingSchema } from './Granting.types'

export const GrantingDefaultValues: GrantingSchema = {
    query: '',
    queryInput: '',
    page: 0,
    pageSize: 10,
    columns: 'id,username,fname,lname,email',
    order: 'username'
}

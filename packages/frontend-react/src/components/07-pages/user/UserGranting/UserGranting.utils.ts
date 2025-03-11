import type { UserGrantingSchema } from './UserGranting.types'

export const UserGrantingDefaultValues: UserGrantingSchema = {
    query: '',
    queryInput: '',
    page: 0,
    pageSize: 10,
    columns: 'id,username,fname,lname,email',
    order: 'username'
}

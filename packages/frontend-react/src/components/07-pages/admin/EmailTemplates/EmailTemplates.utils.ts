import type { FieldDefinitions } from '@/lib/db/utils/query-filters'

export const EmailTemplatesFields: FieldDefinitions = [
    { field: 'name', title: 'Name' },
    { field: 'code', title: 'Code' },
    { field: 'subject', title: 'Subject' },
    { field: 'help', title: 'Help' },
    { field: 'body', title: 'Text Body' },
    { field: 'html', title: 'HTML Body' }
]

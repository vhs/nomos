import type { FieldDefinitions } from '@/types/query-filters'

export const webhookFields: FieldDefinitions = [
    { title: 'ID', field: 'id' },
    { title: 'Name', field: 'name' },
    { title: 'Description', field: 'description' },
    { title: 'Enabled', field: 'enabled' },
    { title: 'User ID', field: 'userid' },
    { title: 'URL', field: 'url' },
    { title: 'Translation', field: 'translation' },
    { title: 'Headers', field: 'headers' },
    { title: 'Method', field: 'method' },
    { title: 'Event ID', field: 'eventid' }
]

export const webhookTableSettings = {
    webhooks: [],
    itemCount: 0,
    showUnauthorized: false,
    showOrphaned: false,
    searchPage: 1,
    searchPageSize: 10,
    allowedPageSizes: [10, 20, 50, 100, 1000, 10000],
    searchColumns: 'id,name,description,enabled,userid,url,translation,headers,method,eventid',
    searchOrder: 'id',
    searchQuery: '',
    searchFilter: null,
    updating: true,
    pendingUpdate: 0
}

// import { QueryFilter } from '@/types/query-filters'
import { http, HttpResponse } from 'msw'

import type { Filter } from '@/types/query-filters'

import { mockCurrentUser, mockPrincipalUserData, mockServiceData } from './data'
import { filterMockData } from './functions'
// import { filterMockData } from './functions'

export const mockHandlers = [
    http.get('/services/v2/AuthService2.svc/CurrentUser', () => {
        console.debug(`mockHandlers['/services/v2/AuthService2.svc/CurrentUser']`)
        return HttpResponse.json(mockCurrentUser)
    }),

    http.get('/services/v2/PreferenceService2.svc/SystemPreference', ({ request }) => {
        console.debug(`mockHandlers['/services/v2/PreferenceService2.svc/SystemPreference']`)
        const url = new URL(request.url)

        const key = url.searchParams.get('key')

        if (key === 'innerdoor') return HttpResponse.json({ value: '1234' })

        return new HttpResponse(null, { status: 404 })
    }),

    http.get('/services/v2/UserService2.svc/GetUser', ({ request }) => {
        console.debug(`mockHandlers['/services/v2/UserService2.svc/GetUser']`)
        const url = new URL(request.url)

        const userId = url.searchParams.get('userid')

        if (userId == null) return new HttpResponse(null, { status: 404 })

        return HttpResponse.json(mockPrincipalUserData)
    }),

    http.post('/services/v2/MockService2.svc/CountMock', async ({ request }) => {
        const formData = (await request.json()) as Record<string, unknown>

        return formData?.filters != null
            ? HttpResponse.json(filterMockData(mockServiceData, formData?.filters as Filter).length)
            : HttpResponse.json(mockServiceData.length)
    }),

    http.post('/services/v2/MockService2.svc/ListMock', async ({ request }) => {
        const formData = (await request.json()) as Record<string, unknown>

        return formData?.filters != null
            ? HttpResponse.json(filterMockData(mockServiceData, formData?.filters as Filter))
            : HttpResponse.json(mockServiceData)
    }),

    http.post('/services/v2/MockService2.svc/CountUserMock', async ({ request }) => {
        const formData = (await request.json()) as Record<string, unknown>

        return formData?.filters != null
            ? HttpResponse.json(filterMockData(mockServiceData, formData?.filters as Filter).length)
            : HttpResponse.json(mockServiceData.length)
    }),

    http.post('/services/v2/MockService2.svc/ListUserMock', async ({ request }) => {
        const formData = (await request.json()) as Record<string, unknown>

        return formData?.filters != null
            ? HttpResponse.json(filterMockData(mockServiceData, formData?.filters as Filter))
            : HttpResponse.json(mockServiceData)
    })
]

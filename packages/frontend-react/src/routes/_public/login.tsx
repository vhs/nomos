import { createFileRoute } from '@tanstack/react-router'

import Login from '@/components/07-pages/common/Login/Login.lazy'

export const Route = createFileRoute('/_public/login')({
    component: Login,
    validateSearch: (search?: Record<string, unknown>): { redirectUri?: string } => {
        if (search?.redirectUri != null)
            return {
                redirectUri: search.redirectUri as string
            }
        else return {}
    }
})

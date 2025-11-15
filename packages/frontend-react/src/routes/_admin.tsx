import { createFileRoute, redirect } from '@tanstack/react-router'

import AdminLayout from '@/components/06-layouts/AdminLayout/AdminLayout.lazy'

export const Route = createFileRoute('/_admin')({
    component: AdminLayout,
    beforeLoad: ({ context, location }) => {
        if (!(context.auth?.isAuthenticated ?? false)) {
            redirect({
                throw: true,
                to: '/login',
                search: {
                    redirectUri: location.href
                }
            })
        }
    }
})

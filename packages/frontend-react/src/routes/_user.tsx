import { createFileRoute, redirect } from '@tanstack/react-router'

import UserLayout from '@/components/06-layouts/UserLayout/UserLayout.lazy'

export const Route = createFileRoute('/_user')({
    component: UserLayout,
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

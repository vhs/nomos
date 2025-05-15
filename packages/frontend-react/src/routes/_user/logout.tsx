import type { JSX } from 'react'

import { createFileRoute, Navigate } from '@tanstack/react-router'

export const Route = createFileRoute('/_user/logout')({
    component: RouteComponent,
    beforeLoad: ({ context }) => {
        context.auth?.logout()
    }
})

function RouteComponent(): JSX.Element {
    return <Navigate to='/' />
}

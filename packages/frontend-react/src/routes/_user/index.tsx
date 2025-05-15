import type { JSX } from 'react'

import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_user/')({
    component: Index,
    beforeLoad: ({ context }) => {
        if (context.auth?.isAuthenticated ?? false) {
            redirect({
                throw: true,
                to: '/dashboard'
            })
        }
    }
})

function Index(): JSX.Element {
    return (
        <div className='p-2'>
            <h3>Welcome to NOMOS!</h3>
        </div>
    )
}

import type { JSX } from 'react'

import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_admin/admin/')({
    component: Index,
    beforeLoad: () => {
        redirect({
            throw: true,
            to: '/admin/dashboard'
        })
    }
})

function Index(): JSX.Element {
    return <>Admin Page</>
}

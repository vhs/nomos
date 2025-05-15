import type { JSX } from 'react'

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_user/vhsopen')({
    component: Index
})

function Index(): JSX.Element {
    return (
        <div className='p-2'>
            <h3>Welcome to Index!</h3>
        </div>
    )
}

import type { JSX } from 'react'

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_user/apikeys/$keyId')({
    component: Details
})

function Details(): JSX.Element {
    return (
        <div className='p-2'>
            <h3>Welcome to Details!</h3>
        </div>
    )
}

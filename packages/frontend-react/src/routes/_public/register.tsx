import type { JSX } from 'react'

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/register')({
    component: Reset
})

function Reset(): JSX.Element {
    return (
        <div className='p-2'>
            <h3>Welcome to Reset!</h3>
        </div>
    )
}

import type { FC } from 'react'

import { Link } from '@tanstack/react-router'

import type { NotFoundComponentProps } from './NotFoundComponent.types'

const NotFoundComponent: FC<NotFoundComponentProps> = () => (
    <div>
        <p>Not found!</p>
        <Link to='/'>Go home</Link>
    </div>
)

export default NotFoundComponent

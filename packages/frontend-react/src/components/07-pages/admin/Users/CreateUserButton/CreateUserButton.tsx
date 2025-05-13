import type { FC } from 'react'

import { Link } from '@tanstack/react-router'

import type { CreateUserButtonProps } from './CreateUserButton.types'

const CreateUserButton: FC<CreateUserButtonProps> = () => (
    <div className='w-fit' data-testid='CreateUserButton'>
        <Link to='/admin/users/new'>
            <div className='btn btn-sm btn-warning'>Create User</div>
        </Link>
    </div>
)

export default CreateUserButton

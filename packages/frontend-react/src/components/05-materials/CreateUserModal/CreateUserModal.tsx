import type { FC } from 'react'

import type { CreateUserModalProps } from './CreateUserModal.types'

import Button from '@/components/01-atoms/Button/Button'

const CreateUserModal: FC<CreateUserModalProps> = () => (
    <div data-testid='CreateUserModal'>
        <Button variant='warning' className='btn-sm'>
            Create User
        </Button>
    </div>
)

export default CreateUserModal

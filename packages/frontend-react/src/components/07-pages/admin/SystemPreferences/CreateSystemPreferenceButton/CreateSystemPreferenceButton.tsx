import type { FC } from 'react'

import { Link } from '@tanstack/react-router'

import type { CreateSystemPreferenceButtonProps } from './CreateSystemPreferenceButton.types'

const CreateSystemPreferenceButton: FC<CreateSystemPreferenceButtonProps> = () => (
    <div className='w-fit' data-testid='CreateSystemPreferenceButton'>
        <Link to='/admin/systempreferences/new'>
            <div className='btn btn-sm btn-warning'>Create System Preference</div>
        </Link>
    </div>
)

export default CreateSystemPreferenceButton

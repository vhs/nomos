import type { FC } from 'react'

import { Link } from '@tanstack/react-router'

import type { APIKeysCardProps, APIKeysProps } from './UserProfile.types'

import FormControl from '@/components/01-atoms/FormControl/FormControl'
import Card from '@/components/04-composites/Card'

const APIKeys: FC<APIKeysProps> = ({ currentUser }) => {
    const keys = currentUser.keys.filter((key) => key.type === 'api')

    if (keys.length === 0) {
        return <>No API keys found</>
    }

    return (
        <>
            {keys.map((key) => {
                return <FormControl formType='text' className='w-full' key={key.id} value={key.key} readOnly disabled />
            })}
        </>
    )
}

const APIKeysCard: FC<APIKeysCardProps> = ({ currentUser }) => {
    return (
        <Card>
            <Card.Header>API Keys</Card.Header>
            <Card.Body>
                <APIKeys currentUser={currentUser} />
            </Card.Body>
            <Card.Footer>
                <Link to='/apikeys'>Manage API keys</Link>
            </Card.Footer>
        </Card>
    )
}

export default APIKeysCard

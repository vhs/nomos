import type { FC } from 'react'

import { Link } from '@tanstack/react-router'

import type { APIKeysCardProps, APIKeysProps } from './UserProfile.types'

import Card from '@/components/04-composites/Card/Card'
import FormControl from '@/components/04-composites/FormControl/FormControl'

import { KeyInfo } from './UserProfile.ui'

const APIKeys: FC<APIKeysProps> = ({ currentUser }) => {
    const keys = currentUser.keys.filter((key) => key.type === 'api')

    if (keys.length === 0) {
        return <>No API keys found</>
    }

    return (
        <>
            {keys.map((key) => {
                return (
                    <FormControl
                        id={`keys.api.${key.key}`}
                        formType='text'
                        className='w-full'
                        key={key.id}
                        value={key.key}
                        readOnly
                        disabled
                        infoButton={{ title: `API Key Info`, children: <KeyInfo key={key.key} keyInfo={key} /> }}
                    />
                )
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

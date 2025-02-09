import type { FC } from 'react'

import type { RFIDKeysProps, RFIDKeysCardProps } from './UserProfile.types'

import FormControl from '@/components/01-atoms/FormControl/FormControl'
import Card from '@/components/04-composites/Card'

const RFIDKeys: FC<RFIDKeysProps> = ({ currentUser }) => {
    const keys = currentUser.keys.filter((key) => key.type === 'rfid')

    return (
        <>
            {keys.map((key) => {
                return <FormControl formType='text' className='w-full' key={key.id} value={key.key} readOnly disabled />
            })}
        </>
    )
}

const RFIDKeysCard: FC<RFIDKeysCardProps> = ({ currentUser }) => {
    return (
        <Card>
            <Card.Header>RFID Keys</Card.Header>
            <Card.Body>
                Your tracked RFID Tokens:
                <br />
                <RFIDKeys currentUser={currentUser} />
            </Card.Body>
        </Card>
    )
}

export default RFIDKeysCard

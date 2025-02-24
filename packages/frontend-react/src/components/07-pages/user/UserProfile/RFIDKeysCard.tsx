import type { FC } from 'react'

import type { RFIDKeysProps, RFIDKeysCardProps } from './UserProfile.types'

import Card from '@/components/04-composites/Card/Card'
import FormControl from '@/components/04-composites/FormControl/FormControl'

import { KeyInfo } from './UserProfile.ui'

const RFIDKeys: FC<RFIDKeysProps> = ({ currentUser }) => {
    const keys = currentUser.keys.filter((key) => key.type === 'rfid')

    return (
        <>
            {keys.map((key) => {
                return (
                    <FormControl
                        id={`keys.rfid.${key.key}`}
                        formType='text'
                        className='w-full'
                        key={key.id}
                        value={key.key}
                        readOnly
                        disabled
                        infoButton={{ title: `RFID Key Info`, children: <KeyInfo key={key.key} keyInfo={key} /> }}
                    />
                )
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

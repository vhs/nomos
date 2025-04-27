import { type FC, useState, useMemo } from 'react'

import Button from '@/components/01-atoms/Button/Button'
import Col from '@/components/01-atoms/Col/Col'
import Conditional from '@/components/01-atoms/Conditional/Conditional'
import Pill from '@/components/01-atoms/Pill/Pill'
import Row from '@/components/01-atoms/Row/Row'
import OverlayCard from '@/components/05-materials/OverlayCard/OverlayCard'

import type PrincipalUserObject from '@/lib/db/models/PrincipalUser'
import type UserObject from '@/lib/db/models/User'
import PinService2 from '@/lib/providers/PinService2'

const PinCard: FC<{ currentUser: PrincipalUserObject | UserObject }> = ({ currentUser }) => {
    const [showModal, setShowModal] = useState<boolean>(false)

    const hideModal = (): void => {
        setShowModal(false)
    }

    const toggleModal = (show?: boolean): void => {
        show ??= true

        setShowModal(show)
    }

    const generatePin = async (): Promise<void> => {
        const response = await PinService2.getInstance().GeneratePin(currentUser.id)

        console.log('generatePin', 'response:', response)
        // var split = response.key.split('|')
        // response.pinid = split[0]
        // response.pin = split[1]
        // currentUser.keys.push(response)
    }

    const pinInfo = useMemo(() => currentUser.keys.find((key) => key.type === 'pin'), [currentUser.keys])

    const keyInfo = useMemo(() => {
        return pinInfo != null
            ? {
                  ...pinInfo,
                  privileges:
                      pinInfo.privileges != null ? pinInfo.privileges.map((privilege) => privilege.code).join(' ') : ''
              }
            : pinInfo
    }, [pinInfo])

    if (pinInfo == null || keyInfo == null) {
        return (
            <Button
                onClick={() => {
                    void generatePin()
                }}
            >
                Generate Pin
            </Button>
        )
    }

    return (
        <div>
            <Row>
                <Col>
                    <Button
                        onClick={() => {
                            toggleModal()
                        }}
                    >
                        Show Pin
                    </Button>
                </Col>
            </Row>

            <OverlayCard
                title='PIN'
                closeLabel='Close'
                onClose={() => {
                    hideModal()
                    return false
                }}
                show={showModal}
            >
                <Row>
                    <Col className='basis-1/2'>PIN</Col>
                    <Col className='basis-1/2'>
                        <div className='flex flex-row justify-start text-lg'>
                            <span className='rounded-l-md border-y-2 border-l-2 bg-gray-200 px-2'>{keyInfo.pinid}</span>
                            <span className='rounded-r-md border-2 border-l-black px-2'>{keyInfo.pin}</span>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className='basis-1/2'>Notes</Col>
                    <Col className='basis-1/2'>{keyInfo.notes}</Col>
                </Row>
                <Row>
                    <Col className='basis-1/2'>Created:</Col>
                    <Col className='basis-1/2'>{keyInfo.created.toLocaleString()}</Col>
                </Row>
                <Row>
                    <Col>Special privileges for this key:</Col>
                </Row>
                <Row>
                    <Conditional condition={'privileges' in pinInfo}>
                        {pinInfo.privileges?.map((privilege) => (
                            <Col key={privilege.code}>
                                <Pill>{privilege.code}</Pill>
                            </Col>
                        ))}
                    </Conditional>
                </Row>
                <Row>
                    <Col>
                        <small>Access log to be added</small>
                    </Col>
                </Row>
            </OverlayCard>
        </div>
    )
}

export default PinCard

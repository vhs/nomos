import type { FC } from 'react'

import clsx from 'clsx'

import type { ModalHeaderProps } from './ModalHeader.types'

import Col from '@/components/01-atoms/Col/Col'
import Conditional from '@/components/01-atoms/Conditional/Conditional'
import FontAwesomeIcon from '@/components/01-atoms/FontAwesomeIcon/FontAwesomeIcon'
import Row from '@/components/01-atoms/Row/Row'

const ModalHeader: FC<ModalHeaderProps> = ({ children, className, closeButton }) => {
    const showCloseButton = closeButton != null

    return (
        <div className={clsx([className, 'rounded-t-lg p-2'])} data-testid='ModalHeader'>
            <Row>
                <Col className={clsx([showCloseButton ? 'basis-11/12' : 'basis-auto', 'text-center font-bold italic'])}>
                    {children}
                </Col>

                <Conditional condition={showCloseButton}>
                    <Col className='basis-1/12'>
                        <FontAwesomeIcon icon='xmark' onClick={closeButton} />
                    </Col>
                </Conditional>
            </Row>
        </div>
    )
}

export default ModalHeader

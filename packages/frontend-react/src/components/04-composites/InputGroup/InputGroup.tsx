import type { FC } from 'react'

import clsx from 'clsx'

import type { InputGroupProps } from './InputGroup.types'

import Col from '@/components/01-atoms/Col/Col'
import Conditional from '@/components/01-atoms/Conditional/Conditional'
import Row from '@/components/01-atoms/Row/Row'

const InputGroup: FC<InputGroupProps> = ({ children, className, prepend }) => (
    <Row className={clsx([className, 'spacious h-8 w-full'])} data-testid='InputGroup'>
        <Col className='flex basis-11/12'>
            <Conditional condition={prepend != null}>
                <div className='border-y border-l px-4 py-2'>{prepend}</div>
            </Conditional>
            {children}
        </Col>
    </Row>
)

export default InputGroup

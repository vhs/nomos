import type { FC } from 'react'

import type { UnderConstructionBannerProps } from './UnderConstructionBanner.types'

import Col from '../Col/Col'
import Row from '../Row/Row'

const UnderConstructionBanner: FC<UnderConstructionBannerProps> = () => (
    <div data-testid='UnderConstructionBanner'>
        <Row>
            <Col></Col>
            <Col>
                <div className='flex flex-row'>
                    <div>
                        <img
                            className='max-h-16 max-w-16'
                            alt='90s-style animated construction GIF/JIF'
                            src='/images/under-construction90s-90s.gif'
                        />
                    </div>
                    <div className='mt-5 size-fit px-3 align-middle'>
                        <h1 className='text-nowrap leading-6'>Under Construction</h1>
                    </div>
                </div>
            </Col>
            <Col></Col>
        </Row>
    </div>
)

export default UnderConstructionBanner

import type { JSX } from 'react'

import type { PartialStoryFn } from '@storybook/csf'
import type { ReactRenderer } from '@storybook/react'

import Col from '@/components/01-atoms/Col/Col'
import Row from '@/components/01-atoms/Row/Row'

export const CenteredContentStorybookDecorator = <T = Record<string, unknown>,>(
    Story: PartialStoryFn<ReactRenderer, T>
): JSX.Element => {
    return (
        <Row className='spacious'>
            <Col className='hidden lg:block lg:basis-1/4'></Col>
            <Col className='basis-full text-center lg:basis-2/4'>
                <Story />
            </Col>
            <Col className='hidden lg:block lg:basis-1/4'></Col>
        </Row>
    )
}

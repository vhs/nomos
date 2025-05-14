import type { FC } from 'react'

import { Link } from '@tanstack/react-router'

import type { OAuthPageDefaultViewProps } from './OAuthPageDefaultView.types'

import Col from '@/components/01-atoms/Col/Col'
import Row from '@/components/01-atoms/Row/Row'

import type { ValidRoutePath } from '@/types/routing'

const OAuthPageDefaultView: FC<OAuthPageDefaultViewProps> = ({ basePath }) => (
    <div data-testid='OAuthPageDefaultView'>
        <Row>
            <Col>
                <Link to={`${basePath}/clients` as ValidRoutePath}>Clients</Link>
            </Col>
        </Row>
    </div>
)

export default OAuthPageDefaultView

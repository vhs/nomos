import type { FC } from 'react'

import { Link } from '@tanstack/react-router'

import type { ApiKeyHelpProps } from './ApiKeyHelp.types'

import Col from '@/components/01-atoms/Col/Col'
import Row from '@/components/01-atoms/Row/Row'

const ApiKeyHelp: FC<ApiKeyHelpProps> = () => (
    <div data-testid='ApiKeyHelp'>
        <Row>
            <Col>
                <h4>Help</h4>
            </Col>
        </Row>
        <p>For more help, see the #vhs-nomos channel on Slack!</p>
        <br />
        <p>
            For more info, see the <Link to='/getinvolved'>Get Involved page</Link>
        </p>
    </div>
)

export default ApiKeyHelp

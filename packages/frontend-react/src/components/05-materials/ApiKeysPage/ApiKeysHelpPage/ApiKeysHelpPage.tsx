import type { FC } from 'react'

import { Link } from '@tanstack/react-router'

import type { ApiKeysHelpPageProps } from './ApiKeysHelpPage.types'

import Col from '@/components/01-atoms/Col/Col'
import Row from '@/components/01-atoms/Row/Row'

const ApiKeysHelpPage: FC<ApiKeysHelpPageProps> = () => (
    <div data-testid='ApiKeysHelpPage'>
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

export default ApiKeysHelpPage

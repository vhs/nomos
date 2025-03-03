import { useMemo, type FC } from 'react'

import type { ApiKeysListPageProps } from './ApiKeysListPage.types'

import Col from '@/components/01-atoms/Col/Col'
import Conditional from '@/components/01-atoms/Conditional/Conditional'
import Row from '@/components/01-atoms/Row/Row'
import Loading from '@/components/02-molecules/Loading/Loading'
import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

import { useApiKeysPageContext } from '../ApiKeysPage.context'
import { getApiKeysTermByScope } from '../ApiKeysPage.utils'

import ApiKeysListItem from './ApiKeysListItem/ApiKeysListItem'

const ApiKeysListPage: FC<ApiKeysListPageProps> = () => {
    const { availableKeys, availablePrivileges, scope } = useApiKeysPageContext()

    const loading = useMemo(
        () => [availablePrivileges, availableKeys].some((inp) => !Array.isArray(inp) || inp.length === 0),
        [availablePrivileges, availableKeys]
    )

    if (loading || !Array.isArray(availablePrivileges) || !Array.isArray(availableKeys)) return <LoadingOverlay />

    return (
        <div data-testid='ApiKeysListPage'>
            <Row className='spacious'>
                <Col>
                    <h4>{getApiKeysTermByScope('manageTableDescription', scope)}</h4>
                </Col>
            </Row>

            <Conditional condition={loading}>
                <Row>
                    <Col>
                        <Loading />
                    </Col>
                </Row>
            </Conditional>
            <Conditional condition={!loading && availableKeys.length === 0}>
                <Row>
                    <Col>No API Keys Configured</Col>
                </Row>
            </Conditional>

            <Conditional condition={!loading && availableKeys.length > 0}>
                <Row>
                    <Col>
                        <div>
                            <table>
                                <thead>
                                    <tr>
                                        <th className='text-center'>API Key</th>
                                        <th className='text-center'>Notes</th>
                                        <th className='text-center'>Created</th>
                                        <th className='text-center'>Expires</th>
                                        <th className='text-center'>Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {availableKeys.map((key) => {
                                        return <ApiKeysListItem key={key.key} apiKey={key} />
                                    })}
                                </tbody>

                                <tfoot>
                                    <tr>
                                        <th className='text-center'>API Key</th>
                                        <th className='text-center'>Notes</th>
                                        <th className='text-center'>Created</th>
                                        <th className='text-center'>Expires</th>
                                        <th className='text-center'>Actions</th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </Col>
                </Row>
            </Conditional>
        </div>
    )
}

export default ApiKeysListPage

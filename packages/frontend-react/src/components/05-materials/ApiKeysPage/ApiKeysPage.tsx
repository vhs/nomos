import { useMemo, useState, type FC } from 'react'

import type { ApiKeysPageProps } from './ApiKeysPage.types'

import Button from '@/components/01-atoms/Button/Button'
import Col from '@/components/01-atoms/Col/Col'
import Conditional from '@/components/01-atoms/Conditional/Conditional'
import Row from '@/components/01-atoms/Row/Row'
import Loading from '@/components/02-molecules/Loading/Loading'
import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'
import NewApiKeyForm from '@/components/02-molecules/NewApiKeyForm/NewApiKeyForm'
import PathTab from '@/components/04-composites/PathTabs/PathTab/PathTab'
import PathTabs from '@/components/04-composites/PathTabs/PathTabs'
import ApiKey from '@/components/05-materials/ApiKeysPage/ApiKey/ApiKey'
import ApiKeyHelp from '@/components/05-materials/ApiKeysPage/ApiKeyHelp/ApiKeyHelp'
import ApiKeyUsage from '@/components/05-materials/ApiKeysPage/ApiKeyUsage/ApiKeyUsage'
import BasePage from '@/components/05-materials/BasePage/BasePage'

import { getApiKeyTermByScope } from './ApiKeysPage.utils'

const ApiKeysPage: FC<ApiKeysPageProps> = ({ scope, basePath, onCreate, availablePrivileges, keys }) => {
    scope = scope ?? 'user'

    availablePrivileges ??= []
    keys ??= []

    const [showNewApiKeyForm, setShowNewApiKeyForm] = useState(false)

    const loading = useMemo(
        () => [availablePrivileges, keys].some((inp) => !Array.isArray(inp) || inp.length === 0),
        [availablePrivileges, keys]
    )

    if (loading || !Array.isArray(availablePrivileges) || !Array.isArray(keys)) return <LoadingOverlay />

    return (
        <BasePage data-testid='ApiKeysPage' title={getApiKeyTermByScope('title', scope)}>
            <PathTabs id='apikey-tabs'>
                <PathTab path={basePath} title={getApiKeyTermByScope('manageTabTitle', scope)}>
                    <Row className='spacious'>
                        <Col>
                            <h4>{getApiKeyTermByScope('manageTableDescription', scope)}</h4>
                        </Col>
                    </Row>

                    <Row className='spacious'>
                        <Col>
                            <Button
                                variant='success'
                                onClick={() => {
                                    setShowNewApiKeyForm(true)
                                }}
                            >
                                Generate Key
                            </Button>
                            <Conditional condition={showNewApiKeyForm}>
                                <NewApiKeyForm
                                    show={showNewApiKeyForm}
                                    onHide={() => {
                                        setShowNewApiKeyForm(false)
                                    }}
                                    onCreate={onCreate}
                                />
                            </Conditional>
                        </Col>
                    </Row>

                    <Conditional condition={loading}>
                        <Row>
                            <Col>
                                <Loading />
                            </Col>
                        </Row>
                    </Conditional>
                    <Conditional condition={!loading && keys.length === 0}>
                        <Row>
                            <Col>No API Keys Configured</Col>
                        </Row>
                    </Conditional>

                    <Conditional condition={!loading && keys.length > 0}>
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
                                            {keys.map((key) => {
                                                return (
                                                    <ApiKey
                                                        key={key.key}
                                                        apiKey={key}
                                                        availablePrivileges={availablePrivileges}
                                                        scope={scope ?? 'user'}
                                                    />
                                                )
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
                </PathTab>

                <PathTab path={`${basePath}/usage`} title='Usage'>
                    <ApiKeyUsage />
                </PathTab>

                <PathTab path={`${basePath}/help`} title='Help'>
                    <ApiKeyHelp />
                </PathTab>
            </PathTabs>
        </BasePage>
    )
}

export default ApiKeysPage

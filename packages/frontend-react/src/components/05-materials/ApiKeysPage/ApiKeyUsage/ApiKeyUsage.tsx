import type { FC } from 'react'

import type { ApiKeyUsageProps } from './ApiKeyUsage.types'

import Col from '@/components/01-atoms/Col/Col'
import Row from '@/components/01-atoms/Row/Row'

const ApiKeyUsage: FC<ApiKeyUsageProps> = () => {
    return (
        <div>
            <Row>
                <Col>
                    <h4>Usage</h4>
                </Col>
            </Row>

            <p>API Keys are used to manage stateless authentication with the Nomos API.</p>
            <p className='text-wrap'>
                These keys are used with 3rd party software components to access your data and features available via
                the Nomos API.
            </p>
            <p className='text-wrap'>
                Click here to download the full service discovery JSON file:{' '}
                <a href='/services/v2/help'>/services/v2/help</a>
            </p>
            <p className='text-wrap'>
                Services are accessed from the /services/ path. They are namespaced by a endpoint registry key, then
                referenced by a service endpoint and finally an endpoint&apos;s method.
            </p>
            <p>E.g.</p>
            <pre className='overflow-x-scroll text-wrap'>/services/v2/UserService2.svc/GetUsers</pre>
            <ul>
                <li>
                    <b>web/</b> - the endpoint registry key
                </li>
                <li>
                    <b>UserService2.svc</b> - the endpoint
                </li>
                <li>
                    <b>GetUsers</b> - the service method
                </li>
            </ul>
            <p className='text-wrap'>
                Endpoints in the <b>/web/</b> namespace are all JSON endpoints and return data and accept parameters in
                JSON format.
            </p>
            <p className='text-wrap'>
                Parameters can be specified either as URL parameters or as POST request body formatted as JSON data.
            </p>
            <p className='text-wrap'>
                Service methods also accept the special URL parameter <b>json</b> which expects a JSON formatted string.
            </p>

            <p>E.g.</p>

            <pre className='spacious overflow-x-scroll text-wrap'>/services/v2/UserService2.svc/GetUser?id=1</pre>

            <pre className='spacious overflow-x-scroll text-wrap'>
                /services/v2/UserService2.svc/GetUser?json={JSON.stringify({ id: '1' })}
            </pre>

            <pre className='overflow-x-scroll text-wrap'>
                POST http://membership.vanhack.ca/services/v2/UserService2.svc/GetUser HTTP/1.1
                <br />
                User-Agent: MyApplication
                <br />
                Host: membership.vanhack.ca
                <br />
                Content-Length: 11
                <br />
                <br />
                {JSON.stringify({ id: '1' })}
            </pre>
            <p className='text-wrap'>
                Services maintain authenticated sessions if you are logged in as a user. This can be achieved by using
                the standard Nomos login page, or calling the login service method:
            </p>
            <pre className='text-wrap'>/services/v2/AuthService2.svc/Login</pre>
            <p className='text-wrap'>
                In most cases when developing 3rd party apps using the Nomos API you do not have a stateful flow, it is
                not practical or you do not have access to user credentials.
            </p>
            <p className='text-wrap'>
                API Keys are used in a stateless flow to authenticate and authorize each request. Users may manage their
                own API Keys and the level of access each key has which puts them more in control of their data and
                security when dealing with 3rd party apps.
            </p>
            <p className='text-wrap'>
                Service calls can be authenticated with API Keys by providing the key as a HTTP header with the request
            </p>
            <pre className='overflow-x-scroll text-wrap'>X-Api-Key</pre>
            <p>Example request:</p>
            <pre className='overflow-x-scroll text-wrap'>
                GET http://membership.vanhack.ca/services/v2/UserService2.svc/GetUsers HTTP/1.1
                <br />
                User-Agent: MyApplication
                <br />
                Host: membership.vanhack.ca
                <br />
                X-Api-Key: 618d22801ec1a6a...
                <br />
                <br />
                ...
                <br />
            </pre>
        </div>
    )
}

export default ApiKeyUsage

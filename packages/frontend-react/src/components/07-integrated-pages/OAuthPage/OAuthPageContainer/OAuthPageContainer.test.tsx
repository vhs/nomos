import { createRoot } from 'react-dom/client'

import type { OAuthPageContextValue } from '../OAuthPage.types'

import OAuthPageContainer from './OAuthPageContainer'

const textOAuthPageContextValue: OAuthPageContextValue = {
    activeView: '',
    basePath: '/test/oauth',
    scope: 'system'
}

it('It should mount', () => {
    const container = document.createElement('div')
    const root = createRoot(container)
    root.render(
        <OAuthPageContainer
            basePath={'/test/oauth'}
            contextValue={textOAuthPageContextValue}
            activeView={''}
            createModal={false}
            editModal={false}
        />
    )
    root.unmount()
})

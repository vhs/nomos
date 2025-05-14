import { createRoot } from 'react-dom/client'

import ApiKeysPageContainer from './ApiKeysPageContainer'

it('It should mount', () => {
    const container = document.createElement('div')
    const root = createRoot(container)
    root.render(
        <ApiKeysPageContainer
            basePath={'/apikeys'}
            contextValue={{
                activeView: 'list',
                availableKeys: [],
                availablePrivileges: [],
                basePath: '/apikeys',
                scope: 'user'
            }}
            createModal={false}
            editModal={false}
            activeView={'list'}
        />
    )
    root.unmount()
})

import { createRoot } from 'react-dom/client'

import CurrentUserPrivilegesList from './CurrentUserPrivilegesList'

it('It should mount', () => {
    const container = document.createElement('div')
    const root = createRoot(container)
    root.render(
        <CurrentUserPrivilegesList
            privileges={[
                {
                    id: 1,
                    code: 'test',
                    name: 'Test',
                    enabled: false
                }
            ]}
        />
    )
    root.unmount()
})

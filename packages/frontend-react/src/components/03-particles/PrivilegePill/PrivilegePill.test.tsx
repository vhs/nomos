import { createRoot } from 'react-dom/client'

import PrivilegePill from './PrivilegePill'

it('It should mount', () => {
    const container = document.createElement('div')
    const root = createRoot(container)
    root.render(
        <PrivilegePill
            privilege={{
                id: 1,
                code: 'test',
                name: 'Test',
                enabled: false
            }}
        />
    )
    root.unmount()
})

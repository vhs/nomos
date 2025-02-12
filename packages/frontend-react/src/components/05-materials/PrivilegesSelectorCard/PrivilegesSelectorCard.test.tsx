import { createRoot } from 'react-dom/client'

import PrivilegesSelectorCard from './PrivilegesSelectorCard'

it('It should mount', () => {
    const container = document.createElement('div')
    const root = createRoot(container)
    root.render(
        <PrivilegesSelectorCard
            availablePrivileges={[
                { name: 'Privilege1', code: 'privilege1' },
                { name: 'privilege2', code: 'privilege2' }
            ]}
            onUpdate={(mutation) => {
                console.log(mutation)
            }}
        />
    )
    root.unmount()
})

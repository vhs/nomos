import { createRoot } from 'react-dom/client'

import PrivilegeIcon from './PrivilegeIcon'

it('It should mount', () => {
    const container = document.createElement('div')
    const root = createRoot(container)
    root.render(<PrivilegeIcon icon={'air-freshener'} />)
    root.unmount()
})

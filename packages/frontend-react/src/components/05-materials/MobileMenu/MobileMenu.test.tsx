import { createRoot } from 'react-dom/client'

import MobileMenu from './MobileMenu'
import { ExampleMenuItems } from './MobileMenu.utils'

it('It should mount', () => {
    const container = document.createElement('div')
    const root = createRoot(container)
    root.render(<MobileMenu menuItems={ExampleMenuItems} />)
    root.unmount()
})

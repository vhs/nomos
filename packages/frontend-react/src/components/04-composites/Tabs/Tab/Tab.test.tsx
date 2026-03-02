import { createRoot } from 'react-dom/client'

import Tab from './Tab'

it('It should mount', () => {
    const container = document.createElement('div')
    const root = createRoot(container)
    root.render(
        <Tab tabKey={'content'} title={'Conten'}>
            Content
        </Tab>
    )
    root.unmount()
})

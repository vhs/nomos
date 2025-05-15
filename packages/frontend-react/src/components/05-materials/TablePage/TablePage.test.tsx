import { createRoot } from 'react-dom/client'

import TablePage from './TablePage'

it('It should mount', () => {
    const container = document.createElement('div')
    const root = createRoot(container)
    root.render(
        <TablePage
            title={'Test'}
            label={'test'}
            serviceEndpoint={'MockService2'}
            baseServiceMethod={''}
            fields={[]}
            order={'id'}
            // TODO fix this
            // @ts-expect-error This is fucky. Technical term.
            component={undefined}
        />
    )
    root.unmount()
})

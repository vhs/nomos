import type { JSX } from 'react'

import PrivilegesList from './PrivilegesList'

export default {
    title: '05-Materials/ApiKeysPage/ApiKey/PrivilegesList'
}

export const Default = (): JSX.Element => (
    <PrivilegesList
        keyPrivileges={[]}
        basePrivileges={[]}
        callback={function (_code: string): void {
            throw new Error('Function not implemented.')
        }}
    />
)

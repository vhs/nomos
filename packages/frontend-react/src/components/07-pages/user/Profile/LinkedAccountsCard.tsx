import type { FC } from 'react'

import Card from '@/components/03-particles/Card/Card'

import type UserObject from '@/lib/db/models/User'

const providers = [
    { id: 'github', name: 'GitHub', icon: '/images/provider/github.png' },
    { id: 'google', name: 'Google', icon: '/images/provider/google.png' },
    { id: 'slack', name: 'Slack', icon: '/images/provider/slack.png' }
]

const AccountProvidersLinks: FC = () => {
    return (
        <>
            {providers.map(({ id, name, icon }) => (
                <div key={id}>
                    <a title={`Link your ${name} account`} href={`/oauth/${id}.php?action=link`}>
                        <img alt={name} src={icon} />
                    </a>
                </div>
            ))}
        </>
    )
}

const LinkedAccounts: FC<{ currentUser: UserObject }> = ({ currentUser }) => {
    const accounts = currentUser.keys.filter(
        (key) => key.type === 'github' || key.type === 'slack' || key.type === 'google'
    )

    if (accounts.length === 0) {
        return <i>No linked accounts</i>
    }

    return (
        <>
            {accounts.map((key) => {
                const providerImageURL = '/images/provider/' + key.type + '.png'
                return <img key={key.id} alt={key.type} src={providerImageURL} />
            })}
        </>
    )
}

const LinkedAccountsCard: FC<{ currentUser: UserObject }> = ({ currentUser }) => {
    return (
        <Card>
            <Card.Header>Linked Accounts</Card.Header>
            <Card.Body>
                <p>Linked accounts are used to access other services, such as the laser cutter.</p>
                <p className='spacious'>
                    <LinkedAccounts currentUser={currentUser} />
                </p>
                <h5 className='spacious'>Link New Account</h5>
                <div className='flex flex-row justify-evenly'>
                    <AccountProvidersLinks />
                </div>
            </Card.Body>
        </Card>
    )
}

export default LinkedAccountsCard

/* eslint-disable @typescript-eslint/naming-convention */

import PrincipalUserObject from '@/lib/db/PrincipalUser'

import AuthService2 from './AuthService2'
import UserService2 from './UserService2'

export default class CurrentUser {
    public async GetCurrentUser(): Promise<PrincipalUserObject> {
        const principal = await AuthService2.getInstance().CurrentUser()

        if (typeof principal !== 'string' && principal?.id != null) {
            const userInfo = await UserService2.getInstance().GetUser(principal.id)

            if (userInfo == null || typeof userInfo !== 'object') throw new Error('Invalid user data')

            return new PrincipalUserObject(userInfo)
        } else {
            throw new Error('not logged in')
        }
    }
}

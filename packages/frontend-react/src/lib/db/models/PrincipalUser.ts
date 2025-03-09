import type { IPrincipalUserObject } from '@/types/db'

import UserObject from './User'

export default class PrincipalUserObject extends UserObject implements IPrincipalUserObject {
    hasPermission(priv: string): boolean {
        return this.privilegeCache.includes(priv)
    }
}

import type { ArrayElement } from './utils'
import type { Privileges, Membership } from './validators/records'

export type EventType = string
export type EventTypes = EventType[]

export type PrivilegeCodes = string[]

export type CombinedPrivileges = Privileges | Membership['privileges']
export type CombinedPrivilege = ArrayElement<CombinedPrivileges>

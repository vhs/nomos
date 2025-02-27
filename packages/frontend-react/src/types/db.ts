export interface IUserObject {
    hasPrivilege: (priv: string) => boolean
}
export interface IPrincipalUserObject {
    hasPermission: (priv: string) => boolean
}

export class HTTPException extends Error {
    info?: string
    status?: Response['status']
}

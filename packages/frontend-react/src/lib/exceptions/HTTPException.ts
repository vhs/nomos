export class HTTPException extends Error {
    data?: unknown
    info?: string
    status?: Response['status']
}

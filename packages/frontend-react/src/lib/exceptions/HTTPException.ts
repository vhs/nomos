export class HTTPException extends Error {
    info?: unknown
    status?: Response['status']
}

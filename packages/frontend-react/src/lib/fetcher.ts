import { HTTPException } from './exceptions/HTTPException'

type FetchEncodeOpts = Partial<RequestInit> | { body?: object }

const coerceURL = (urlInput: unknown): URL => {
    if (urlInput == null) throw new Error('Null URL')

    if (urlInput instanceof URL) return urlInput

    if (typeof urlInput === 'string') return new URL(urlInput)

    if (
        typeof urlInput === 'object' &&
        'url' in urlInput &&
        urlInput.url != null &&
        (urlInput.url instanceof URL || typeof urlInput.url === 'string')
    )
        return new URL(urlInput.url)

    throw new Error('Invalid URL')
}

export const fetchEncode = (opts: FetchEncodeOpts): RequestInit => {
    const result = opts

    if (result.body != null && typeof result.body === 'object') result.body = JSON.stringify(result.body)

    return result as RequestInit
}

export const fetcher = async <T = unknown>(input: RequestInfo | URL, init?: RequestInit): Promise<T> => {
    const response = await fetch(input, init)

    // eslint-disable-next-line @typescript-eslint/init-declarations
    let data

    if (response.ok) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        if (response.headers.get('Content-Type') === 'application/json') data = await response.json()
        else data = await response.text()
    } else {
        const error = new HTTPException('Unexpected error from server')

        const exceptionInfo = await response.text()

        error.info = exceptionInfo.includes('#0 /')
            ? exceptionInfo.substring(0, exceptionInfo.indexOf('#0 /'))
            : exceptionInfo

        error.status = response.status

        throw error
    }

    return data as T
}

export const getter = async <T = unknown>(input: RequestInfo | URL, init?: RequestInit): Promise<T> => {
    if (init?.method !== 'GET') {
        init = {
            ...init,
            method: 'GET'
        }
    }

    return await fetcher<T>(input, init)
}

export const patcher = async <T = unknown>(input: RequestInfo | URL, init?: RequestInit): Promise<T> => {
    if (init?.method !== 'PATCH') {
        init = {
            ...init,
            method: 'PATCH'
        }
    }

    return await fetcher<T>(input, init)
}

export const pusher = async <T = unknown>(input: RequestInfo | URL, init?: RequestInit): Promise<T> => {
    if (init?.method !== 'POST') {
        init = {
            ...init,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    }

    return await fetcher<T>(input, init)
}

export const putter = async <T = unknown>(input: RequestInfo | URL, init?: RequestInit): Promise<T> => {
    if (init?.method !== 'PUT') {
        init = {
            ...init,
            method: 'PUT'
        }
    }

    return await fetcher<T>(input, init)
}

export const getWithParams = async <T = unknown>(
    input: RequestInfo | URL,
    params?: Record<string, string>,
    init?: RequestInit
): Promise<T> => {
    const url = coerceURL(input)

    if (params != null) {
        for (const key in params) {
            url.searchParams.set(key, params[key])
        }
    }

    return await getter<T>(url, init)
}

export const patchWithParams = async <T = unknown>(
    input: RequestInfo | URL,
    params?: Record<string, unknown>,
    init?: RequestInit
): Promise<T> => {
    if (params != null) {
        init = fetchEncode({
            ...init,
            body: params
        })
    }

    return await patcher<T>(input, init)
}

export const postWithParams = async <T = unknown>(
    input: RequestInfo | URL,
    params?: Record<string, unknown>,
    init?: RequestInit
): Promise<T> => {
    if (params != null) {
        init = fetchEncode({
            ...init,
            body: params
        })
    }

    return await pusher<T>(input, init)
}

export const putWithParams = async <T = unknown>(
    input: RequestInfo | URL,
    params?: Record<string, unknown>,
    init?: RequestInit
): Promise<T> => {
    if (params != null) {
        init = fetchEncode({
            ...init,
            body: params
        })
    }

    return await putter<T>(input, init)
}

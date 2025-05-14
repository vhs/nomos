import type { CreateWebHookFormSchema } from './CreateWebHookForm.types'

export const CreateWebHookDefaultValues: CreateWebHookFormSchema = {
    name: '',
    description: '',
    enabled: false,
    url: '',
    translation: '',
    headers: '',
    // @ts-expect-error invalid empty type
    method: '',
    eventId: 0,
    privileges: {}
}

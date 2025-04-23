/* eslint-disable @typescript-eslint/naming-convention */
// Do not change manually.

import type { Filter } from '@/lib/db/utils/query-filters'

import type { BackendResult } from '@/types/api'
import type { EmailTemplate, EmailTemplates, User } from '@/types/validators/records'

export interface IEmailService2 {
    /**
     * @permission administrator
     *
     * @param {Filter|null} filters
     *
     * @returns {number}
     */
    CountTemplates: (filters: Filter | null) => BackendResult<number>

    /**
     * @permission administrator
     *
     * @param {number} id
     *
     * @returns {void}
     */
    DeleteTemplate: (id: number) => BackendResult<void>

    /**
     * Summary of Email.
     *
     * @permission administrator
     *
     * @param {string}                 email
     * @param {string}                 tmpl
     * @param {Record<string,unknown>} context
     * @param {string|null}            subject
     *
     * @returns {void}
     */
    Email: (
        email: string,
        tmpl: string,
        context: Record<string, unknown>,
        subject: string | null
    ) => BackendResult<void>

    /**
     * Summary of EmailUser.
     *
     * @permission administrator
     *
     * @param {User}                   user    email address
     * @param {string}                 tmpl
     * @param {Record<string,unknown>} context
     * @param {string|null}            subject
     *
     * @returns {void}
     */
    EmailUser: (
        user: User,
        tmpl: string,
        context: Record<string, unknown>,
        subject: string | null
    ) => BackendResult<void>

    /**
     * @permission administrator
     *
     * @param {number} id
     *
     * @returns {EmailTemplate|null}
     */
    GetTemplate: (id: number) => BackendResult<EmailTemplate | null>

    /**
     * @permission administrator
     *
     * @param {number}      page
     * @param {number}      size
     * @param {string}      columns
     * @param {string}      order
     * @param {Filter|null} filters
     *
     * @returns {EmailTemplates}
     */
    ListTemplates: (
        page: number,
        size: number,
        columns: string,
        order: string,
        filters: Filter | null
    ) => BackendResult<EmailTemplates>

    /**
     * @permission administrator
     *
     * @param {string} name
     * @param {string} code
     * @param {string} subject
     * @param {string} help
     * @param {string} body
     * @param {string} html
     *
     * @returns {boolean}
     */
    PutTemplate: (
        name: string,
        code: string,
        subject: string,
        help: string,
        body: string,
        html: string
    ) => BackendResult<boolean>

    /**
     * @permission administrator
     *
     * @param {number} id
     * @param {string} name
     * @param {string} code
     * @param {string} subject
     * @param {string} help
     * @param {string} body
     * @param {string} html
     *
     * @returns {boolean}
     */
    UpdateTemplate: (
        id: number,
        name: string,
        code: string,
        subject: string,
        help: string,
        body: string,
        html: string
    ) => BackendResult<boolean>

    /**
     * @permission administrator
     *
     * @param {number} id
     * @param {string} body
     *
     * @returns {boolean}
     */
    UpdateTemplateBody: (id: number, body: string) => BackendResult<boolean>

    /**
     * @permission administrator
     *
     * @param {number} id
     * @param {string} code
     *
     * @returns {boolean}
     */
    UpdateTemplateCode: (id: number, code: string) => BackendResult<boolean>

    /**
     * @permission administrator
     *
     * @param {number} id
     * @param {string} help
     *
     * @returns {boolean}
     */
    UpdateTemplateHelp: (id: number, help: string) => BackendResult<boolean>

    /**
     * @permission administrator
     *
     * @param {number} id
     * @param {string} html
     *
     * @returns {boolean}
     */
    UpdateTemplateHtml: (id: number, html: string) => BackendResult<boolean>

    /**
     * @permission administrator
     *
     * @param {number} id
     * @param {string} name
     *
     * @returns {boolean}
     */
    UpdateTemplateName: (id: number, name: string) => BackendResult<boolean>

    /**
     * @permission administrator
     *
     * @param {number} id
     * @param {string} subject
     *
     * @returns {boolean}
     */
    UpdateTemplateSubject: (id: number, subject: string) => BackendResult<boolean>
}

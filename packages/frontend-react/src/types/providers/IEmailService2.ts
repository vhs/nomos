/* eslint-disable @typescript-eslint/max-params */
/* eslint-disable @typescript-eslint/naming-convention */
// Do not change manually.

import type { BackendResult } from '@/types/api'
import type { EmailTemplate, EmailTemplates, User } from '@/types/validators/records'

export interface IEmailService2 {
    /**
     * @permission administrator
     *
     * @param {string} filters
     *
     * @throws {string}
     *
     * @returns {number}
     */
    CountTemplates: (filters: string) => BackendResult<number>

    /**
     * @permission administrator
     *
     * @param {number} id
     *
     * @throws {string}
     *
     * @returns {void}
     */
    DeleteTemplate: (id: number) => BackendResult<void>

    /**
     * Summary of Email.
     *
     * @permission administrator
     *
     * @param {string}               email
     * @param {string}               tmpl
     * @param {Record<string, unknown>} context
     * @param {string|null}          subject
     *
     * @throws {string}
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
     * @param {User}     user    email address
     * @param {string}               tmpl
     * @param {Record<string, unknown>} context
     * @param {string|null}          subject
     *
     * @throws {string}
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
     * @throws {string}
     *
     * @returns {EmailTemplate}
     */
    GetTemplate: (id: number) => BackendResult<EmailTemplate>

    /**
     * @permission administrator
     *
     * @param {number}    page
     * @param {number}    size
     * @param {string} columns
     * @param {string} order
     * @param {string} filters
     *
     * @throws {string}
     *
     * @returns {EmailTemplates}
     */
    ListTemplates: (
        page: number,
        size: number,
        columns: string,
        order: string,
        filters: string
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
     * @throws {string}
     *
     * @returns {EmailTemplate}
     */
    PutTemplate: (
        name: string,
        code: string,
        subject: string,
        help: string,
        body: string,
        html: string
    ) => BackendResult<EmailTemplate>

    /**
     * @permission administrator
     *
     * @param {number}    id
     * @param {string} body
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    UpdateTemplateBody: (id: number, body: string) => BackendResult<boolean>

    /**
     * @permission administrator
     *
     * @param {number}    id
     * @param {string} code
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    UpdateTemplateCode: (id: number, code: string) => BackendResult<boolean>

    /**
     * @permission administrator
     *
     * @param {number}    id
     * @param {string} help
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    UpdateTemplateHelp: (id: number, help: string) => BackendResult<boolean>

    /**
     * @permission administrator
     *
     * @param {number}    id
     * @param {string} html
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    UpdateTemplateHtml: (id: number, html: string) => BackendResult<boolean>

    /**
     * @permission administrator
     *
     * @param {number}    id
     * @param {string} name
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    UpdateTemplateName: (id: number, name: string) => BackendResult<boolean>

    /**
     * @permission administrator
     *
     * @param {number}    id
     * @param {string} subject
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    UpdateTemplateSubject: (id: number, subject: string) => BackendResult<boolean>
}

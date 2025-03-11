import { createRoot } from 'react-dom/client'

import { mockCurrentUserObject } from '@/lib/mocking/data'

import UserGrantingItem from './UserGrantingItem'
import { MutatorCallback, MutatorOptions } from 'swr'

it('It should mount', () => {
    const container = document.createElement('div')
    const root = createRoot(container)
    root.render(
        <UserGrantingItem
            availableGrants={[]}
            user={mockCurrentUserObject}
            mutateListUsers={function <
                MutationData = {
                    id: number
                    keys: {
                        id: number
                        type: 'undefined' | 'github' | 'google' | 'slack' | 'api' | 'rfid' | 'pin'
                        key: string
                        created: string | number | Date
                        userid: number
                        notes?: string | null | undefined
                        pin?: string | null | undefined
                        expires?: string | number | Date | null | undefined
                        pinid?: string | null | undefined
                        privileges?:
                            | {
                                  id: number
                                  code: string
                                  name: string
                                  enabled: boolean
                                  description?: string | null | undefined
                                  icon?: string | null | undefined
                              }[]
                            | null
                            | undefined
                    }[]
                    email: string
                    username: string
                    membership_id: number
                    mem_expire: string | number | Date
                    trial_used: boolean
                    fname: string
                    lname: string
                    token: string
                    cookie_id: string
                    newsletter: boolean
                    cash: boolean
                    userlevel: number
                    created: string | number | Date
                    lastlogin: string | number | Date
                    lastip: string
                    active: 'b' | 'n' | 't' | 'y'
                    paypal_id: string
                    payment_email: string
                    stripe_id: string
                    stripe_email: string
                    privileges: {
                        id: number
                        code: string
                        name: string
                        enabled: boolean
                        description?: string | null | undefined
                        icon?: string | null | undefined
                    }[]
                    password?: string | null | undefined
                    notes?: string | null | undefined
                    avatar?: string | null | undefined
                    membership?:
                        | {
                              id: number
                              code: string
                              description: string
                              active: boolean
                              title: string
                              price: number
                              days: number
                              period: 'D' | 'M' | 'Y'
                              trial: boolean
                              recurring: boolean
                              private: boolean
                              privileges?:
                                  | {
                                        id: number
                                        code: string
                                        name: string
                                        enabled: boolean
                                        description?: string | null | undefined
                                        icon?: string | null | undefined
                                    }[]
                                  | null
                                  | undefined
                          }
                        | null
                        | undefined
                }[]
            >(
                data?:
                    | {
                          id: number
                          keys: {
                              id: number
                              type: 'undefined' | 'github' | 'google' | 'slack' | 'api' | 'rfid' | 'pin'
                              key: string
                              created: string | number | Date
                              userid: number
                              notes?: string | null | undefined
                              pin?: string | null | undefined
                              expires?: string | number | Date | null | undefined
                              pinid?: string | null | undefined
                              privileges?:
                                  | {
                                        id: number
                                        code: string
                                        name: string
                                        enabled: boolean
                                        description?: string | null | undefined
                                        icon?: string | null | undefined
                                    }[]
                                  | null
                                  | undefined
                          }[]
                          email: string
                          username: string
                          membership_id: number
                          mem_expire: string | number | Date
                          trial_used: boolean
                          fname: string
                          lname: string
                          token: string
                          cookie_id: string
                          newsletter: boolean
                          cash: boolean
                          userlevel: number
                          created: string | number | Date
                          lastlogin: string | number | Date
                          lastip: string
                          active: 'b' | 'n' | 't' | 'y'
                          paypal_id: string
                          payment_email: string
                          stripe_id: string
                          stripe_email: string
                          privileges: {
                              id: number
                              code: string
                              name: string
                              enabled: boolean
                              description?: string | null | undefined
                              icon?: string | null | undefined
                          }[]
                          password?: string | null | undefined
                          notes?: string | null | undefined
                          avatar?: string | null | undefined
                          membership?:
                              | {
                                    id: number
                                    code: string
                                    description: string
                                    active: boolean
                                    title: string
                                    price: number
                                    days: number
                                    period: 'D' | 'M' | 'Y'
                                    trial: boolean
                                    recurring: boolean
                                    private: boolean
                                    privileges?:
                                        | {
                                              id: number
                                              code: string
                                              name: string
                                              enabled: boolean
                                              description?: string | null | undefined
                                              icon?: string | null | undefined
                                          }[]
                                        | null
                                        | undefined
                                }
                              | null
                              | undefined
                      }[]
                    | Promise<
                          | {
                                id: number
                                keys: {
                                    id: number
                                    type: 'undefined' | 'github' | 'google' | 'slack' | 'api' | 'rfid' | 'pin'
                                    key: string
                                    created: string | number | Date
                                    userid: number
                                    notes?: string | null | undefined
                                    pin?: string | null | undefined
                                    expires?: string | number | Date | null | undefined
                                    pinid?: string | null | undefined
                                    privileges?:
                                        | {
                                              id: number
                                              code: string
                                              name: string
                                              enabled: boolean
                                              description?: string | null | undefined
                                              icon?: string | null | undefined
                                          }[]
                                        | null
                                        | undefined
                                }[]
                                email: string
                                username: string
                                membership_id: number
                                mem_expire: string | number | Date
                                trial_used: boolean
                                fname: string
                                lname: string
                                token: string
                                cookie_id: string
                                newsletter: boolean
                                cash: boolean
                                userlevel: number
                                created: string | number | Date
                                lastlogin: string | number | Date
                                lastip: string
                                active: 'b' | 'n' | 't' | 'y'
                                paypal_id: string
                                payment_email: string
                                stripe_id: string
                                stripe_email: string
                                privileges: {
                                    id: number
                                    code: string
                                    name: string
                                    enabled: boolean
                                    description?: string | null | undefined
                                    icon?: string | null | undefined
                                }[]
                                password?: string | null | undefined
                                notes?: string | null | undefined
                                avatar?: string | null | undefined
                                membership?:
                                    | {
                                          id: number
                                          code: string
                                          description: string
                                          active: boolean
                                          title: string
                                          price: number
                                          days: number
                                          period: 'D' | 'M' | 'Y'
                                          trial: boolean
                                          recurring: boolean
                                          private: boolean
                                          privileges?:
                                              | {
                                                    id: number
                                                    code: string
                                                    name: string
                                                    enabled: boolean
                                                    description?: string | null | undefined
                                                    icon?: string | null | undefined
                                                }[]
                                              | null
                                              | undefined
                                      }
                                    | null
                                    | undefined
                            }[]
                          | undefined
                      >
                    | MutatorCallback<
                          {
                              id: number
                              keys: {
                                  id: number
                                  type: 'undefined' | 'github' | 'google' | 'slack' | 'api' | 'rfid' | 'pin'
                                  key: string
                                  created: string | number | Date
                                  userid: number
                                  notes?: string | null | undefined
                                  pin?: string | null | undefined
                                  expires?: string | number | Date | null | undefined
                                  pinid?: string | null | undefined
                                  privileges?:
                                      | {
                                            id: number
                                            code: string
                                            name: string
                                            enabled: boolean
                                            description?: string | null | undefined
                                            icon?: string | null | undefined
                                        }[]
                                      | null
                                      | undefined
                              }[]
                              email: string
                              username: string
                              membership_id: number
                              mem_expire: string | number | Date
                              trial_used: boolean
                              fname: string
                              lname: string
                              token: string
                              cookie_id: string
                              newsletter: boolean
                              cash: boolean
                              userlevel: number
                              created: string | number | Date
                              lastlogin: string | number | Date
                              lastip: string
                              active: 'b' | 'n' | 't' | 'y'
                              paypal_id: string
                              payment_email: string
                              stripe_id: string
                              stripe_email: string
                              privileges: {
                                  id: number
                                  code: string
                                  name: string
                                  enabled: boolean
                                  description?: string | null | undefined
                                  icon?: string | null | undefined
                              }[]
                              password?: string | null | undefined
                              notes?: string | null | undefined
                              avatar?: string | null | undefined
                              membership?:
                                  | {
                                        id: number
                                        code: string
                                        description: string
                                        active: boolean
                                        title: string
                                        price: number
                                        days: number
                                        period: 'D' | 'M' | 'Y'
                                        trial: boolean
                                        recurring: boolean
                                        private: boolean
                                        privileges?:
                                            | {
                                                  id: number
                                                  code: string
                                                  name: string
                                                  enabled: boolean
                                                  description?: string | null | undefined
                                                  icon?: string | null | undefined
                                              }[]
                                            | null
                                            | undefined
                                    }
                                  | null
                                  | undefined
                          }[]
                      >
                    | undefined,
                opts?:
                    | boolean
                    | MutatorOptions<
                          {
                              id: number
                              keys: {
                                  id: number
                                  type: 'undefined' | 'github' | 'google' | 'slack' | 'api' | 'rfid' | 'pin'
                                  key: string
                                  created: string | number | Date
                                  userid: number
                                  notes?: string | null | undefined
                                  pin?: string | null | undefined
                                  expires?: string | number | Date | null | undefined
                                  pinid?: string | null | undefined
                                  privileges?:
                                      | {
                                            id: number
                                            code: string
                                            name: string
                                            enabled: boolean
                                            description?: string | null | undefined
                                            icon?: string | null | undefined
                                        }[]
                                      | null
                                      | undefined
                              }[]
                              email: string
                              username: string
                              membership_id: number
                              mem_expire: string | number | Date
                              trial_used: boolean
                              fname: string
                              lname: string
                              token: string
                              cookie_id: string
                              newsletter: boolean
                              cash: boolean
                              userlevel: number
                              created: string | number | Date
                              lastlogin: string | number | Date
                              lastip: string
                              active: 'b' | 'n' | 't' | 'y'
                              paypal_id: string
                              payment_email: string
                              stripe_id: string
                              stripe_email: string
                              privileges: {
                                  id: number
                                  code: string
                                  name: string
                                  enabled: boolean
                                  description?: string | null | undefined
                                  icon?: string | null | undefined
                              }[]
                              password?: string | null | undefined
                              notes?: string | null | undefined
                              avatar?: string | null | undefined
                              membership?:
                                  | {
                                        id: number
                                        code: string
                                        description: string
                                        active: boolean
                                        title: string
                                        price: number
                                        days: number
                                        period: 'D' | 'M' | 'Y'
                                        trial: boolean
                                        recurring: boolean
                                        private: boolean
                                        privileges?:
                                            | {
                                                  id: number
                                                  code: string
                                                  name: string
                                                  enabled: boolean
                                                  description?: string | null | undefined
                                                  icon?: string | null | undefined
                                              }[]
                                            | null
                                            | undefined
                                    }
                                  | null
                                  | undefined
                          }[],
                          MutationData
                      >
                    | undefined
            ): Promise<
                | {
                      id: number
                      keys: {
                          id: number
                          type: 'undefined' | 'github' | 'google' | 'slack' | 'api' | 'rfid' | 'pin'
                          key: string
                          created: string | number | Date
                          userid: number
                          notes?: string | null | undefined
                          pin?: string | null | undefined
                          expires?: string | number | Date | null | undefined
                          pinid?: string | null | undefined
                          privileges?:
                              | {
                                    id: number
                                    code: string
                                    name: string
                                    enabled: boolean
                                    description?: string | null | undefined
                                    icon?: string | null | undefined
                                }[]
                              | null
                              | undefined
                      }[]
                      email: string
                      username: string
                      membership_id: number
                      mem_expire: string | number | Date
                      trial_used: boolean
                      fname: string
                      lname: string
                      token: string
                      cookie_id: string
                      newsletter: boolean
                      cash: boolean
                      userlevel: number
                      created: string | number | Date
                      lastlogin: string | number | Date
                      lastip: string
                      active: 'b' | 'n' | 't' | 'y'
                      paypal_id: string
                      payment_email: string
                      stripe_id: string
                      stripe_email: string
                      privileges: {
                          id: number
                          code: string
                          name: string
                          enabled: boolean
                          description?: string | null | undefined
                          icon?: string | null | undefined
                      }[]
                      password?: string | null | undefined
                      notes?: string | null | undefined
                      avatar?: string | null | undefined
                      membership?:
                          | {
                                id: number
                                code: string
                                description: string
                                active: boolean
                                title: string
                                price: number
                                days: number
                                period: 'D' | 'M' | 'Y'
                                trial: boolean
                                recurring: boolean
                                private: boolean
                                privileges?:
                                    | {
                                          id: number
                                          code: string
                                          name: string
                                          enabled: boolean
                                          description?: string | null | undefined
                                          icon?: string | null | undefined
                                      }[]
                                    | null
                                    | undefined
                            }
                          | null
                          | undefined
                  }[]
                | MutationData
                | undefined
            > {
                console.debug('UserGrantingItem.test - data:', data)
                console.debug('UserGrantingItem.test - opts:', opts)
                throw new Error('Function not implemented.')
            }}
        />
    )
    root.unmount()
})

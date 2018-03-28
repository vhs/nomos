class User {

    static schema() {
        return {
            users: {
                id: {type: 'integer', key: 'primary', nullable: false, default: 0},
                username: {type: 'string', nullable: false, default: '', size: 255},
                password: {type: 'string', nullable: false, default: '', size: 255},
                membership_id: {type: 'integer', nullable: false, default: 0},
                mem_expire: {type: 'datetime', nullable: true, format: 'Y-m-d H:i:s'},
                trial_used: {type: 'boolean', nullable: false, default: false},
                email: {type: 'string', nullable: false, default: '', size: 255},
                fname: {type: 'string', nullable: false, default: '', size: 32},
                lname: {type: 'string', nullable: false, default: '', size: 32},
                token: {type: 'string', nullable: false, default: '0', size: 40},
                cookie_id: {type: 'string', nullable: false, default: '0', size: 64},
                newsletter: {type: 'boolean', nullable: false, default: false},
                cash: {type: 'boolean', nullable: false, default: false},
                userlevel: {type: 'integer', nullable: false, default: 1},
                notes: {type: 'text'},
                created: {type: 'datetime', nullable: true, format: 'Y-m-d H:i:s'},
                lastlogin: {type: 'datetime', nullable: true, format: 'Y-m-d H:i:s'},
                lastip: {type: 'string', nullable: true, default: '0', size: 16},
                avatar: {type: 'string', nullable: true, default: '0', size: 150},
                active: {type: 'enum', values: ['n', 'y', 't', 'b']},
                paypal_id: {type: 'string', nullable: false, default: '', size: 255},
                payment_email: {type: 'string', nullable: false, default: '', size: 255},
                membership: {type: 'relationship', key: 'id', reference: 'memberships', via: 'membership_id' },
                keys: { type: 'relationship', key: 'userid', reference: 'keys', via: 'id' },
                privileges: { type: 'relationship', key: 'userid', reference: 'userprivileges', via: 'id', yield: 'privileges' }
            }
        };
    }
}


/*

        $table->setConstraints(
            Constraint::PrimaryKey($table->columns->id),
            Constraint::ForeignKey($table->columns->membership_id, MembershipSchema::Table(), MembershipSchema::Columns()->id)
    );

        $table->setAccess(PrivilegedAccess::GenerateAccess("user", $table, $table->columns->id));

        return $table;
    }
}

 */
#!/usr/bin/env bash

container_name=nomos-frontend
# evil villainy to get the IP from the host
frontend_addr="$(docker inspect "$container_name" | jq -r '.[0].NetworkSettings.Networks | to_entries | .[0].value.IPAddress')"
frontend_base_uri="http://vhs:password@${frontend_addr}/services/web"

key_resp=$(curl -s "${frontend_base_uri}/ApiKeyService1.svc/GenerateSystemApiKey?notes=webhooker")
key_id=$(echo "$key_resp" | jq -r .id)
key_value=$(echo "$key_resp" | jq -r .key)

echo "API key ID: $key_id; key: $key_value" >&2

function is_webhook_privilege_present() {
    local found_webhook
    found_webhook=$(curl -s "${frontend_base_uri}/PrivilegeService1.svc/GetAllPrivileges" | jq '.[] | select(.code == "webhook")')

    if [[ -n ${found_webhook} ]]; then
        return 0
    else
        return 1
    fi
}

if ! is_webhook_privilege_present; then
    echo 'Creating webhook privilege' >&2
    curl -s "${frontend_base_uri}/PrivilegeService1.svc/CreatePrivilege?name=webhook&code=webhook&description=webhook&icon=webhook&enabled=true" \
        >/dev/null || echo "Failed to create privilege" >&2
fi

curl -s "${frontend_base_uri}/ApiKeyService1.svc/PutApiKeyPrivileges?keyid=${key_id}&privileges=webhook" \
    >/dev/null || echo "Failed to add API key privilege" >&2

echo -e "Add the following to docker/nomos.env:\n\nNOMOS_RABBITMQ_NOMOS_TOKEN=${key_value}" >&2

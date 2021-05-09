#!/bin/sh

cat <<EOF > /usr/share/nginx/html/assets/config.json
{
    "api_server_url": "$API_SERVER_URL",
}
EOF

/docker-entrypoint.sh "$@"

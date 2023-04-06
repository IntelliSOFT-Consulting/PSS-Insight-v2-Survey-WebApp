#!/bin/bash

export $(grep -v '^#' .env | xargs)
# Get the value of the REACT_APP_API_URL environment variable
api_url="$REACT_APP_API_URL"

# Create the nginx.conf file and add the configuration code
cat > docker/nginx.conf <<EOF
server {
    listen 3001;

    location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
        try_files \$uri \$uri/ /index.html?\$args;
    }

    location /api {
        proxy_pass $api_url;
    }
}
EOF
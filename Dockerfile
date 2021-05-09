# build ############################################################
FROM node:14-slim AS builder

ARG SOURCE_DIR=/opt/angular-devel

ADD $PWD $SOURCE_DIR

RUN set -x \
    && cd $SOURCE_DIR \
    && npm install -g npm \
    && npm install \
    && npx ng build --prod

# deploy ############################################################
FROM nginx:stable-alpine

ARG DIST_DIR=/opt/angular-devel/dist/cluster-monitoring-frontend
ARG ROOT_DIR=/usr/share/nginx/html

# copy from builder
COPY --from=builder $DIST_DIR $ROOT_DIR

# set runtime environment variables
ENV API_SERVER_URL="http://localhost:3000"

# copy scripts
COPY scripts/30-serve-index-when-not-found.sh /docker-entrypoint.d
COPY scripts/entrypoint.sh /scripts/

ENTRYPOINT [ "/scripts/entrypoint.sh" ]
CMD ["nginx", "-g", "daemon off;"]

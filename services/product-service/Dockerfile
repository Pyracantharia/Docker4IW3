FROM node:22-alpine AS base

RUN apk add --no-cache curl

LABEL org.opencontainers.image.source="https://github.com/Pyracantharia/Docker4IW3"

WORKDIR /app
# on copie tout avant de faire le npm install comme ça meme si package.json est dans un sous dossier il est quand meme copié	
COPY . . 
RUN npm install
RUN apk add --no-cache wget \
    && wget -O /usr/local/bin/gosu "https://github.com/tianon/gosu/releases/download/1.16/gosu-amd64" \
    && chmod +x /usr/local/bin/gosu \
    && addgroup -S appgroup && adduser -S appuser -G appgroup \
    && chown -R appuser:appgroup /app

FROM base AS development
EXPOSE 3000
USER appuser
CMD sh -c "sh /app/init-products.sh & npm run dev"

FROM node:18 AS production
WORKDIR /app
COPY . .
# RUN apt-get update && apt-get upgrade -y && apt-get install -y wget \
#     && wget -O /usr/local/bin/gosu "https://github.com/tianon/gosu/releases/download/1.16/gosu-amd64" \
#     && chmod +x /usr/local/bin/gosu \
#     && addgroup --system appgroup \
#     && adduser --system --ingroup appgroup appuser \
#     && chown -R appuser:appgroup /app
# on copie les modules de la phase base (development) pour les mettre dans la phase de production
COPY --from=base /app/node_modules ./node_modules
# USER appuser
# on execute le script et on démarre l'application
CMD sh -c "chmod +x /app/init-products.sh && /app/init-products.sh & npm start"

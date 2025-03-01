FROM node:22-alpine AS base

WORKDIR /app
# on copie tout avant de faire le npm install comme ça meme si package.json est dans un sous dossier il est quand meme copié	
COPY . . 
RUN npm install

FROM base AS development
EXPOSE 3000
CMD ["npm", "run", "dev"]

FROM node:18 AS production
WORKDIR /app
COPY . . 
# on copie les modules de la phase base (development) pour les mettre dans la phase de production
COPY --from=base /app/node_modules ./node_modules

# on execute le script et on démarre l'application
CMD sh -c "chmod +x /app/init-products.sh && /app/init-products.sh & npm start"

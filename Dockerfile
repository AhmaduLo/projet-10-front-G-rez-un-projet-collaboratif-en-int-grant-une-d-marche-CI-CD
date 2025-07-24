# Étape 1 : build de l'application Angular
FROM node:latest as build

# Dossier de travail
WORKDIR /usr/local/app


# Copie des fichiers de dépendances
COPY ./ /usr/local/app/

# Installation des dépendances
RUN yarn

# Build Angular en production --prod
RUN npm run build
 
# Étape 2 : serveur NGINX pour servir l'app
FROM nginx:latest as production

# Copie de la configuration NGINX personnalisée
COPY nginx.conf /etc/nginx/conf.d/default.conf


# Copie des fichiers générés dans le container nginx
COPY --from=build /usr/local/app/dist/bobapp /usr/share/nginx/html

EXPOSE 80
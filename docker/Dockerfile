FROM node:16-alpine  as build
WORKDIR /app 

COPY ./package.json ./
RUN npm install --quiet

COPY . . 

RUN npm run build


FROM nginx:alpine
COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf 
COPY --from=build /app/build /usr/share/nginx/html 

CMD ["nginx", "-g", "daemon off;"]
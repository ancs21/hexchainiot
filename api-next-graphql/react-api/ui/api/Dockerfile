FROM node:10-alpine
WORKDIR /usr/src/app

COPY package.json ./
RUN npm i

COPY . .
ENV NODE_ENV development
EXPOSE 4000
CMD [ "node", "server.js" ]

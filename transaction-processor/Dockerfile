FROM node:10-alpine

WORKDIR /usr/src/app
RUN apk --no-cache add --virtual builds-deps build-base python
COPY package.json ./
RUN npm i
RUN apk del builds-deps build-base python

COPY . .
ENV NODE_ENV production

CMD [ "node", "index.js" ]

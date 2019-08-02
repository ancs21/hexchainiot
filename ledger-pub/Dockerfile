# https://nodejs.org/de/docs/guides/nodejs-docker-webapp/

FROM node:10.15.3

# Create app directory
WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN npm install -g yarn 
RUN yarn

# Bundle app source
COPY . .

CMD [ "yarn", "start" ]

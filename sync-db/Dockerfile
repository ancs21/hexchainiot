FROM node:10-alpine

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install -g yarn 
RUN yarn

COPY . .

CMD [ "yarn", "start" ]

FROM node:10-alpine

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN npm install -g yarn 
RUN yarn

COPY . .
EXPOSE 6677

CMD [ "yarn", "start" ]

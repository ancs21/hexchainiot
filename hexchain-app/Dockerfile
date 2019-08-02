FROM node:10-alpine

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN npm install -g yarn 
RUN yarn

COPY . .
RUN yarn build

EXPOSE 3000

CMD [ "yarn", "start" ]

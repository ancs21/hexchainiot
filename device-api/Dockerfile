FROM ubuntu:16.04

ARG DEBIAN_FRONTEND=noninteractive

RUN echo "deb http://repo.sawtooth.me/ubuntu/ci xenial universe" >> /etc/apt/sources.list \
   && apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 8AA7AF1F1091A5FD \
   && echo "deb http://repo.sawtooth.me/ubuntu/1.0/stable xenial universe" >> /etc/apt/sources.list \
   && apt-get update \
   && apt-get install -y -q --no-install-recommends \
   apt-utils \
   && apt-get install -y -q \
   ca-certificates \
   build-essential \
   python3-sawtooth-cli \
   curl \
   && apt-get clean \
   && rm -rf /var/lib/apt/lists/*

RUN curl -sL https://deb.nodesource.com/setup_10.x | bash - \
   && apt-get install -y nodejs

# Create app directory
WORKDIR /usr/src/app

COPY package.json ./
RUN npm i

# Bundle app source
COPY . .
EXPOSE 8888

CMD [ "npm", "run", "prod" ]

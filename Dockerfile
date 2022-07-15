FROM alpine:3.11 AS builder
WORKDIR /usr/src/app
RUN apk add --no-cache --update nodejs nodejs-npm 
ARG CACHEBUST=1
COPY package.json ./
COPY . .
ARG CACHEBUST=1
RUN npm cache clean --force
RUN npm i --save-exact
ARG CACHEBUST=1
EXPOSE 3000
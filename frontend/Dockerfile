# FROM node:16-alpine3.16
FROM node:18-alpine3.16

WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install -g npm@9.2.0
RUN npm install

COPY . .
RUN npm run build

ENV NODE_ENV production
EXPOSE 8080

ENTRYPOINT ["npm", "start"]

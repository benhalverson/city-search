FROM node:18-buster-slim

WORKDIR /app

COPY package*.json /app/

RUN npm i

COPY . /app/
RUN npm run build

COPY build /app/build

ARG PORT=${PORT}
EXPOSE ${PORT} 


CMD { "npm", "start"}

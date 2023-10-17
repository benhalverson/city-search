FROM node:18-buster-slim

WORKDIR /app

COPY package*.json /app/

RUN npm i

COPY . /app/
RUN npm run build


ARG PORT=${PORT}
EXPOSE ${PORT} 


CMD { "npm", "start"}
